import * as React from 'react';
// in memory fallback used then `localStorage` throws an error
export const inMemoryData = new Map();
export default function useLocalStorageState (key, options) {
    if (typeof React.useSyncExternalStore === 'undefined') {
        throw new TypeError(`You are using React 17 or below.`);
    }
    const defaultValue = options === null || options === void 0 ? void 0 : options.defaultValue;
    // SSR support
    // - on the server, return a constant value
    // - this makes the implementation simpler and smaller the `localStorage` object is `undefined`
    //   on the server
    if (typeof window === 'undefined') {
        return [
            defaultValue,
            () => { },
            {
                isPersistent: true,
                removeItem: () => { },
            },
        ];
    }
    const serializer = options === null || options === void 0 ? void 0 : options.serializer;
    // disabling ESLint because the above if statement can be executed only on the server. the value
    // of `window` can't change between calls.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useBrowserLocalStorageState(key, defaultValue, options === null || options === void 0 ? void 0 : options.storageSync, serializer === null || serializer === void 0 ? void 0 : serializer.parse, serializer === null || serializer === void 0 ? void 0 : serializer.stringify);
}
function useBrowserLocalStorageState (key, defaultValue, storageSync = true, parse = parseJSON, stringify = JSON.stringify) {
    const initialDefaultValue = React.useRef(defaultValue).current;
    // store default value in localStorage:
    // - initial issue: https://github.com/astoilkov/use-local-storage-state/issues/26
    //   issues that were caused by incorrect initial and secondary implementations:
    //   - https://github.com/astoilkov/use-local-storage-state/issues/30
    //   - https://github.com/astoilkov/use-local-storage-state/issues/33
    if (!inMemoryData.has(key) &&
        initialDefaultValue !== undefined &&
        localStorage.getItem(key) === null) {
        // reasons for `localStorage` to throw an error:
        // - maximum quota is exceeded
        // - under Mobile Safari (since iOS 5) when the user enters private mode
        //   `localStorage.setItem()` will throw
        // - trying to access localStorage object when cookies are disabled in Safari throws
        //   "SecurityError: The operation is insecure."
        try {
            localStorage.setItem(key, stringify(initialDefaultValue));
        }
        catch (_a) { }
    }
    // we keep the `parsed` value in a ref because `useSyncExternalStore` requires a cached version
    const storageValue = React.useRef({
        item: null,
        parsed: initialDefaultValue,
    });
    const value = React.useSyncExternalStore(React.useCallback((onStoreChange) => {
        const onChange = (localKey) => {
            if (key === localKey) {
                onStoreChange();
            }
        };
        callbacks.add(onChange);
        return () => {
            callbacks.delete(onChange);
        };
    }, [key]),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        () => {
            const item = localStorage.getItem(key);
            if (inMemoryData.has(key)) {
                storageValue.current = {
                    item,
                    parsed: inMemoryData.get(key),
                };
            }
            else if (item !== storageValue.current.item) {
                let parsed;
                try {
                    parsed = item === null ? initialDefaultValue : parse(item);
                }
                catch (_a) {
                    parsed = initialDefaultValue;
                }
                storageValue.current = {
                    item,
                    parsed,
                };
            }
            return storageValue.current.parsed;
        },
        // istanbul ignore next
        () => initialDefaultValue);
    const setState = React.useCallback((newValue) => {
        const value = newValue instanceof Function ? newValue(storageValue.current.parsed) : newValue;
        // reasons for `localStorage` to throw an error:
        // - maximum quota is exceeded
        // - under Mobile Safari (since iOS 5) when the user enters private mode
        //   `localStorage.setItem()` will throw
        // - trying to access localStorage object when cookies are disabled in Safari throws
        //   "SecurityError: The operation is insecure."
        try {
            localStorage.setItem(key, stringify(value));
            inMemoryData.delete(key);
        }
        catch (_a) {
            inMemoryData.set(key, value);
        }
        triggerCallbacks(key);
    }, [key, stringify]);
    // - syncs change across tabs, windows, iframes
    // - the `storage` event is called only in all tabs, windows, iframe's except the one that
    //   triggered the change
    React.useEffect(() => {
        if (!storageSync) {
            return undefined;
        }
        const onStorage = (e) => {
            if (e.storageArea === localStorage && e.key === key) {
                triggerCallbacks(key);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [key, storageSync]);
    return React.useMemo(() => [
        value,
        setState,
        {
            isPersistent: value === initialDefaultValue || !inMemoryData.has(key),
            removeItem () {
                inMemoryData.delete(key);
                localStorage.removeItem(key);
                triggerCallbacks(key);
            },
        },
    ], [key, setState, value, initialDefaultValue]);
}
// notifies all instances using the same `key` to update
const callbacks = new Set();
function triggerCallbacks (key) {
    for (const callback of [...callbacks]) {
        callback(key);
    }
}
// a wrapper for `JSON.parse()` that supports "undefined" value. otherwise,
// `JSON.parse(JSON.stringify(undefined))` returns the string "undefined" not the value `undefined`
function parseJSON (value) {
    return value === 'undefined' ? undefined : JSON.parse(value);
}

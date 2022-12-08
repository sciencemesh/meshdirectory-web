import {computed, ref} from 'vue'
import useUrl from '@/use/query'
import useFetch from '@/use/fetch'

const {searchParams, validLink} = useUrl()
const {load} = useFetch()

const loaded = ref(false)
const meshProviders = ref([])
const meshLocations = ref([])
const meshTarget = ref(null)
const detailsExpanded = ref(false)

export default function useProviders() {
    const providers = meshProviders
    const locations = meshLocations
    const target = meshTarget
    const allLoaded = loaded
    const providersLoaded = ref(false)
    const locationsLoaded = ref(false)

    const originator = computed(() => {
        const originProvider = providers.value.find(p => {
            return p.domain === searchParams.value.get('providerDomain')
        })
        return originProvider || {'full_name': ''}
    })

    const targetLink = computed(() => {
        if (!target.value || !validLink) {
            return '#'
        }
        return new URL(
            `?${encodeURI(searchParams.value.toString())}`,
            new URL('accept',
                new URL(targetOCMService.value.endpoint.path.replace(/\/?$/, '/'))
            )
        )
    })

    const targetOCMService = computed(() => {
        return target.value?.services.find(s => {
            return s.endpoint.type.name === 'OCM'
        })
    })

    function fetchProviders(providersUri) {
        if (process.env.NODE_ENV === 'development') {
            providers.value = require('../../demo/providers.json')
            providersLoaded.value = true
            allLoaded.value = true
            return
        }

        load(providersUri, (res) => {
            providers.value = res
            providersLoaded.value = true

            if (locationsLoaded.value) {
                allLoaded.value = true
            }
        })
    }

    function fetchLocations() {
        locations.value = require('../assets/data/providers.loc.json')
        locationsLoaded.value = true
        allLoaded.value = true
        // TODO: uncomment when mentix locations provider is in IOP
        // load(locationsUri, (res) => {
        //     locations.value = res
        //     locationsLoaded.value = true
        //     if (providersLoaded.value) {
        //         loaded.value = true
        //     }
        // })
    }

    function getProvider(location) {
        return ref(providers.value.find(p => {
            return p.name === location.key
        }))
    }

    function getLocation(provider) {
        return ref(locations.value.find(l => {
            return l.key === provider.value.name
        }))
    }

    function expandDetails() {
        detailsExpanded.value = true
    }

    function hideDetails() {
        detailsExpanded.value = false
    }

    function setTarget(provider) {
        target.value = provider
    }

    return {
        providers: computed(() => providers.value),
        locations: computed(() => locations.value),
        target: computed(() => target.value),
        targetLink,
        originator,
        detailsExpanded,
        providersLoaded: computed(() => providersLoaded.value),
        locationsLoaded: computed(() => locationsLoaded.value),
        loaded: computed(() => allLoaded.value),
        fetchProviders, fetchLocations, getLocation, setTarget, getProvider,
        expandDetails, hideDetails
    }
}

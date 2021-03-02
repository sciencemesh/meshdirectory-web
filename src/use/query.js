import {computed} from 'vue'

export default function useUrl() {
    const searchParams = computed(() => {
        return new URLSearchParams(window.location.search)
    })

    const baseUrl = computed(() => {
        return `${window.location.pathname === '/'? '' : window.location.pathname}`;
    })

    const validLink = computed(() => {
        return searchParams.value.has('providerDomain')
            && searchParams.value.has('token')
    })

    return {searchParams, validLink, baseUrl}
}

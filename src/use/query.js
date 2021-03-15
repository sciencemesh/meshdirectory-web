import {computed} from 'vue'

export default function useUrl() {
    const searchParams = computed(() => {
        return new URLSearchParams(window.location.search)
    })

    const baseUrl = computed(() => {
        return window.location.pathname.replace(/\/?$/, '/')
    })

    const validLink = computed(() => {
        return searchParams.value.has('providerDomain')
            && searchParams.value.has('token')
    })

    return {searchParams, validLink, baseUrl}
}

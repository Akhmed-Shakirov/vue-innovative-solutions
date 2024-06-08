// Start Pagination
// import { usePaginationt } from '../store/pagination'

// const { size, page } = storeToRefs(usePaginationt())
// const { setPaginationt } = usePaginationt()

import { useTokenStore, useNotifications, storeToRefs } from '../stores'

const isPagination = false
// End Pagination

// Default Variables
const BASEURL = 'https://jsonplaceholder.typicode.com'

const key = {
    refresh: 'refreshToken',
    access: 'accessToken'
}

// Query to filter
const getUrlFilter = (api: string, object: any) => {
    let filter = ''

    const array = Object.keys(object)

    for (let index = 0; index < array?.length; index++) {
        const key = array[index]

        if (Array.isArray(object[key])) {
            for (const id of object[key]) {
                filter += `${filter ? '&' : '?'}${key}=${id}`
            }
        } else {
            filter += `${filter ? '&' : '?'}${key}=${object[key]}`
        }
    }

    return api + filter
}
// Request verification
const getVerificationRequest = (data: any) => {
    // If this is an array, return it immediately
    if (Array.isArray(data)) {
        return data
    }

    // If there is pogination
    if (isPagination && typeof data === 'object' && data?.total_pages) {
        let pagination = JSON.parse(JSON.stringify(data))
        delete pagination?.results
        // setPaginationt(pagination)
        return data?.results
    }

    // If they don't match
    return data
}
// Request
const fetchData = (apiData: string, paramsData: any, notification?: string): any => {
    const { access_token, refresh_token } = storeToRefs(useTokenStore())
    const { setNotification } = useNotifications()

    return fetch(`${BASEURL}/${apiData}`, paramsData).then(async (res) => {
        // Everything is fine
        if (!res.ok && res.status !== 401) {
            setNotification({ value: 'warning', text: 'Everything is fine' })
            throw res
        }

        // Account not found
        if (!res.ok && res.status === 401 && paramsData?.body && JSON.parse(JSON.stringify(paramsData?.body))?.user_id !== undefined) {
            setNotification({ value: 'warning', text: 'Account not found' })
            return { detail: 'No active account found with the given credentials' }
        }

        // Invalid token
        if (res.status === 401) {
            setNotification({ value: 'warning', text: 'Invalid token' })
            return fetch(`${BASEURL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [key.refresh]: refresh_token.value })
            }).then(async (res) => {
                // Invalid refresh token
                if (res.status === 401 || res.status === 400) {
                    console.log('Rederect to auth')
                    return {}
                }

                // Everything is fine, let's ask again
                const refresh_data = await res.json()
                access_token.value = refresh_data[key.access]

                if (refresh_data[key.refresh]) {
                    refresh_token.value = refresh_data[key.refresh]
                }

                paramsData.headers.Authorization = `Bearer ${access_token.value}`

                return fetchData(apiData, paramsData, notification)
            })
        }

        // Results
        setNotification({ value: 'success', text: notification ?? 'Success' })
        return await res.json()
    }).catch(async (error) => {
        setNotification({ value: 'danger', text: error ?? 'Danger' })
        return await error
    })
}

// Fetch
const useFetch = async (
    url: string | any[],
    method = 'GET',
    data = {},
    notification?: string
) => {
    const { access_token } = storeToRefs(useTokenStore())
    let api

    method = method.toLocaleUpperCase()

    const params: { method: string, headers: any, body?: any } = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: ''
        }
    }

    // Token verification
    if (!!access_token.value) { // true: Additional check even if there is a token
        params.headers.Authorization = (true ? `Bearer ${access_token.value}` : undefined)
    }

    // Request body
    if (!['GET', 'HEAD'].includes(method)) {
        params.body = JSON.stringify(data) || {}
    }

    // URL can be an array or a string
    if (Array.isArray(url)) {
        if (url.length > 1) {
            let filter = { ...url[1] }

            // if (url.length > 2) {
            //     filter = { ...filter }
            //     // filter = { size: size.value, page: page.value, ...filter }
            // }

            api = getUrlFilter(url[0], filter)
        } else {
            api = url[0]
        }
    } else {
        api = url
    }

    // Request
    return getVerificationRequest(fetchData(api, params, notification))
}

export default useFetch

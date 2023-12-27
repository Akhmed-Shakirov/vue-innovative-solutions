// Start Pagination
// import { storeToRefs } from 'pinia'
// import { usePaginationt } from '../store/pagination'

// const { size, page } = storeToRefs(usePaginationt())
// const { setPaginationt } = usePaginationt()

const isPagination = false
// End Pagination

// Default Variables
const BASEURL = 'http://localhost:3000'

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
const fetchData = (apiData: string, paramsData: any): any => {
    return fetch(`${BASEURL}/${apiData}`, paramsData).then(async (res) => {
        // Everything is fine
        if (!res.ok && res.status !== 401) {
            throw res
        }

        // Account not found
        if (!res.ok && res.status === 401 && paramsData?.body && JSON.parse(JSON.stringify(paramsData?.body))?.user_id !== undefined) {
            return { detail: 'No active account found with the given credentials' }
        }

        // Invalid token
        if (res.status === 401) {
            return fetch(`${BASEURL}/auth/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ [key.refresh]: localStorage.refresh_token })
            }).then(async (res) => {
                // Invalid refresh token
                if (res.status === 401 || res.status === 400) {
                    console.log('Rederect to auth')
                    return {}
                }

                // Everything is fine, let's ask again
                const refresh_data = await res.json()
                localStorage.access_token = refresh_data[key.access]

                if (refresh_data[key.refresh]) {
                    localStorage.refresh_token = refresh_data[key.refresh]
                }

                paramsData.headers.Authorization = `Bearer ${localStorage.access_token}`

                return fetchData(apiData, paramsData)
            })
        }

        // Results
        return await res.json()
    })
}

// Fetch
const useFetch = async (
    url: string | any[],
    method = 'GET',
    data = {},
) => {
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
    if (!!localStorage.access_token) { // true: Additional check even if there is a token
        params.headers.Authorization = (true ? `Bearer ${localStorage.access_token}` : undefined)
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
    return getVerificationRequest(fetchData(api, params))
}

export default useFetch

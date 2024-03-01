import { ref } from 'vue'
import { useFetch } from './index'

const findDifferences = (obj1: any, obj2: any): any => {
    const differences: any = {}

    for (const key in obj2) {
        if (obj1[key] !== obj2[key]) differences[key] = obj2[key]
    }

    return differences
}


const useService = (api: string | any[], method: string = 'GET', helper?: { state?: any, item?: any, old_item?: any } | null): any => {
    const data = ref<any>(helper?.state?.data ?? [])
    const isLoading = ref<boolean>(false)
    const isError = ref<boolean>(false)

    method = method.toLocaleUpperCase()

    if (!['GET', 'HEAD'].includes(method)) {
        if (method == 'POST' && helper?.item?.id) delete helper?.item?.id

        if (method !== 'POST') api = api + `/${helper?.item?.id ? helper?.item?.id : ''}`
    }

    const fetchData = async () => {
        try {
            isLoading.value = true
            let item: any = helper?.item

            if (method == 'PATCH' && Object.keys(helper?.old_item)?.length) {
                item = findDifferences(helper?.old_item, helper?.item)
                console.log(item)
            }

            let result = await useFetch(api, method, item)

            if (method == 'POST') {
                data.value = [result, ...data.value]
            }

            if (method == 'GET') {
                data.value = result
            }

            if (['PUT', 'PATCH'].includes(method)) {
                const index = data.value.findIndex((el: any) => el?.id === +item?.id)
                data.value.splice(index, 1, result)
            }

            if (method == 'DELETE') {
                data.value = data.value.filter((el: any) => el?.id !== +item?.id)
            }
        } catch (error) {
            isError.value = true
        } finally {
            isLoading.value = false
        }
    }

    fetchData()

    return { data, isLoading, isError }
}

export default useService

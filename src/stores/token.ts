import { ref } from 'vue'
import { defineStore } from 'pinia'

const useTokenStore = defineStore('token', () => {
    const refresh_token = ref<string>('')
    const access_token = ref<string>('')

    return {
        refresh_token,
        access_token
    }
})

export default useTokenStore

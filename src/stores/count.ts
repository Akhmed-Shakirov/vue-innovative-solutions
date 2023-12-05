import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCountStore = defineStore('count', () => {
    const count = ref<number>(0)

    return {
        count
    }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'

const useCountStore = defineStore('count', () => {
    const count = ref<number>(0)

    return {
        count
    }
})

export default useCountStore

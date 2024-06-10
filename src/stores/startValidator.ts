import { ref } from 'vue'
import { defineStore } from 'pinia'

const useStartValidator = defineStore('startValidator', () => {
    const startValidator = ref(0)
    const isError = ref(false)

    return { startValidator, isError }
})

export default useStartValidator

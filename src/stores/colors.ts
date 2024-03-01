import { ref } from 'vue'
import { defineStore } from 'pinia'

const useColors = defineStore('colors', () => {
	const colors = ref<any>({
		orange: ['warning'],
		red: ['danger'],
		green: ['success'],
		blue: ['primary'],
		gray: ['secondary']
	})

	const getColor = (value: string): string => {
		let color = ''

		for (const key in colors.value) {
			if (!color && colors.value[key].includes(value)) {
				color = key
			}
		}

		return color
	}

	return {
        colors,
		getColor
    }
})

export default useColors

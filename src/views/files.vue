<template>
	file : {{value ?? '{}'}}
	<Files v-model="value" />
	
	<br>
	file id : {{ document.id ?? 'null' }}
	<Files is-get-id v-model="document.id" :file="document.file" />
	
	<br>
	file : string
	<Files v-model="file" />
	
	<br>
	files : Array
	<Files v-model="files" />
</template>

<script setup lang="ts">
import Files from '../components/Files.vue'

import { ref } from 'vue'

const value = ref<any>(null)

const document = ref({
	id: 206,
	file: 'http://10.10.77.180:8000/uploads/1._%D0%9B%D0%B8%D1%86%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D1%87%D0%B5%D1%82%D0%B0_vhlA1xU.docx'
})

const file = ref('http://10.10.77.180:8000/uploads/1._%D0%9B%D0%B8%D1%86%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D1%87%D0%B5%D1%82%D0%B0_vhlA1xU.docx')

const files = ref([
	{
		id: 206,
		file: 'http://10.10.77.180:8000/uploads/1._%D0%9B%D0%B8%D1%86%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D1%87%D0%B5%D1%82%D0%B0_vhlA1xU.docx'
	},
	{
		id: 206,
		name: 'http://10.10.77.180:8000/uploads/1._%D0%9B%D0%B8%D1%86%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D1%87%D0%B5%D1%82%D0%B0_vhlA1xU.docx'
	},
	{
		id: 206,
		file: 'http://10.10.77.180:8000/uploads/1._%D0%9B%D0%B8%D1%86%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D1%87%D0%B5%D1%82%D0%B0_vhlA1xU.docx'
	}
])
</script>

<style scoped lang="scss">

</style>

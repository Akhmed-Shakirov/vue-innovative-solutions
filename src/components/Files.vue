<template>
	<div
		class="files"
		ref="dropZoneRef"
		v-if="limit || !limit && !files?.length"
		@click="!isDisabled && open()"
		:class="{
			'files-active' : isOverDropZone,
			'files-error': isValidation || isError,
			'files-disabled': isDisabled,
		}"
	>
		<div class="files__label" v-if="label">{{ $t(label ?? '') }}</div>
		<div class="files__limit" v-if="limit">{{files?.length ? files?.length : '0'}}/{{limit}}</div>
		<div class="files__text"><span>{{ $t('choose_file') }}</span> {{ $t('or_move_it_here') }} </div>
		<div class="files__type">({{ getTypes.join(', ') }})</div>
	</div>

	<div class="files__items" v-if="files?.length">
		<div class="files__item" v-for="(item, index) in files" :key="item">
			<div @click="item?.link && downloadFile(item?.link, item?.name)">
				<Icon :icon="`${getFormat(item?.name)}.svg`" class="type" />
				<p>{{ item?.name }}</p>
			</div>
			<Icon icon="trash" class="trash" @click="removeFile(index)" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { Icon } from './index.ts'

import { ref, computed, onMounted, watch } from 'vue'
import { useDropZone, useFileDialog } from '@vueuse/core'

const props = defineProps<{
	modelValue?: any
	label?: string
	limit?: string
	types?: string[]
  	isError?: boolean
	isDisabled?: boolean
	isGetId?: boolean
	file?: any
}>()

const emit = defineEmits(['update:modelValue'])

const getTypes = computed<string[]>(() => {
    return props?.types ? props?.types : ['pdf', 'png', 'jpg', 'jpeg', 'bmp', 'doc', 'docx', 'svg']
})
const getFormat = (name: any): string => {
	let format = name.split('.')?.at(-1)
	
	if (['doc', 'docx'].includes(format)) format = 'doc'

	if (['jpg', 'jpeg'].includes(format)) format = 'jpg'
	
	return format
}

const files = ref<any>([])
const oldId = ref<number | null>(null)
const isValidation = ref<boolean>(false)
const dropZoneRef = ref<HTMLElement | null>(null)
const { open, onChange } = useFileDialog()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const fileValid = (file: any): boolean => {
	const isValid = getTypes.value?.includes(file?.name?.split('.')?.at(-1))
	
	if (!isValid) isValidation.value = true
	
	return isValid
}
const setFiles = (event: any) => {
	isValidation.value = false
	
	if (props.isDisabled) return
	
	if (props.limit) {
		const limit = Number(props.limit) - files.value?.length
		if (Number(props.limit) <= files.value?.length) return
		
		for (let i = 0; i < event?.length; i++) {
			if (i+1 <= limit && fileValid(event[i])) {
				files.value.push(event[i])
			}
		}
		
		emit('update:modelValue', files.value)
	} else {
		if (fileValid(event[0])) {
			if (props.isGetId) {
				const formData = new FormData()
				formData.append('file', event[0]);
				// axios.post('/files/documents/', formData).then((res) => {
				// 	emit('update:modelValue', res.data.id)
				// 	if (oldId.value) {
				// 		axios.delete(`/files/documents/${oldId.value}/`)
				// 		oldId.value = null
				// 	}
				// })
			} else {
				emit('update:modelValue', event[0])
			}
			
			files.value = [ event[0] ]
		}
	}
}
const removeFile = (index: number) => {
	files.value.splice(index, 1)
	
	if (props.isGetId) {
		oldId.value = props.modelValue
		emit('update:modelValue', null)
	}
}
const downloadFile = async (url: string, fileName: string = 'downloaded_file') => {
	try {
		const response = await fetch(url)
		const blob = await response.blob()
		const downloadUrl = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = downloadUrl
		a.download = fileName
		document.body.appendChild(a)
		a.click()
		URL.revokeObjectURL(downloadUrl)
		document.body.removeChild(a)
	} catch (error) {
		console.error('Ошибка при скачивании файла:', error)
	}
}

watch(() => props.modelValue, () => {
    if (!props.modelValue && !Array.isArray(props.modelValue)) files.value = []
    if (Array.isArray(props.modelValue) && !props.modelValue.length) files.value = []
}, { deep: true })

onMounted(() => {
	if (Array.isArray(props.modelValue)) {
		files.value = props.modelValue.map(el => ({ ...el, link: el.file, name: decodeURIComponent((el.file ?? el?.name)?.split('/')?.at(-1)).replace(/_/g, ' ') }))
	}
	
	if (typeof props.modelValue == 'string') {
		const array: any = props.modelValue?.split('/')
		files.value = [ { link: props.modelValue, name: decodeURIComponent(array?.at(-1)).replace(/_/g, ' ') } ]
	}
	
	if (props.isGetId && props.file) {
		files.value = [ { link: props.file, name: decodeURIComponent(props.file?.split('/')?.at(-1)).replace(/_/g, ' ') } ]
	}
})

function onDrop(files: any) { setFiles(files) }
onChange((files: any) => setFiles(files) )
</script>

<style scoped lang="scss">
.files {
	position: relative;
	border-radius: 6px;
	border: 1px dashed #c9c9c9;
	background: #1a1a1a;
	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 12px 16px;
	gap: 8px;

	cursor: pointer;
	transition: .2s;

	&:hover, &-active {
		background: #242424;
	}

	&__items {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	&__item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 12px 16px;
		gap: 22px;

		border-radius: 6px;
		border: 1px solid transparent;
		background: #1a1a1a;

		.type {
			width: 22px;
			height: 25px;
		}

		p {
			text-align: left;
			color: #cdcdcd;
			font-size: 14px;
			font-style: normal;
			font-weight: 400;
		}
	  
		div {
			display: flex;
			align-items: center;
			gap: 22px;
			flex: 1 1 auto;
			cursor: pointer;
			transition: .2s;
			
			&:hover {
				opacity: .5;
			}
		}

		.trash {
			color: #cdcdcd;
			cursor: pointer;

			&:hover {
				color: #ff8484;
			}
		}
  	}

	&__label, &__limit {
		color: #98A2B3;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		position: absolute;
		z-index: 1;
		top: -20px;
		
		// &:before {
		// 	top: 8px;
		// 	left: -2px;
		// 	position: absolute;
		// 	content: "";
		// 	width: 104%;
		// 	height: 3px;
		// 	background: #ffffff;
		// 	z-index: -1;
		// }
	}

	&__label {
		left: 16px;
	}

	&__limit {
		right: 16px;
	}

	&__text {
		color: #cdcdcd;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		user-select: none;

		span {
			color: #3A94CF;
			text-decoration-line: underline;
		}
	}

	&__type {
		user-select: none;
		color: #ffffff;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
	}
	
	&-error {
		border: 1px dashed #ff8484;
		
		.files__type {
			color: #d74f4f;
			font-weight: 500;
			text-decoration-line: underline;
		}
	}
	
	&-disabled, &-disabled:hover {
		border: 1px dashed rgba(147, 142, 142, 0.66);
		background: #ececec;
		opacity: .5;
		cursor: no-drop;
	}
}
</style>

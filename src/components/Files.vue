<template>
  <div
	  class="files"
	  ref="dropZoneRef"
	  :class="{
			'files-active' : isOverDropZone,
			'files-error': isValidation || isError,
			'files-disabled': isDisabled,
		}"
	  v-if="limit || !limit && !files?.length"
	  @click="!isDisabled && open()"
  >
    <div class="files__label" v-if="label">{{ $t(label ?? '') }}</div>
    <div class="files__limit" v-if="limit">{{files?.length ? files?.length : '0'}}/{{limit}}</div>
    <div class="files__text"><span>{{ $t('choose_file') }}</span> {{ $t('or_move_it_here') }} </div>
    <div class="files__type">({{ getTypes.join(', ') }})</div>
  </div>

  <div class="files__items" v-if="files?.length">
    <div class="files__item" v-for="(item, index) in files" :key="item">
      <UIIcon :icon="`${getFormat(item?.name)}.svg`" class="type" />
      <p>{{ item?.name }}</p>
      <UIIcon icon="trash" class="trash" @click="removeFile(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import {ref, computed, onMounted} from 'vue'
import {useDropZone, useFileDialog} from '@vueuse/core'
import UIIcon from '@/components/UI/Icon.vue'

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
    return props?.types ? props?.types : ['pdf', 'png', 'jpg', 'jpeg', 'bmp', 'doc', 'docx']
})
const getFormat = (name: any): string => {
	let format = name.split('.')?.at(-1)
	
	if (['doc', 'docx'].includes(format)) format = 'doc'
	
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
				axios.post('/files/documents/', formData).then((res) => {
					emit('update:modelValue', res.data.id)
					if (oldId.value) {
						axios.delete(`/files/documents/${oldId.value}/`)
						oldId.value = null
					}
				})
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

onMounted(() => {
	if (Array.isArray(props.modelValue)) {
		files.value = props.modelValue.map(el => ({ ...el, name: decodeURIComponent((el.file ?? el?.name)?.split('/')?.at(-1)).replace(/_/g, ' ') }))
	}
	
	if (typeof props.modelValue == 'string') {
		const array: any = props.modelValue?.split('/')
		files.value = [ { name: decodeURIComponent(array?.at(-1)).replace(/_/g, ' ') } ]
	}
	
	if (props.isGetId && props.file) {
		files.value = [ { name: decodeURIComponent(props.file?.split('/')?.at(-1)).replace(/_/g, ' ') } ]
	}
})

function onDrop(files: any) { setFiles(files) }
onChange((files: any) => setFiles(files) )
</script>

<style scoped lang="scss">
.files {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px dashed #84CAFF;
  background: #F5FAFF;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  gap: 8px;

  cursor: pointer;
  transition: .2s;

  &:hover, &-active {
    background: #e7f3ff;
  }

  &__items {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    gap: 22px;

    border-radius: 6px;
    border: 1px solid #D0D5DD;
    background: #FFF;

    .type {
      width: 22px;
      height: 25px;
    }

    p {
      text-align: left;
      color: #344054;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      flex: 1 1 auto;
    }

    .trash {
      color: #98A2B3;
      cursor: pointer;

      &:hover {
        color: #000000;
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
    top: -10px;
	  
	  &:before {
		  top: 8px;
		  left: -2px;
		  position: absolute;
		  content: "";
		  width: 104%;
		  height: 3px;
		  background: #ffffff;
		  z-index: -1;
	  }
  }

  &__label {
    left: 16px;
  }

  &__limit {
    right: 16px;
  }

  &__text {
    color: #344054;
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
    color: #98A2B3;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
	
	&-error {
		border: 1px dashed #ff8484;
		background: #fff5f5;
		
		.files__type {
			color: #d72b2b;
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
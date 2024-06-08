<script setup lang="ts">
import { defineModel, watch } from 'vue'
import { useFindItem } from '../composables'
import { storeToRefs, useStartValidator } from '../stores'
const { startValidator, isError } = storeToRefs(useStartValidator())

const modelValue = defineModel<string | null>()
const errorText = defineModel<string>('errorText')

const props = defineProps<{
    validator: string[]
}>()

const emit = defineEmits(['validate'])

watch(startValidator, () => {
    checkValue()
})

const checkValue = () => {
    let isRequired = useFindItem('required', props.validator)
    let max = useFindItem('max', props.validator)
    let min = useFindItem('min', props.validator)
    let email = useFindItem('email', props.validator)

    errorText.value = ''

    if (!modelValue.value && isRequired) {
        errorText.value = 'Required field'
        isError.value = true
    }

    if (modelValue.value && max && modelValue.value?.length > +max) {
        errorText.value = 'Max length ' + max
        isError.value = true
    }

    if (modelValue.value && min && modelValue.value?.length < +min) {
        errorText.value = 'Min length ' + min
        isError.value = true
    }

    if (email) {
        const split = modelValue.value?.split('@')

        if (!modelValue.value?.includes('@') || split && (split.length < 2 || !split[1]) ) {
            errorText.value = 'This is Email'
            isError.value = true
        }
    }
}
</script>

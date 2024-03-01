<template>
    <div 
        class="datepicker" 
        ref="datepicker"
        :class="{ 'datepicker__active' : isShow }"
    >
        <Input v-model="value" mask="##.##.####" :label="label" :placeholder="placeholder ?? '__.__.____'" icon="calendar" @icon="toggle" />
        
        <teleport to="body">
            <Transition>
                <div class="datepicker__body" ref="datepickerOutside" :style="styleObject" v-if="isShow">
                    <Transition mode="out-in">
                        <div class="datepicker__years" v-if="isActive == 1">
                            <p 
                                v-for="item in years" 
                                :key="item"
                                @click="setYear(item)"
                                :class="{ 
                                    'datepicker__months-active' : item == +year
                                }"
                            >
                                {{ item }}
                            </p>
                        </div>
                        <div class="datepicker__year" v-else>
                            <Icon icon="chevron-left" @click="decrementDate('year')" />
                            <p @click="isActive = 1">{{ year }}</p>
                            <Icon icon="chevron-right" @click="incrementDate('year')" />
                        </div>
                    </Transition>

                    <Transition mode="out-in">
                        <div class="datepicker__months" v-if="isActive == 2">
                            <p 
                                v-for="(item, index) in months" 
                                :key="item"
                                @click="setMonths(index + 1)"
                                :class="{ 
                                    'datepicker__months-active' : index == month
                                }"
                            >
                                {{ item }}
                            </p>
                        </div>
                        <div class="datepicker__month" v-else>
                            <Icon icon="chevron-left" @click="decrementDate('months')" />
                            <p @click="isActive = 2">{{ months[month] }}</p>
                            <Icon icon="chevron-right" @click="incrementDate('months')" />
                        </div>
                    </Transition>
                    
                    <Transition mode="out-in">
                        <div v-if="isActive == 3">
                            <div class="datepicker__weeks">
                                <p v-for="item in weeks" :key="item">
                                    {{ item }}
                                </p>
                            </div>
                            <div class="datepicker__days">
                                <p 
                                    v-for="item in calendar" 
                                    :key="item"
                                    @click="!item.isDoesntClick ? setDay(item.date) : ''"
                                    :class="{ 
                                        'datepicker__days-disabled' : item.isDisabled,
                                        'datepicker__days-doesntclick' : item.isDoesntClick,
                                        'datepicker__days-to' : item.date == moment().format('YYYY-MM-DD'),
                                        'datepicker__days-active' : item.date == modelValue,
                                    }"
                                >
                                    {{ calendarFormater(item.date) }}
                                </p>
                            </div>
                        </div>
                        <div class="datepicker__day" v-else>
                            <Icon icon="chevron-left" @click="decrementDate('days')" />
                            <p @click="isActive = 3">{{ toDay.split('-').at('-1') }}</p>
                            <Icon icon="chevron-right" @click="incrementDate('days')" />
                        </div>
                    </Transition>
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { Input, Icon } from './index.ts'
import moment from 'moment'

import { ref, computed, watch, defineModel } from 'vue'
import { onClickOutside, useMouseInElement, useWindowSize, watchDebounced } from '@vueuse/core'

const props = defineProps<{
    label?: string
    placeholder?: string
    min?: string
    max?: string
    isMin?: boolean
    isMax?: boolean
    isActiveDay?: boolean
}>()


// Methods
const addZero = (number: string | number): string => {
    return number?.toString()?.padStart(2, '0')
}
const formater = (event: string | null | undefined): string => {
    if (!event) return ''

    const isType = event?.includes('-')

    return event.split(isType ? '-' : '.').reverse().map(el => addZero(el)).join(isType ? '.' : '-')
}
const calendarFormater = (event: any): string => {
    let day = event.split('-')?.at(-1)

    if (day.length == 2 && day[0] == '0') {
        day = day[1]
    }

    return day
}
// Methods


// Variables
const isActive = ref<number>(props.isActiveDay ? 3 : 1)
const modelValue = defineModel<string | null>()
const value = ref<string | null>(formater(modelValue.value) ?? null)
const toDay = ref<any>(modelValue.value ?? moment().format('YYYY-MM-DD'))
const year = computed<string>(() => {
    return `${toDay.value}`.split('-')[0]
})
const month = computed<number>(() => {
    return +`${toDay.value}`.split('-')[1] - 1
})
watch(value, () => {
    if (`${value.value}`.length == 10) {
        modelValue.value = formater(value.value)
        toDay.value = formater(value.value)
    } else {
        modelValue.value = null
    }
})
watch(modelValue, () => {
    if (!modelValue.value) value.value = null
})
// Variables


// Season
const years = computed<number[]>(() => {
    let arr: number[] = []

    for (let index = 0; index < 4; index++) {
        arr.push(+year.value - (index + 1))   
        arr.push(+year.value + (index + 1))      
    }

    arr.push(+year.value)

    return arr.sort()
})
const months = ref<string[]>([
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
])
const weeks = ref<string[]>([
    'ПН', 
    'ВТ', 
    'СР', 
    'ЧТ', 
    'ПТ', 
    'СБ', 
    'ВС'
])
const calendar = computed<any[]>(() => {
    const dayWeek = moment(toDay.value).clone().startOf('month').isoWeekday();


    let days: any[] = []

    if (dayWeek > 1) {
        const data: any[] = []

        const firstDayLastMonth = moment(toDay.value).subtract(1, 'months').startOf('month')
        Array.from({ length: firstDayLastMonth.daysInMonth() }, (_, index) =>
            data.push({ date: firstDayLastMonth.clone().add(index, 'days').format('YYYY-MM-DD'), isDisabled: true })
        )

        days = [ ...days, ...data.slice(-(dayWeek-1)) ]
    }

    const firstDayToMonth = moment(toDay.value).startOf('month')
    Array.from({ length: firstDayToMonth.daysInMonth() }, (_, index) =>
        days.push({ date: firstDayToMonth.clone().add(index, 'days').format('YYYY-MM-DD'), isDisabled: false })
    )

    if (days.length !== 35) {
        const data: any[] = []

        const firstDayNextMonth = moment(toDay.value).add(1, 'months').startOf('month')
        Array.from({ length: firstDayNextMonth.daysInMonth() }, (_, index) =>
            data.push({ date: firstDayNextMonth.clone().add(index, 'days').format('YYYY-MM-DD'), isDisabled: true })
        )

        if (35 > days.length) days = [ ...days, ...data.slice(0, 35 - days.length) ]
        if (days.length > 35) days = [ ...days, ...data.slice(0, 42 - days.length) ]
    }
    
    if (!!props.min || !!props.max || !!props.isMin || !!props.isMax) {
        for (let index = 0; index < days.length; index++) {
            const day = days[index]

            if (
                props.isMin && moment(day.date).isBefore(moment().subtract(1, 'days')) ||
                props.isMax && moment(day.date).isAfter(moment()) ||
                props.min && moment(day.date).isBefore(moment(props.min)) ||
                props.max && moment(day.date).isAfter(moment(props.max))
            ) {
                days[index] = { ...day, isDoesntClick: true }
            }

        }
    }

    return days
})
// Season


// Set Date
const setDay = (date: string) => {
    value.value = formater(date)
    toDay.value = date
    isShow.value = false
}
const setYear = (value: number) => {
    toDay.value = toDay.value.replace(toDay.value.split('-')[0], value)
    isActive.value++
}
const setMonths = (value: number) => {
    toDay.value = toDay.value.replace(toDay.value.split('-')[1], addZero(value))
    isActive.value++
}
const incrementDate = (type: any) => {
    toDay.value = moment(toDay.value).add(1, type).format('YYYY-MM-DD')
}
const decrementDate = (type: any) => {
    toDay.value = moment(toDay.value).subtract(1, type).format('YYYY-MM-DD')
}
// Set Date


// Datepicker
const isShow = ref<boolean>(false)
const isTimer = ref<boolean>(true)
const datepicker = ref<HTMLElement | null>(null)
const datepickerOutside = ref<HTMLElement | null>(null)
const { elementPositionX, elementPositionY, elementHeight } = useMouseInElement(datepicker)
const { width } = useWindowSize()
const styleObject = computed<{top: string, left: string}>(() => {
    return {
        top: elementPositionY.value + elementHeight.value + 5 + 'px',
        left: elementPositionX.value + 'px'
    }
})
onClickOutside(datepickerOutside, () => {
    if (!!isShow.value) {
        isShow.value = false
		isTimer.value = false
    }
})
const toggle = () => {
    if (isTimer.value) {
        isShow.value = !isShow.value
    }
	isTimer.value = false
}

watchDebounced(isTimer,() => {
	isTimer.value = true
},{ debounce: 100, maxWait: 100 })
watch(width, () => {
    if (!!isShow.value) isShow.value = false
})
// Datepicker
</script>

<style scoped lang="scss">
.datepicker {
    width: 100%;
    position: relative;

    &__body {
        min-width: 287.30px;
        z-index: 1;
        position: absolute;

        border-radius: 8px;
        border: 1px solid transparent;
        background-color: #1a1a1a;

        display: flex;
        flex-direction: column;

        p {
            margin: 0;
            color: #ffffff;
        }
    }

    &__year, &__month, &__day {
        padding: 8px 12px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 1px solid #606060;

        p {
            transition: .2s;
            cursor: pointer;

            &:hover {
                opacity: .5;
            }
        }

        i {
            opacity: .7;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }
    }

    &__day { 
        border-bottom: 1px solid transparent;
    }

    &__weeks, &__days {
        padding: 8px 12px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 14.33px;

        border-bottom: 1px solid #606060;

        p {
            width: 24px;
            height: 24px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 12px;
            line-height: 18px;

            border: 1px solid transparent;
        }
    }

    &__days, &__years, &__months {
        padding: 16px 12px;
        border-bottom: none;

        p {
            cursor: pointer;
            user-select: none;
            border-radius: 6px;
            transition: .2s;

            &:hover {
                background: #2f2f2f;
            }
        }

        &-disabled, &-doesntclick {
            opacity: .5;
        }
        
        &-doesntclick {
            cursor: no-drop !important;
        }

        &-active {
            background: #606060 !important;

            &:hover {
                background: #606060 !important;
                opacity: .7;
            }
        }

        &-to {
            background: #606060 !important;
            border-color: #ffffff !important;

            &:hover {
                background: #606060 !important;
                opacity: .7;
            }
        }
    }

    &__months, &__years {
        border-bottom: 1px solid #606060;
        display: grid;
        grid-template-columns: repeat(3, 1fr);

        p {
            text-align: center;
            padding: 10px;
            border-radius: 0;
        }
    }

    &__active {

        &:deep(.field__icon) {
            opacity: 1;
        }
    }
}
</style>

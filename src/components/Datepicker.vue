<template>
    <div 
        class="datepicker" 
        ref="datepicker"
        :class="{ 'datepicker__active' : isShow }"
    >
        <Input v-model="value" mask="##.##.####" :label="label" :placeholder="placeholder" icon="calendar" @icon="isShow = !isShow" />
        
        <teleport to="body">
            <Transition>
                <div class="datepicker__body" ref="datepickerOutside" :style="styleObject" v-if="isShow">
                    <div class="datepicker__years">
                        <Icon icon="chevron-left" @click="decrementDate('years')" />
                        <p>{{ year }}</p>
                        <Icon icon="chevron-right" @click="incrementDate('years')" />
                    </div>

                    <div class="datepicker__months">
                        <Icon icon="chevron-left" @click="decrementDate('months')" />
                        <p>{{ months[month] }}</p>
                        <Icon icon="chevron-right" @click="incrementDate('months')" />
                    </div>

                    <div class="datepicker__weeks">
                        <p v-for="item in weeks" :key="item">
                            {{ item }}
                        </p>
                    </div>

                    <div class="datepicker__days">
                        <p 
                            v-for="item in calendar" 
                            :key="item"
                            @click="setDay(item.date)"
                            :class="{ 
                                'datepicker__days-disabled' : item.isDisabled,
                                'datepicker__days-to' : item.date == moment().format('YYYY-MM-DD'),
                                'datepicker__days-active' : item.date == modelValue,
                            }"
                        >
                            {{ calendarFormater(item.date) }}
                        </p>
                    </div>
                </div>
            </Transition>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import Input from './Input.vue'
import Icon from './Icon.vue'

import { ref, computed, watch, defineModel } from 'vue'
import { onClickOutside, useMouseInElement, useWindowSize } from '@vueuse/core'
import moment from 'moment'

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


const modelValue = defineModel<string | null>()
const value = ref<string | null>(formater(modelValue.value) ?? null)
const toDay = ref<any>(modelValue.value ?? moment().format('YYYY-MM-DD'))
const year = computed<string>(() => {
    return `${toDay.value}`.split('-')[0]
})
const month = computed<number>(() => {
    return +`${toDay.value}`.split('-')[1] - 1
})


const setDay = (date: string) => {
    value.value = formater(date)
    toDay.value = date
    isShow.value = false
}
const incrementDate = (type: string) => {
    if (type == 'years') {
        toDay.value = moment(toDay.value).add(1, 'year').format('YYYY-MM-DD')
    } else {
        toDay.value = moment(toDay.value).add(1, 'months').format('YYYY-MM-DD')
    }
}
const decrementDate = (type: string) => {
    if (type == 'years') {
        toDay.value = moment(toDay.value).subtract(1, 'year').format('YYYY-MM-DD')
    } else {
        toDay.value = moment(toDay.value).subtract(1, 'months').format('YYYY-MM-DD')
    }
}


watch(value, () => {
    if (`${value.value}`.length == 10) {
        modelValue.value = formater(value.value)
        toDay.value = formater(value.value)
    } else {
        modelValue.value = null
    }
})

const props = defineProps<{
    label?: string
    placeholder?: string
}>()


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
        
    return days
})


const isShow = ref<boolean>(false)

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

onClickOutside(datepickerOutside, (event: any) => {
    const list = [ ...event?.target?.classList ]
    if (!!isShow.value && !list?.includes('calendar')) isShow.value = false
})

watch(width, () => {
    if (!!isShow.value) isShow.value = false
})

props
</script>

<style scoped lang="scss">
.datepicker {
    width: 100%;
    position: relative;

    &__body {
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

    &__years, &__months {
        padding: 8px 12px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 1px solid #606060;

        i {
            opacity: .7;
            cursor: pointer;

            &:hover {
                opacity: 1;
            }
        }
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

    &__days {
        padding: 16px 12px;
        border-bottom: none;

        p {
            cursor: pointer;
            user-select: none;
            border-radius: 6px;

            &:hover {
                background: #2f2f2f;
            }
        }

        &-disabled {
            opacity: .5;
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


    &__active {

        &:deep(.field__icon) {
            opacity: 1;
        }
    }
}
</style>

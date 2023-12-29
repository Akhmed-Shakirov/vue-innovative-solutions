<template>
    <div class="tables">
        <div class="tables__haed">
            <div class="tables__block">
                <h3>Title</h3>
            </div>

            <div class="tables__block" v-if="false">
                <button>Add</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>

        <div class="tables__body">
            <div :style="isFull ? 'width: 100%' : ''">
                <table class="tables__main" :cellpadding="names?.length">
                    <tr class="tables__tr" v-if="isGroup">
                        <th class="tables__th tables__th-name" v-for="itemKeys in group" :key="itemKeys?.name" :colspan="itemKeys?.children?.length">
                            {{ itemKeys?.name }}
                        </th>
                    </tr>
                    
                    <tr class="tables__tr">
                        <template v-for="key in names" :key="key?.name">
                            <th class="tables__th">
                                {{ key?.title }}
                            </th>
                        </template>
                    </tr>

                    <template v-for="(item, index) in data" :key="index">
                        <tr 
                            class="tables__tr tables__tr-hover" 
                            :class="{ 'tables__tr-active' : index + 1 == active }" 
                            @click="active = index + 1"
                        >
                            <td class="tables__td" v-for="key in names" :key="key?.name">
                                {{ item?.[key?.name] || '---' }}
                            </td>
                        </tr>

                        <template v-if="item?.data?.length && false">
                            <tr class="tables__tr tables__tr-hover" v-for="(el, i) in item?.data" :key="i">
                                <td class="tables__td" v-for="key in names" :key="key?.name">
                                    {{ el?.[key?.name] || '---' }}
                                </td>
                            </tr>
                        </template>
                    </template>
                </table>
            </div>
        </div>

        <div class="tables__footer">
            <div class="tables__block">
                <h3>Footer</h3>
            </div>

            <div class="tables__block" v-if="false">
                <button>Add</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isFull = ref<boolean>(false)
const data = ref<any[]>([
    {
        body1: 'body1 - 1 body1 - 1',
        body2: 'body2 - 1 body2 - 1',
        body3: 'body3 - 1 body3 - 1',
        body4: 'body4 - 1 body4 - 1',
        body5: 'body5 - 1 body5 - 1',
        body6: 'body6 - 1 body6 - 1',
        body7: 'body7 - 1 body7 - 1',
        body8: 'body8 - 1 body8 - 1',
        body9: 'body9 - 1 body9 - 1',
        body10: '',
        body11: '',
        body12: '',
        body13: '',
    },
    {
        body1: 'body1 - 2',
        body2: 'body2 - 2',
        body3: 'body3 - 2',
        body4: 'body4 - 2 body4 - 2 body4 - 2',
        body5: 'body5 - 2 body5 - 2 body5 - 2 body5 - 2 body5 - 2',
        body6: 'body6 - 2',
        body7: 'body7 - 2',
        body8: 'body8 - 2',
        body9: 'body9 - 2',
        body10: '',
        body11: '',
        body12: '',
        body13: '',
    },
    {
        body1: 'body1 - 3',
        body2: 'body2 - 3',
        body3: 'body3 - 3',
        body4: 'body4 - 3',
        body5: 'body5 - 3',
        body6: 'body6 - 3',
        body7: 'body7 - 3',
        body8: 'body8 - 3',
        body9: 'body9 - 3',
        body10: '',
        body11: '',
        body12: '',
        body13: '',
    },
])
const keys = ref<any[]>([
    { name: 'body1', title: 'Р/М' },
    { name: 'body2', title: 'Дата' },
    { name: 'body3', title: 'Действия' },
    // { name: 'body4', title: 'Круг' },
    // { name: 'body5', title: 'Показания' },
    // { name: 'body6', title: 'Потребление за период' },
    // { name: 'body7', title: 'Фото' },
    // { name: 'body8', title: 'Типичная ситуация' },

    // { name: 'body9', title: 'Введено' }, 
    // { name: 'body10', title: 'Ввел' }, 
    // { name: 'body11', title: 'Основание' },

    // { name: 'body12', title: 'Забракованно' }, 
    // { name: 'body13', title: 'Забраковал' }, 

    // { 
    //     name: 'Новое значение', 
    //     children: [ 
    //         { name: 'body1', title: 'Р/М' },
    //         { name: 'body2', title: 'Дата' },
    //         { name: 'body3', title: 'Действия' },
    //         { name: 'body4', title: 'Круг' },
    //         { name: 'body5', title: 'Показания' },
    //         { name: 'body6', title: 'Потребление за период' },
    //         { name: 'body7', title: 'Фото' },
    //         { name: 'body8', title: 'Типичная ситуация' },
    //     ] 
    // },
    // { 
    //     name: 'Назначение', 
    //     children: [ 
    //         { name: 'body9', title: 'Введено' }, 
    //         { name: 'body10', title: 'Ввел' }, 
    //         { name: 'body11', title: 'Основание' },
    //     ] 
    // },
    // { 
    //     name: 'Забраковка', 
    //     children: [ 
    //         { name: 'body12', title: 'Забракованно' }, 
    //         { name: 'body13', title: 'Забраковал' }, 
    //     ] 
    // },
    // { 
    //     name: 'Забраковка', 
    //     children: [ 
    //         { name: 'body12', title: 'Забракованно' }, 
    //         { name: 'body13', title: 'Забраковал' }, 
    //     ] 
    // },
])


const active = ref<number>(0)
const isGroup = computed<boolean>(() => {
    return !!keys.value[0]?.children?.length
})
const group = computed<any[]>(() => {
    return isGroup.value ? keys.value : [ { children: keys.value, name: '' } ]
})
const names = computed<any[]>(() => {
    return group.value.reduce((acc, el) => ( acc = [...acc, ...el?.children] ), [])
})
</script>

<style scoped lang="scss">
.tables {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #606060;
    background-color: #1a1a1a;
    
    &__haed, &__footer {
        display: flex;
        flex-direction: column;
    }
    
    &__block {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        gap: 16px;

        border-bottom: 1px solid #606060;
        
        h3 {
            font-size: 16px;
        }

        &:last-child {
            border-bottom: none;
        }
    }
    
    &__haed {
        border-bottom: 1px solid #606060;
    }

    &__body {
        width: 100%;
        display: flex;
        overflow-x: scroll;
        padding-bottom: 10px;
    }

    &__main {
        min-width: 100%;
        width: max-content;
        border-spacing: 0;
        border-bottom: 1px solid #606060;
        
        tr ~ tr > td, th {
            border-top: 1px solid #606060;
            border-right: 1px solid #606060;
        }
    }

    &__footer {
        margin-top: 10px;
        border-top: 1px solid #606060;
    }

    &__tr {
        width: max-content;

        &-hover:hover {
            background: #272727;
        }

        &-active, &-active:hover {
            background: #343434;
        }
    }

    &__th, &__td {
        min-width: max-content;
        padding: 8px;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        height: 18px;
        text-align: left;

        &-name {
            text-align: center;
            font-size: 15px;
            text-transform: uppercase;
        }
    }
}
</style>

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
            <div class="tables__items">

                <div class="tables__item" v-for="itemKeys in isGroup ? keys : [ { children: keys, name: '' } ]" :key="itemKeys?.name">
                    <div class="tables__name" v-if="isGroup">
                        {{ itemKeys?.name }}
                    </div>

                    <table>
                        <tr class="tables__tr">
                            <th class="tables__th" v-for="key in itemKeys?.children" :key="key?.name">
                                {{ key?.name ?? '---' }}
                            </th>
                        </tr>
                        <tr class="tables__tr" v-for="(item, index) in data" :key="index">
                            <td class="tables__td" v-for="key in itemKeys?.children" :key="key?.name">
                                {{ item?.[key?.name] ?? '---' }}
                            </td>
                        </tr>
                    </table>
                </div>

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

const method = (key?: string, item?: any): string => {
    if (item) {
        return item
    } else {
        return key ? key : '---'
    }
}

const data = ref([
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

const keys = ref([
    { 
        name: 'Новое значение', 
        children: [ 
            { name: 'body1', title: 'Р/М' },
            { name: 'body2', title: 'Дата' },
            { name: 'body3', title: 'Действия' },
            { name: 'body4', title: 'Круг' },
            { name: 'body5', title: 'Показания' },
            { name: 'body6', title: 'Потребление за период' },
            { name: 'body7', title: 'Фото' },
            { name: 'body8', title: 'Типичная ситуация' },
        ] 
    },
    { 
        name: 'Назначение', 
        children: [ 
            { name: 'body9', title: 'Введено' }, 
            { name: 'body10', title: 'Ввел' }, 
            { name: 'body11', title: 'Основание' } 
        ] 
    },
    { 
        name: 'Забраковка', 
        children: [ 
            { name: 'body12', title: 'Забракованно' }, 
            { name: 'body13', title: 'Забраковал' }, 
        ] 
    },
])

const isGroup = computed<boolean>(() => {
    return !!keys.value[0]?.children?.length
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
    
    &__body {
        border-block: 1px solid #606060;
    }
    
    &__items {
        width: 100%;
        display: flex;
        overflow-x: scroll;
    }
    
    &__item {
        width: max-content;

        table {
            width: max-content;
            border-spacing: 0;
            
            tr ~ tr > td, th {
                border-top: 1px solid #606060;
                border-right: 1px solid #606060;
            }
        }
    }

    &__name {
        font-size: 15px;
        border-right: 1px solid #606060;
        text-transform: uppercase;
    }
    
    &__tr, &__td {
        text-align: left;
    }

    &__th, &__td, &__name {
        padding: 8px;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        height: 18px;
    }
}
</style>

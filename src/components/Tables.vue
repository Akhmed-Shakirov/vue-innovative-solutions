<template>
    <div class="tables" :class="{ 'tables-padding' : isPadding }">
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
const isPadding = ref<boolean>(false)

const data = ref<any[]>([
	{
		"name": "Aquila Campbell",
		"phone": "(737) 417-3624",
		"email": "enim@outlook.com",
		"address": "Ap #318-7959 Consectetuer Rd.",
		"postalZip": "631210",
		"region": "Calabarzon",
		"country": "Nigeria",
		"list": 17,
		"text": "ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet",
		"numberrange": 8,
		"currency": "$47.71",
		"alphanumeric": "ZLE46OFK1TK"
	},
	{
		"name": "Ebony Grimes",
		"phone": "(286) 689-5354",
		"email": "faucibus.leo@google.com",
		"address": "341-4915 Dictum Rd.",
		"postalZip": "134518",
		"region": "Berlin",
		"country": "Chile",
		"list": 11,
		"text": "tempus risus. Donec egestas. Duis ac arcu. Nunc mauris. Morbi",
		"numberrange": 9,
		"currency": "$45.57",
		"alphanumeric": "QFE41YRI5VW"
	},
	{
		"name": "Laith Macdonald",
		"phone": "(311) 427-5409",
		"email": "sed@hotmail.edu",
		"address": "Ap #903-2372 Mauris Rd.",
		"postalZip": "10508",
		"region": "Marche",
		"country": "Austria",
		"list": 13,
		"text": "ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede",
		"numberrange": 3,
		"currency": "$70.38",
		"alphanumeric": "OJE38BHI3VC"
	},
	{
		"name": "Candice Byers",
		"phone": "1-889-571-6773",
		"email": "tincidunt@icloud.net",
		"address": "Ap #814-2804 Ut St.",
		"postalZip": "32-78",
		"region": "North Region",
		"country": "Singapore",
		"list": 5,
		"text": "luctus sit amet, faucibus ut, nulla. Cras eu tellus eu",
		"numberrange": 1,
		"currency": "$88.46",
		"alphanumeric": "ERR06CZL1KI"
	},
	{
		"name": "MacKenzie Moon",
		"phone": "1-236-459-3839",
		"email": "eleifend.vitae@icloud.org",
		"address": "Ap #340-932 Mi Avenue",
		"postalZip": "9477",
		"region": "Central Kalimantan",
		"country": "United States",
		"list": 17,
		"text": "Sed nulla ante, iaculis nec, eleifend non, dapibus rutrum, justo.",
		"numberrange": 5,
		"currency": "$86.77",
		"alphanumeric": "JNP36WRB6DR"
	},
    {
		"name": "Inez Benson",
		"phone": "(492) 432-5866",
		"email": "malesuada.id@aol.couk",
		"address": "Ap #785-1406 Enim. Rd.",
		"postalZip": "37672",
		"region": "Dōngběi",
		"country": "New Zealand",
		"list": 5,
		"text": "tortor nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse",
		"numberrange": 3,
		"currency": "$47.56",
		"alphanumeric": "BKQ45RUS6LQ"
	},
	{
		"name": "Oleg Vinson",
		"phone": "(837) 553-5647",
		"email": "diam.duis@outlook.couk",
		"address": "869-1217 At St.",
		"postalZip": "586611",
		"region": "Tver Oblast",
		"country": "Spain",
		"list": 5,
		"text": "et, lacinia vitae, sodales at, velit. Pellentesque ultricies dignissim lacus.",
		"numberrange": 3,
		"currency": "$4.75",
		"alphanumeric": "EIY26BSS9KW"
	},
	{
		"name": "Erasmus Mueller",
		"phone": "1-939-381-4176",
		"email": "mauris.eu.elit@google.edu",
		"address": "344-3338 Senectus Rd.",
		"postalZip": "999094",
		"region": "Guanacaste",
		"country": "Netherlands",
		"list": 15,
		"text": "luctus lobortis. Class aptent taciti sociosqu ad litora torquent per",
		"numberrange": 3,
		"currency": "$17.23",
		"alphanumeric": "YLP75TNH1FG"
	},
	{
		"name": "Alma Waller",
		"phone": "(973) 743-5723",
		"email": "lacus@hotmail.net",
		"address": "Ap #958-9324 Tellus Rd.",
		"postalZip": "39375",
		"region": "Dōngběi",
		"country": "South Korea",
		"list": 7,
		"text": "convallis est, vitae sodales nisi magna sed dui. Fusce aliquam,",
		"numberrange": 3,
		"currency": "$3.41",
		"alphanumeric": "PXX17IBJ4ML"
	},
	{
		"name": "Tana Vasquez",
		"phone": "1-571-437-4632",
		"email": "lacinia.orci@hotmail.edu",
		"address": "9570 Orci. Rd.",
		"postalZip": "14055",
		"region": "İzmir",
		"country": "Vietnam",
		"list": 9,
		"text": "quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula. Pellentesque",
		"numberrange": 6,
		"currency": "$56.38",
		"alphanumeric": "AYW92DHF0XY"
	}
])
const keys = ref<any[]>([
    // { name: 'name', title: 'Имя' },
    // { name: 'phone', title: 'Телефон' },
    // { name: 'email', title: 'Почта' },
    // { name: 'address', title: 'Адрес' },
    // { name: 'postalZip', title: 'Индекс' },
    // { name: 'region', title: 'Регион' },
    // { name: 'country', title: 'Страна' },
    // { name: 'list', title: 'Список' },
    // { name: 'text', title: 'Текст' },
    // { name: 'numberrange', title: 'Рейтинг' },
    // { name: 'currency', title: 'Стоимость' },
    // { name: 'alphanumeric', title: 'Артикул' },
    

    {
        name: 'Основное',
        children: [
            { name: 'name', title: 'Имя' },
            { name: 'phone', title: 'Телефон' },
            { name: 'email', title: 'Почта' },
        ]
    }, 
    {
        name: 'Место',
        children: [
            { name: 'address', title: 'Адрес' },
            { name: 'postalZip', title: 'Индекс' },
            { name: 'region', title: 'Регион' },
            { name: 'country', title: 'Страна' },
        ]
    }, 
    {
        name: 'Описание',
        children: [
            { name: 'list', title: 'Список' },
            { name: 'text', title: 'Текст' },
            { name: 'numberrange', title: 'Рейтинг' },
            { name: 'currency', title: 'Стоимость' },
            { name: 'alphanumeric', title: 'Артикул' },
        ]
    },
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
        
        tr > td, th {
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
    
    &-padding {
        .tables__haed {
            border-bottom: none;
            margin-bottom: 10px;
        }

        .tables__body {
            padding-inline: 16px;
        }

        .tables__main > tr > td, th {
            &:first-child {
                border-left: 1px solid #606060;
            }
        }
    }
}
</style>

<template>
    <h2>Prototype</h2>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

// Поиск значение
const character = ref({
    characteristic: {
        experience: [
            {
                date: 'Master',
                level: {
                    value: 22,
                    watch: true,
                    rrs: null
                }
            },
            {
                date: 'beginning',
                level: {
                    value: 100,
                    watch: true,
                    rrs: 'Big'
                }
            }
        ]
    }
})

onMounted(() => {
})

console.log(character)
console.log(character.value)
// console.log(character.value.$findValue([ 'characteristic', 'experience', '[1]', 'level', 'value' ]))


// // Разница объектов
// const person = { name: 'Alex', age: 21 }
// const personOld = { name: 'Alex', age: 20 }
// console.log(person.$differences(personOld))


// // Отчистки объекта
// const clearObj = { name: 'Alex', age: 21, clear: { name: 'Alex', age: 21 } }
// console.log(clearObj.$clears())


// // Cозадет Query параметр
// const query = { name: 'Alex', age: 21 }
// console.log(query.$getQuery())


// // Вывода не пустых ключей объекта
// const not = { name: 'Alex', age: '', rr: null, sss: {}}
// console.log(not.$notEmpty())


// // Проверки на не пустату
// const objEmpty = { name: '', age: '', rr: null, sss: { ssee: '' }}
// console.log(objEmpty.$isNotEmpty())


// // Глубокое копирование объекта
// const newobj: any = {}
// newobj.$copy(person)
// console.log(newobj)
</script>

<style scoped lang="scss">
</style>

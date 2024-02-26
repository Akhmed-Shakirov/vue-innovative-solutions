<template>
    <div class="d-flex">
        <button @click="isModal = !isModal">New Todo</button>
        <button @click="isAdmin = !isAdmin">Admin: {{ isAdmin }}</button>
    </div>

    <Modal v-model="isModal" @ok="postTodo">
        <Input v-model="todo.name" label="Title" />
        <Datepicker v-model="todo.date" label="Date" isActiveDay isMin />
        <Select v-model="todo.user" :options="users" label="User" :keys="['name', 'id']" />
    </Modal>

    <template v-for="user in main_todos" :key="user.id">
        <h3>{{ user.name }}</h3>
        <div class="row">
            <div class="col-3" v-for="state in user.status" :key="state.id">
                <h3>{{ $t(state.name ?? '') }}</h3>
                <draggable class="list-group" :list="state.todos.sort((a: any, b: any) => a.order - b.order)" @change="(evt: any) => changesTodo(evt, state.todos, state.name, user.id)" :group="isAdmin ? 'admin' : user.name" itemKey="id">
                    <template #item="{ element }">
                        <div class="list-group-item">{{ element.name }}</div>
                    </template>
                </draggable>
            </div>
        </div>
    </template>
</template>
  
<script setup lang="ts">
import { Modal, Input, Select, Datepicker, draggable } from '../components'

import { ref, computed, onMounted } from 'vue'
import { useFetch } from '../composables'

const isModal = ref<boolean>(false)
const todo = ref<any>({})

const isAdmin = ref<boolean>(false)

const users = ref<any[]>([])
const status = ref<any[]>([])
const todos = ref<any[]>([])
const oldTodos = ref<any[]>([])

onMounted(async () => {
    users.value = await useFetch('users')
    status.value = await useFetch('status')
    todos.value = await useFetch('todos')
    oldTodos.value = JSON.parse(JSON.stringify(todos.value))
})

const main_todos = computed<any[]>(() => {
    return users.value.map((user: any) => ({ 
        ...user, 
        status: status.value.map((state: any) => ({ 
            ...state, 
            todos: todos.value
                            .filter((todo: any) => todo.user === user.id)
                            .filter((todo: any) => todo.state === state.id)
        })) 
    }))
})

const postTodo = async () => {
    const order = main_todos.value.find((user: any) => user.id == todo.value.user)?.status?.[0]?.todos?.length + 1

    const newTodo = await useFetch('todos', 'post', { ...todo.value, order, state: 1 })
    todos.value.push(newTodo)
    oldTodos.value.push(newTodo)
    todo.value = {}
}

const orderTodo = async (array: any[]) => {
    const newArray = array.map((el: any, index: number) => ({ ...el, order: index + 1 }))

    for (const item of newArray) {
        const oldItem = oldTodos.value.find((el: any) => el.id == item.id)
        if (oldItem.order != item.order && oldItem.state == item.state) {
            const newTodo = await useFetch(`todos/${item.id}`, 'patch', { order: item.order })
            const itemIndex = todos.value.findIndex((el: any) => el.id == item.id)
            todos.value.splice(itemIndex, 1, newTodo)
            oldTodos.value.splice(itemIndex, 1, newTodo)
        }
    }
}

const editTodo = async (array: any[], todo: any, state: string, user: number) => {
    const stateId = status.value.find((el: any) => el.name == state).id
    const index = array.findIndex((el: any) => el.id == todo.id)
    const newTodo = { ...todo, state: stateId }

    let newArray = array
    newArray.splice(index, 1, newTodo)
    newArray = newArray.map((el: any, index: number) => ({ ...el, order: index + 1 }))

    for (const item of newArray) {
        const oldItem = oldTodos.value.find((el: any) => el.id == item.id)
        if (oldItem.order != item.order || oldItem.state != stateId || oldItem.user != user) {
            const newTodo = await useFetch(`todos/${item.id}`, 'patch', { order: item.order, state: item.state, user })
            const itemIndex = todos.value.findIndex((el: any) => el.id == item.id)
            todos.value.splice(itemIndex, 1, newTodo)
            oldTodos.value.splice(itemIndex, 1, newTodo)
        }
    }
}

const changesTodo = (evt: any, tasks: any, state: string, userId: number) => {
    if (evt.added) {
        editTodo(tasks, evt.added.element, state, userId)
    }
    
    if (evt.removed || evt.moved) {
        orderTodo(tasks)
    }
}
</script>
  
<style scoped lang="scss">
.row {
    display: flex;
    gap: 30px;

    .list-group {
        min-width: 150px;
        min-height: 200px;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .list-group-item {
        cursor: all-scroll;
    }

    .sortable-ghost {
		background: #757575;
    }
}
</style>
  
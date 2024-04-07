<template>
    <div>
        <div class="d-flex j-center mb">
            <Button @click="posts_request()" value="GET" />
            <Button @click="posts_request('post')" value="POST" />
            <Button @click="posts_request('put')" value="PUT" />
            <Button @click="posts_request('patch')" value="PATCH" />
            <Button @click="posts_request('delete')" value="DELETE" />
        </div>
        <div v-if="posts.isLoading">
            <p>Loading...</p>
        </div>
        <div style="display: flex;" v-else>
            <div style="width: 500px;">
                <p v-for="post in posts.data" :key="post.id" @click="set_item(post)">
                    {{ post.name }}
                </p>
            </div>
            <div style="width: 500px;">
                <p v-for="post in data" :key="post.id" @click="set_item(post)">
                    {{ post.name }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '../components'
import { useService, useFetch } from '../composables'
import { ref } from 'vue'

const item = ref<any>({})
const old_item = ref<any>({})
const posts = ref<{ data: any[], isLoading: boolean, isError: boolean }>({
    data: [],
    isLoading: false,
    isError: false
})
const set_item = (event: any) => {
    item.value = JSON.parse(JSON.stringify(event))
    old_item.value = JSON.parse(JSON.stringify(event))
}
const posts_request = async (method: string = 'get', filter: any = '') => {
    let api: any = 'todos'

    if (typeof filter == 'string') {
        api = [`${api}${filter}`]
    } else {
        api = [ api, filter ]
    }

    item.value.ms = '123'
    let helper: any = { state: posts.value, item: item.value }

    if (method == 'GET') {
        helper = null
    } else if (method == 'PATCH') {
        helper.old_item = old_item.value ?? {}
    }


    posts.value = await useService(api, method, helper)

    if (!posts.value.isError) {
        // Good
    } else {
        // Error
    }
}
posts_request()

const data = ref<any>([])
const get_data = async () => {
    data.value = await useFetch(['todos', {}])
}
get_data()
</script>

<style scoped lang="scss"></style>

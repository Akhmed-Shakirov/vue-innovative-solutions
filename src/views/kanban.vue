<template>
    <div class="row">
        <div class="col-3" v-for="(value, key) in akhmed" :key="key">
            <h3>{{ key }}</h3>
            <draggable class="list-group" :list="value" group="akhmed" itemKey="name">
                <template #item="{ element }">
                    <div class="list-group-item">{{ element.name }} {{ element.id }}</div>
                </template>
            </draggable>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref } from 'vue'

const akhmed = ref<any>({
    draggable1: [
        { name: 'Todo', id: 1 },
        { name: 'Todo', id: 2 },
        { name: 'Todo', id: 3 },
        { name: 'Todo', id: 4 }
    ],
    draggable2: [
        { name: 'Todo', id: 5 },
        { name: 'Todo', id: 6 },
        { name: 'Todo', id: 7 }
    ],
    draggable3: [
        { name: 'Todo', id: 8 },
        { name: 'Todo', id: 9 },
        { name: 'Todo', id: 10 }
    ]
})
</script>
  
<style scoped lang="scss">
.row {
    display: flex;
    gap: 30px;

    .list-group {
        width: 300px;
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
  
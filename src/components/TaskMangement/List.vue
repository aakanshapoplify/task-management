<template>
  <div class="task-list">
    <Filter class="m-2" />
    <AddEditForm class="m-2" />
    <ul class="flex-col p-2">
      <Item
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        @edit-task="editTask"
        @delete-task="deleteTask"
        class="m-2"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Item from './Item.vue'
import Filter from './Filter.vue'
import AddEditForm from './AddEditForm.vue'
import { Task } from '../store/index'

export default defineComponent({
  components: { Item, Filter, AddEditForm },
  setup() {
    const store = useStore()
    const filteredTasks = computed(() => store.getters.filteredTasks)

    // Dispatch Edit
    const editTask = (task: Task) => store.dispatch('editTask', task)

    // Dispatch Detele
    const deleteTask = (taskId: number) => store.dispatch('deleteTask', taskId)

    return { filteredTasks, editTask, deleteTask }
  }
})
</script>

<style scoped>
.task-list {
  width: 100%;
  max-width: 100%;
}

@media (min-width: 768px) {
  .task-list {
    max-width: 750px;
    margin: auto;
  }
}
</style>

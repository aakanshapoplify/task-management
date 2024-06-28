<template>
  <div class="task-form task-list">
    <div class="flex flex-center">
      <AddEditForm class="m-2" :task="taskToEdit" @clear-edit="clearEditTask" />
      <Filter class="btn-status m-2" />
    </div>
    <table class="table-auto w-full m-2">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="task in filteredTasks"
          :key="task.id"
          :task="task"
          @edit-task="editTask"
          @delete-task="deleteTask"
          @update-task="updateTask"
          class="m-2"
        />
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import Item from './Item.vue'
import Filter from './Filter.vue'
import AddEditForm from './AddEditForm.vue'
import { Task } from '../store/index'

export default defineComponent({
  components: { Item, Filter, AddEditForm },
  setup() {
    const store = useStore()
    const taskToEdit = ref<Task | null>(null)

    const filteredTasks = computed(() => store.getters.filteredTasks)

    // Dispatch Edit
    const editTask = (task: Task) => {
      taskToEdit.value = { ...task } // Clone the task to avoid direct mutation
    }
    // Dispatch Detele
    const deleteTask = (taskId: number) => {
      store.dispatch('deleteTask', taskId)
      if (taskToEdit.value?.id === taskId) {
        taskToEdit.value = null
      }
    }
    const clearEditTask = () => {
      taskToEdit.value = null
    }
    // update status
    const updateTask = (task: Task) => {
      store.dispatch('updateTask', task)
    }

    // get list data on page load
    onMounted(() => {
      store.dispatch('fetchTasks')
    })

    return { filteredTasks, editTask, deleteTask, taskToEdit, updateTask, clearEditTask }
  }
})
</script>

<style scoped></style>

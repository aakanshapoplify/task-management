<template>
  <section class="section">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-head mt-3">
            <h2 class="card-title text-center">To Do App</h2>
            <div class="flex flex-center">
              <AddEditForm class="m-2" :task="taskToEdit" @clear-edit="clearEditTask" />
              <Filter class="btn-status m-2" />
            </div>
            <div class="card-body scrollit">
              <table class="table table-striped text-center">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
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
          </div>
        </div>
      </div>
    </div>
  </section>
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
      window.scrollTo(0, 0)
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
<
<style>
body {
  background: #f6f9ff;
}
.section {
  height: 100vh;
  margin-top: 30px;
}
.scrollit {
  overflow: scroll;
}
</style>

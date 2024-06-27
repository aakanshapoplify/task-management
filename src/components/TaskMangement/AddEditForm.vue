<template>
  <form @submit.prevent="onSubmit" class="task-form flex flex-col p-2">
    <input v-model="title" placeholder="Title" required class="m-2" />
    <button type="submit" class="m-2">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { Task } from '../store/index'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      default: () => ({ title: '', status: 'pending' })
    }
  },
  setup(props) {
    const store = useStore()
    const title = ref('')
    const status = ref('')

    // Function to reset form values
    const resetForm = () => {
      title.value = props?.task?.title || ''
      status.value = props?.task?.status || 'pending'
    }

    // Watch the task prop and reset form values when it changes
    watch(
      () => props?.task,
      (newTask) => {
        resetForm()
      },
      { immediate: true }
    )

    // Submit Form at add & Edited
    const onSubmit = () => {
      const updatedTask = {
        ...props.task,
        title: title.value,
        status: status.value
      }
      if (updatedTask.id) {
        store.dispatch('editTask', updatedTask)
      } else {
        updatedTask.id = Date.now()
        store.dispatch('addTask', updatedTask)
      }
      resetForm()
    }

    return { title, onSubmit }
  }
})
</script>

<style scoped>
.task-form {
  background: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

@media (min-width: 768px) {
  .task-form {
    max-width: 750px;
    margin: auto;
  }
}
</style>

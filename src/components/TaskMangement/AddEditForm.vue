<template>
  <form @submit.prevent="onSubmit" class="flex p-2">
    <div class="form-section flex">
      <input type="text" v-model="title" placeholder="Title" required />
      <button type="submit" class="btn btn-secondary m-2 btn-status">Save</button>
    </div>
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
  emits: ['clear-edit'],
  setup(props, { emit }) {
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
      console.log('submit ')
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
      emit('clear-edit')

      resetForm()
    }
    const clearEdit = () => {
      emit('clear-edit')
      resetForm()
    }

    return { title, onSubmit, clearEdit }
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
  input {
    width: 100%;
    padding: 10px;
    margin: 5px 30px 5px 12px;
    box-sizing: border-box;
    border: none;
    border-radius: 25px;
    color: black;
    font-size: 16px 20px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  input::placeholder {
    color: black;
  }

  input:focus {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
    outline: none;
  }
}
</style>

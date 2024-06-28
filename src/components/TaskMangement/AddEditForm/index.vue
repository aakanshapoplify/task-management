<template>
  <form @submit.prevent="onSubmit" class="flex edit-form">
    <div class="form-section flex align-items-center">
      <input
        type="text"
        v-model="title"
        placeholder="Add Task"
        maxlength="50"
        required
        @keypress="removeSpace($event)"
      />
      <button type="submit" class="btn btn-success btn-status">
        {{ isEditMode ? 'Update' : 'Add' }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'
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
    const isEditMode = ref(false)

    // Function to reset form values
    const resetForm = () => {
      title.value = props?.task?.title || ''
      status.value = props?.task?.status || 'pending'
      isEditMode.value = !!props?.task?.id
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
    const removeSpace = (event) => {
      console.log('eveng', title.value)
      if (!title.value) {
        if (event.which === 32) {
          event.preventDefault()
        }
      }
    }
    return { title, onSubmit, clearEdit, isEditMode, removeSpace }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

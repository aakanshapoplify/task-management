<template>
  <tr>
    <td class="text-center">{{ task.title }}</td>
    <td
      class="text-center pointer"
      @click="onUpdate"
      :class="task.status == 'pending' ? 'warning' : 'success'"
    >
      {{ task.status }}
    </td>
    <td class="text-center">
      <button @click="onEdit" class="btn btn-secondary m-2 btn-status">Edit</button>
      <button @click="onDelete" class="btn btn-secondary m-2 btn-status">Delete</button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Task } from '../store/index'
import Swal from 'sweetalert2'

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    }
  },
  emits: ['edit-task', 'delete-task', 'update-task'],
  setup(props, { emit }) {
    const onEdit = () => emit('edit-task', props.task)
    const onDelete = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this task.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Confirm',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('result.isConfirmed', result.isConfirmed)
          emit('delete-task', props.task.id)
        }
      })
    }
    const onUpdate = () => {
      if (props.task.status == 'pending') {
        props.task.status = 'completed'
        emit('update-task', props.task)
      }
    }

    return { onEdit, onDelete, onUpdate }
  }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

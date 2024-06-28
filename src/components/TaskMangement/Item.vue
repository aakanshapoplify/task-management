<template>
  <tr>
    <td class="text-center">{{ task.title }}</td>
    <td
      class="text-center"
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
  name: 'List',
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

<style scoped>
.task-title {
  font-weight: bold;
}

.task-desc {
  margin-top: 5px;
}

.task-actions {
  margin-top: 10px;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .task-item {
    flex-direction: row;
    align-items: center;
  }

  .task-title,
  .task-desc {
    flex: 1;
  }

  .task-actions {
    justify-content: flex-end;
  }
  .success {
    color: green;
  }
  .warning {
    color: #bdbd0a;
  }
}
</style>

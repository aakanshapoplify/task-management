<template>
  <tr>
    <td class="border px-4 py-2">{{ task.title }}</td>
    <td
      class="border px-4 py-2 pointer"
      @click="onUpdate"
      :class="task.status == 'pending' ? 'warning' : 'success'"
    >
      {{ task.status }}
    </td>
    <td class="border px-4 py-2">
      <button @click="onEdit" class="btn btn-secondary m-2 btn-status">Edit</button>
      <button @click="onDelete" class="btn btn-secondary m-2 btn-status">Delete</button>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Task } from '../store/index'

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
    const onDelete = () => emit('delete-task', props.task.id)
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

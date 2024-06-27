<template>
  <li class="task-item flex flex-col p-2 m-2">
    <div class="task-title">{{ task.title }}</div>
    <div class="task-desc">{{ task.description }}</div>
    <div class="task-actions flex">
      <button @click="onEdit" class="m-2">Edit</button>
      <button @click="onDelete" class="m-2">Delete</button>
    </div>
  </li>
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
  emits: ['edit-task', 'delete-task'],
  setup(props, { emit }) {
    const onEdit = () => emit('edit-task', props.task)
    const onDelete = () => emit('delete-task', props.task.id)

    return { onEdit, onDelete }
  }
})
</script>

<style scoped>
.task-item {
  background: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

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
}
</style>

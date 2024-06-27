<template>
  <div class="task-filter flex justify-around p-2">
    <button @click="setFilter('all')" class="m-2">All</button>
    <button @click="setFilter('pending')" class="m-2">Pending</button>
    <button @click="setFilter('completed')" class="m-2">Completed</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    //Handle fliter Data
    const setFilter = (filter: 'all' | 'pending' | 'completed') =>
      store.dispatch('setFilter', filter)

    return { setFilter }
  }
})
</script>

<style scoped>
.task-filter {
  background: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (min-width: 768px) {
  .task-filter {
    justify-content: space-around;
  }
}
</style>

<template>
  <div class="dropdown">
    <button
      class="btn btn-secondary dropdown-toggle btn-status"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Filter
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><a class="dropdown-item" @click="setFilter('all')" href="#">All</a></li>
      <li><a class="dropdown-item" @click="setFilter('pending')" href="#">Pending</a></li>
      <li><a class="dropdown-item" @click="setFilter('completed')" href="#">Completed</a></li>
    </ul>
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

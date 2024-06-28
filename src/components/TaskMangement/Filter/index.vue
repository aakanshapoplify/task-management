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


<style lang="scss" scoped>
  @import "./style.scss"
</style>
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createStore } from 'vuex'
import List from '@/components/TaskMangement/List/index.vue'

// Mock Vuex store
const mockStore = createStore({
  state: {
    tasks: [
      { id: 1, title: 'Task 1', status: 'pending' },
      { id: 2, title: 'Task 2', status: 'completed' }
    ],
    filter: 'all'
  },
  mutations: {
    setTasks(state: { tasks: any }, tasks: any) {
      state.tasks = tasks
    },
    // Define other mutations as needed
  },
  actions: {
    fetchTasks({ commit }:any) {
      commit('setTasks', [
        { id: 1, title: 'Task 1', status: 'pending' },
        { id: 2, title: 'Task 2', status: 'completed' }
      ])
    },
    // Define other actions as needed
  },
  getters: {
    filteredTasks: (state: { filter: string; tasks: any[] }) => {
      if (state.filter === 'all') {
        return state.tasks
      }
      return state.tasks.filter(t => t.status === state.filter)
    }
    // Define other getters as needed
  }
})

describe('List.vue', () => {
  let wrapper:any

  beforeEach(() => {
    wrapper = mount(List, {
      global: {
        plugins: [mockStore]
      }
    })
  })

  it('renders tasks correctly', () => {
    const tasks = wrapper.findAll('tbody tr')
    expect(tasks.length).toBe(2) // Assuming two tasks in the mock store
  })

  it('filters tasks based on status', async () => {
    await wrapper.getStore().dispatch('setFilter', 'pending')
    await wrapper.vm.$nextTick()
    const tasks = wrapper.findAll('tbody tr')
    expect(tasks.length).toBe(1)
    expect(tasks[0].text()).toContain('Task 1')
  })

  it('emits "edit-task" event when edit button is clicked', async () => {
    const editButton = wrapper.find('button.btn-secondary')
    await editButton.trigger('click')
    expect(wrapper.emitted('edit-task')?.length).toBe(1)
    expect(wrapper.emitted('edit-task')?.[0][0]?.title).toBe('Task 1')
  })

  it('emits "delete-task" event when delete button is clicked', async () => {
    const deleteButton = wrapper.findAll('button.btn-secondary')[1]
    await deleteButton.trigger('click')
    expect(wrapper.emitted('delete-task')?.length).toBe(1)
    expect(wrapper.emitted('delete-task')?.[0][0]).toBe(1)
  })

  it('emits "update-task" event when task status is clicked', async () => {
    const statusCell = wrapper.find('td.pointer')
    await statusCell.trigger('click')
    expect(wrapper.emitted('update-task')?.length).toBe(1)
    expect(wrapper.emitted('update-task')?.[0][0]?.status).toBe('completed')
  })
})

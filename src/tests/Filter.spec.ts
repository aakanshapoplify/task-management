
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import Filter from '@/components/TaskMangement/Filter/index.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('index.vue', () => {
  let store: any
  let state: any
  let actions: any

  beforeEach(() => {
    state = {
      tasks: [
        { id: 1, status: 'pending', description: 'Task 1' },
        { id: 2, status: 'completed', description: 'Task 2' },
        { id: 3, status: 'pending', description: 'Task 3' },
      ],
      filter: 'all',
    }

    actions = {
      setFilter: vi.fn(),
    }

    store = createStore({
      state,
      actions,
      getters: {
        filteredTasks: (state: any) => {
          if (state.filter === 'all') {
            return state.tasks
          }
          return state.tasks.filter((task: any) => task.status === state.filter)
        },
      },
    })
  })

  it('renders filter dropdown', () => {
    const wrapper = mount(Filter, {
      global: {
        plugins: [store],
      },
    })
    expect(wrapper.find('.dropdown-toggle').exists()).toBe(true)
    expect(wrapper.findAll('.dropdown-item').length).toBe(3)
  })

  it('dispatches "setFilter" with correct arguments when a filter is clicked', async () => {
    const wrapper = mount(Filter, {
      global: {
        plugins: [store],
      },
    })

    const filterItems = wrapper.findAll('.dropdown-item')

    await filterItems[0].trigger('click')
    expect(actions.setFilter).toHaveBeenCalledWith(expect.anything(), 'all')

    await filterItems[1].trigger('click')
    expect(actions.setFilter).toHaveBeenCalledWith(expect.anything(), 'pending')

    await filterItems[2].trigger('click')
    expect(actions.setFilter).toHaveBeenCalledWith(expect.anything(), 'completed')
  })
})

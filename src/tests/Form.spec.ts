import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import AddEditForm from '@/components/TaskMangement/AddEditForm/index.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { nextTick } from 'vue'

describe('AddEditForm.vue', () => {
  let store: any
  let state: any
  let actions: any

  beforeEach(() => {
    state = {
      tasks: [],
      filter: 'all',
    }

    actions = {
      addTask: vi.fn(),
      editTask: vi.fn(),
    }

    store = createStore({
      state,
      actions,
    })
  })

  it('renders form input and button', () => {
    const wrapper = mount(AddEditForm, {
      props: {
        task: { title: '', status: 'pending' },
      },
      global: {
        plugins: [store],
      },
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('dispatches "addTask" action when form is submitted with new task', async () => {
    const wrapper = mount(AddEditForm, {
      props: {
        task: { title: '', status: 'pending' },
      },
      global: {
        plugins: [store],
      },
    })

    await wrapper.find('input[type="text"]').setValue('New Task')
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions.addTask).toHaveBeenCalled()
    expect(actions.addTask.mock.calls[0][1].title).toBe('New Task')
  })

  it('dispatches "editTask" action when form is submitted with existing task', async () => {
    const wrapper = mount(AddEditForm, {
      props: {
        task: { id: 1, title: 'Existing Task', status: 'pending' },
      },
      global: {
        plugins: [store],
      },
    })

    await wrapper.find('input[type="text"]').setValue('Updated Task')
    await wrapper.find('form').trigger('submit.prevent')

    expect(actions.editTask).toHaveBeenCalled()
    expect(actions.editTask.mock.calls[0][1].title).toBe('Updated Task')
  })
})

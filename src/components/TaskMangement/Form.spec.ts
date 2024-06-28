import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import type { State, State as Task } from '../../Store/crud'
import AddEditForm from '../TaskMangement/A'

const task: Task = { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' }

const store = createStore<State>({
  state: {
    tasks: [],
    filter: 'all'
  },
  actions: {
    addTask: vi.fn(),
    editTask: vi.fn()
  }
})

describe('TaskForm.vue', () => {
  it('submits a new task correctly', async () => {
    const wrapper = mount(TaskForm, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.find('input[placeholder="Title"]').setValue('New Task')
    await wrapper.find('input[placeholder="Description"]').setValue('New Description')
    await wrapper.find('form').trigger('submit.prevent')

    expect(store.dispatch).toHaveBeenCalledWith('addTask', expect.any(Object))
  })

  it('edits an existing task correctly', async () => {
    const wrapper = mount(TaskForm, {
      props: { task },
      global: {
        plugins: [store]
      }
    })

    await wrapper.find('input[placeholder="Title"]').setValue('Edited Task')
    await wrapper.find('input[placeholder="Description"]').setValue('Edited Description')
    await wrapper.find('form').trigger('submit.prevent')

    expect(store.dispatch).toHaveBeenCalledWith('editTask', {
      ...task,
      title: 'Edited Task',
      description: 'Edited Description'
    })
  })
})

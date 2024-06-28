import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { VueWrapper, mount, shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'
import List from './List.vue'
import { Task } from '../store/index'

// Mocked Vuex store
const tasks: Task[] = [
  { id: 1, title: 'Task 1', status: 'pending' },
  { id: 2, title: 'Task 2', status: 'completed' }
]

const store = createStore({
  state: {
    tasks
  },
  getters: {
    filteredTasks: (state: any) => state.tasks
  },
  actions: {
    fetchTasks: jest.fn(),
    deleteTask: jest.fn(),
    updateTask: jest.fn()
  }
})

describe('ToDoApp.vue', () => {
  let wrapper: VueWrapper<any, any>

  beforeEach(() => {
    wrapper = shallowMount(List, {
      global: {
        plugins: [store]
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct number of tasks', () => {
    const taskRows = wrapper.findAll('tbody tr')
    expect(taskRows.length).toBe(tasks.length)
  })

  it('calls fetchTasks on mount', () => {
    expect(store.dispatch).toHaveBeenCalledWith('fetchTasks')
  })

  it('edits a task', async () => {
    const task = tasks[0]
    await wrapper.vm.editTask(task)
    expect(wrapper.vm.taskToEdit).toEqual(task)
  })

  it('deletes a task', async () => {
    const taskId = tasks[0].id
    await wrapper.vm.deleteTask(taskId)
    expect(store.dispatch).toHaveBeenCalledWith('deleteTask', taskId)
  })

  it('updates a task', async () => {
    const task = tasks[0]
    await wrapper.vm.updateTask(task)
    expect(store.dispatch).toHaveBeenCalledWith('updateTask', task)
  })

  it('clears the edit task', async () => {
    await wrapper.vm.clearEditTask()
    expect(wrapper.vm.taskToEdit).toBeNull()
  })
})

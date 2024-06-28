// import { mount } from '@vue/test-utils'
// import List from './List.vue'
// import { createStore } from 'vuex'
// import { State, Task } from '@/store/index'
// import { describe } from 'node:test'

// const tasks: Task[] = [
//   { id: 1, title: 'Task 1', description: 'Description 1', status: 'pending' },
//   { id: 2, title: 'Task 2', description: 'Description 2', status: 'completed' }
// ]

// const store = createStore<State>({
//   state: {
//     tasks,
//     filter: 'all'
//   },
//   getters: {
//     filteredTasks: (state) => state.tasks
//   },
//   actions: {
//     fetchTasks: vi.fn()
//   }
// })

// describe('TaskList.vue', () => {
//   it('renders tasks correctly', async () => {
//     const wrapper = mount(List, {
//       global: {
//         plugins: [store]
//       }
//     })

//     await store.dispatch('fetchTasks')
//     expect(wrapper.findAll('tr').length).toBe(3) // Including header row
//   })
// })
// function expect(length: any) {
//   throw new Error('Function not implemented.')
// }

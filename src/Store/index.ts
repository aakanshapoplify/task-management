import { createStore } from 'vuex'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'completed'
}

interface State {
  tasks: Task[]
  filter: 'all' | 'pending' | 'completed'
}

export default createStore<State>({
  state: {
    tasks: [],
    filter: 'all'
  },

  // Handle Mutation and state
  mutations: {
    addTask(state: any, task: Task) {
      state.tasks.push(task)
    },
    editTask(state: any, updatedTask: Task) {
      const index = state.tasks.findIndex((task: any) => task.id == updatedTask.id)
      if (index !== -1) {
        state.tasks[index] = updatedTask
      }
    },
    deleteTask(state: any, taskId: number) {
      state.tasks = state.tasks.filter((task: any) => task.id !== taskId)
    },
    setFilter(state: any, filter: 'all' | 'pending' | 'completed') {
      state.filter = filter
    }
  },

  // Handle Actions
  actions: {
    addTask({ commit }: { commit: any }, task: Task) {
      commit('addTask', task)
    },
    editTask({ commit }: { commit: any }, task: Task) {
      commit('editTask', task)
    },
    deleteTask({ commit }: { commit: any }, taskId: number) {
      commit('deleteTask', taskId)
    },
    setFilter({ commit }: { commit: any }, filter: 'all' | 'pending' | 'completed') {
      commit('setFilter', filter)
    }
  },

  //Handle Filter
  getters: {
    filteredTasks: (state: any) => {
      if (state.filter === 'all') {
        return state.tasks
      }
      return state.tasks.filter((task: any) => task.status === state.filter)
    }
  }
})

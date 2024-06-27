import { createStore } from 'vuex'
import axios from 'axios'

interface Task {
  id: number
  title: string
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
    setTasks(state: any, tasks: Task[]) {
      state.tasks = tasks
    },
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
    updateTask(state: any, updatedTask: Task) {
      const index = state.tasks.findIndex((task: any) => task.id == updatedTask.id)
      if (index !== -1) {
        state.tasks[index] = updatedTask
      }
    },
    setFilter(state: any, filter: 'all' | 'pending' | 'completed') {
      state.filter = filter
    }
  },

  // Handle Apis
  actions: {
    async fetchTasks({ commit }: { commit: any }) {
      await axios
        .get('http://localhost:3000/taskList')
        .then((response) => {
          if (response.data) {
            commit('setTasks', response.data)
          }
        })
        .catch((error) => {
          console.log(error.response.data.message || error.message || 'Error')
        })
    },
    async addTask({ commit }: { commit: any }, task: Task) {
      await axios
        .post('http://localhost:3000/taskList', task)
        .then((response) => {
          if (response.data) {
            commit('addTask', response.data)
          }
        })
        .catch((error) => {
          console.log(error.response.data.message || error.message || 'Error')
        })
    },
    async editTask({ commit }: { commit: any }, task: Task) {
      await axios
        .put(`http://localhost:3000/taskList/${task.id}`, task)
        .then((response) => {
          if (response.data) {
            commit('editTask', response.data)
          }
        })
        .catch((error) => {
          console.log(error.response.data.message || error.message || 'Error')
        })
    },
    async deleteTask({ commit }: { commit: any }, taskId: number) {
      await axios
        .delete(`http://localhost:3000/taskList/${taskId}`)
        .then((response) => {
          if (response.data) {
            commit('deleteTask', taskId)
          }
        })
        .catch((error) => {
          console.log(error.response.data.message || error.message || 'Error')
        })
    },

    async updateTask({ commit }: { commit: any }, task: Task) {
      await axios
        .put(`http://localhost:3000/taskList/${task.id}`, task)
        .then((response) => {
          if (response.data) {
            commit('updateTask', response.data)
          }
        })
        .catch((error) => {
          console.log(error.response.data.message || error.message || 'Error')
        })
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

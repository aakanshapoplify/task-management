interface Task {
  id: number
  title: any
  status: 'pending' | 'completed'
}

export interface State {
  id: number
  tasks: Task[]
  filter: 'all' | 'pending' | 'completed'
}

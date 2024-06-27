interface Task {
  id: number
  title: string
  status: 'pending' | 'completed'
}

export interface State {
  id: number
  tasks: Task[]
  filter: 'all' | 'pending' | 'completed'
}

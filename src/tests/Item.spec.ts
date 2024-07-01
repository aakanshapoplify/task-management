
import { mount } from '@vue/test-utils'
import Item from '@/components/TaskMangement/Item/index.vue' // adjust the path as necessary
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Swal from 'sweetalert2'

vi.mock('sweetalert2', async (importOriginal) => {
  const actual:any = await importOriginal()
  return {
    ...actual,
    default: {
      ...actual.default,
      fire: vi.fn().mockResolvedValue({ isConfirmed: true })
    }
  }
})

describe('Item.vue', () => {
  let task: any

  beforeEach(() => {
    task = {
      id: 1,
      title: 'Test Task',
      status: 'pending'
    }
  })

  it('renders task title and status', () => {
    const wrapper = mount(Item, {
      props: {
        task
      }
    })
    expect(wrapper.find('td.text-center').text()).toBe(task.title)
    expect(wrapper.find('td.pointer').text()).toBe(task.status)
  })

  it('emits "edit-task" event when Edit button is clicked', async () => {
    const wrapper = mount(Item, {
      props: {
        task
      }
    })
    await wrapper.find('button.btn-secondary').trigger('click')
    expect(wrapper.emitted('edit-task')).toBeTruthy()
    expect(wrapper.emitted('edit-task')?.[0]).toEqual([task])
  })

  it('emits "delete-task" event when Delete button is clicked', async () => {
    const wrapper = mount(Item, {
      props: {
        task
      }
    })
    await wrapper.findAll('button.btn-secondary')[1].trigger('click')
    expect(Swal.fire).toHaveBeenCalled()
    expect(wrapper.emitted('delete-task')).toBeTruthy()
    expect(wrapper.emitted('delete-task')?.[0]).toEqual([task.id])
  })

  it('emits "update-task" event and changes status when task status is clicked', async () => {
    const wrapper = mount(Item, {
      props: {
        task
      }
    })
    await wrapper.find('td.pointer').trigger('click')
    expect(wrapper.emitted('update-task')).toBeTruthy()
    expect(wrapper.emitted('update-task')?.[0]).toEqual([{ ...task, status: 'completed' }])
  })

  it('does not change status if task is already completed', async () => {
    task.status = 'completed'
    const wrapper = mount(Item, {
      props: {
        task
      }
    })
    await wrapper.find('td.pointer').trigger('click')
    expect(wrapper.emitted('update-task')).toBeFalsy()
  })
})

describe('Task Management', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays tasks correctly', () => {
    cy.intercept('GET', 'http://localhost:3000/tasks', { fixture: 'tasks.json' }).as('getTasks')
    cy.wait('@getTasks')

    cy.get('table').should('contain', 'Task 1').and('contain', 'Task 2')
  })

  it('adds a new task', () => {
    cy.intercept('POST', 'http://localhost:3000/tasks').as('addTask')

    cy.get('input[placeholder="Title"]').type('New Task')
    cy.contains('button', 'Add').click()

    cy.wait('@addTask')
    cy.get('table').should('contain', 'New Task')
  })

  it('edits an existing task', () => {
    cy.intercept('PUT', 'http://localhost:3000/tasks/*').as('editTask')

    cy.contains('tr', 'Task 1').within(() => {
      cy.contains('button', 'Update').click()
    })

    cy.get('input[placeholder="Title"]').clear().type('Updated Task 1')
    cy.contains('button', 'Save').click()

    cy.wait('@editTask')
    cy.get('table').should('contain', 'Updated Task 1')
  })

  it('deletes a task', () => {
    cy.intercept('DELETE', 'http://localhost:3000/tasks/*').as('deleteTask')

    cy.contains('tr', 'Task 1').within(() => {
      cy.contains('button', 'Delete').click()
    })

    cy.wait('@deleteTask')
    cy.get('table').should('not.contain', 'Task 1')
  })
})

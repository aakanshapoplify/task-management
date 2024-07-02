describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Adds a new task', () => {
    cy.get('.edit-form input[type="text"]').type('New Task');
    cy.get('.edit-form button[type="submit"]').click();
    cy.get('.table tbody').should('contain', 'New Task');
  });

  it('Filters tasks by status', () => {
    cy.get('.dropdown-toggle').click();
    cy.get('.dropdown-menu').contains('Pending').click();
    cy.get('.table tbody tr').should('have.length.gt', 0); 
  });

  it('Deletes a task', () => {
    cy.get('.table tbody tr').then(($rows) => {
      const initialLength = $rows.length;
      cy.get('.table tbody').find('tr').first().as('task');
      cy.get('@task').contains('Delete').click();
      cy.get('.swal2-confirm').click(); 
      cy.get('.table tbody tr').should('have.length', initialLength );
    });
  });
});

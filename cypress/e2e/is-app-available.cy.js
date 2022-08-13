describe('app is available', () => {
  beforeEach(function() {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('ingredients')
  })
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000/')
  })
})
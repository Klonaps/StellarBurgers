describe('Check order way', function() {
  beforeEach(function() {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('ingredients')
    cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' }).as('login')
    cy.intercept('POST', '/api/orders', { fixture: 'orders.json' }).as('orders')
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refresh-token'))
    window.localStorage.setItem('accessToken', JSON.stringify('test-access-token'))
  })
  afterEach(function() {
    window.localStorage.clear()
  })
  before(function() {
    cy.visit('http://localhost:3000')
  })

  it('should open constructor page by default', function() {
    cy.contains('Соберите бургер')
  })

  it('should open ingredient detail modal', function() {
    cy.get('[data-testid="ingredient"]').first().click()
    cy.contains('Детали ингредиента')
  })

  it('should close modal', function() {
    cy.get('[data-testid="close"]').click()
  })

  it('should drag bun ingredient to droptarget', function() {
    cy.get('[data-testid="ingredient"]').first()
      .trigger('dragstart')
    cy.get('[data-testid="dropbox"]')
      .trigger('drop')
  })

  it('should drag two ingredients to droptarget', function() {
    cy.get('[data-testid="ingredient"]').contains('Ингредиент 1')
      .trigger('dragstart')
    cy.get('[data-testid="dropbox"]')
      .trigger('drop')
    cy.get('[data-testid="ingredient"]').contains('Ингредиент 2')
      .trigger('dragstart')
    cy.get('[data-testid="dropbox"]')
      .trigger('drop')
    cy.get('[data-testid="ingredient"]').contains('Ингредиент 1')
      .trigger('dragstart')
    cy.get('[data-testid="dropbox"]')
      .trigger('drop')
  })

  it('should delete ingredient from constructor', function() {
    cy.get('.constructor-element__action').eq(1).click()
  })

  it('should try to make order', function() {
    cy.get('button').contains('Оформить заказ').click()
  })

  it('should visit to login page', function() {
    cy.contains('Вход')
  })

  it('should typing auth data', function() {
    cy.get('[data-testid="email-input"]').type('test@ya.ru')
    cy.get('[data-testid="password-input"]').type('testing{enter}')
    cy.wait("@login").its('request.body').should("deep.equal", {
      email: "test@ya.ru",
      password: "testing",
    })
  })

  it('should redirect to constructor page', function() {
    cy.contains('Соберите бургер')
  })

  it('should try to make order again', function() {
    cy.get('button').contains('Оформить заказ').click()
    cy.wait('@orders').its('request.body').should("deep.equal", {ingredients: ["4", "3", "1"]});
  })

  it('should open order modal correct', function() {
    cy.contains('111')
    cy.contains('идентификатор заказа')
    cy.contains('Ваш заказ начали готовить')
  })

})
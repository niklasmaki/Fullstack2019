

describe('Login page', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('shows the login form', function () {
    cy.contains('Log in to the application')
    cy.contains('Username:')
    cy.contains('Password:')
  })

  it('shows an error message if login fails', function () {
    cy.get('#username')
      .type('testuser')
    cy.get('#password')
      .type('wrongpassword')
    cy.get('#loginButton')
      .click()
    cy.contains('Wrong username or password')
  })

  it('lets the user log in', function () {
    cy.get('#username')
      .type('testuser')
    cy.get('#password')
      .type('asd')
    cy.get('#loginButton')
      .click()
    cy.contains('Blogs')
    cy.contains('Logout')
  })

})


before(function () {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
  const user = {
    name: 'Test User',
    username: 'testuser',
    password: 'asd'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

describe('Login page', function () {
  before(function () {
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

describe('Blogs page', function () {
  before(function () {
    cy.visit('http://localhost:3000')
    cy.get('#username')
      .type('testuser')
    cy.get('#password')
      .type('asd')
    cy.get('#loginButton')
      .click()
  })

  it('lets the user add a new blog', function () {
    cy.get('#toggleBlogForm')
      .click()
    cy.get('#title')
      .type('React patterns')
    cy.get('#author')
      .type('Michael Chan')
    cy.get('#url')
      .type('https://reactpatterns.com/')
    cy.get('#addBlog')
      .click()
    cy.contains('A new blog React patterns by Michael Chan added')
  })

  it('lists the added blog', function () {
    cy.contains('React patterns')
    cy.contains('Michael Chan')
  })

  it('shows extra info about a blog', function () {
    cy.get('.title > a')
      .click()
    cy.contains('React patterns')
    cy.contains('Michael Chan')
    cy.contains('https://reactpatterns.com/')
    cy.contains('0 likes')
    cy.contains('Like')
    cy.contains('Added by Test User')
    cy.contains('Remove')
  })
})
/// <reference types="Cypress"/>


describe('Teste funcional de login', () => {
  it('Deve executar login com sucesso', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('#login-button').click()
  });

  it('Validar login incorreto', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type("standard_user1")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('#login-button').click()
  });

  it('Validar senha incorreta', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce2")
    cy.get('#login-button').click()
  });
});
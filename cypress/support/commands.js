// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comandos Allure
Cypress.Commands.add('allureStep', (stepName, stepFunction) => {
  cy.allure().step(stepName, stepFunction);
});

Cypress.Commands.add('allureTag', (tag) => {
  cy.allure().tag(tag);
});

Cypress.Commands.add('allureSeverity', (severity) => {
  cy.allure().severity(severity);
});

// Comando para login reutilizável
Cypress.Commands.add('login', (username, password) => {
  cy.allureStep('Realizar login', () => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('#login-button').click();
  });
});

// Comando para adicionar produto ao carrinho
Cypress.Commands.add('addToCart', (productName) => {
  cy.allureStep(`Adicionar ${productName} ao carrinho`, () => {
    cy.contains(productName).click();
    cy.get('[data-test="add-to-cart"]').click();
  });
});
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comandos personalizados para Allure Report
Cypress.Commands.add('allureStep', (stepName, stepFunction) => {
  if (Cypress.env('allure')) {
    cy.allure().step(stepName, stepFunction);
  } else {
    stepFunction();
  }
});

Cypress.Commands.add('allureLabel', (name, value) => {
  if (Cypress.env('allure')) {
    cy.allure().label(name, value);
  }
});

Cypress.Commands.add('allureTag', (tag) => {
  if (Cypress.env('allure')) {
    cy.allure().tag(tag);
  }
});

Cypress.Commands.add('allureDescription', (description) => {
  if (Cypress.env('allure')) {
    cy.allure().description(description);
  }
});

Cypress.Commands.add('allureSeverity', (severity) => {
  if (Cypress.env('allure')) {
    cy.allure().severity(severity);
  }
});

Cypress.Commands.add('allureOwner', (owner) => {
  if (Cypress.env('allure')) {
    cy.allure().owner(owner);
  }
});

Cypress.Commands.add('allureEpic', (epic) => {
  if (Cypress.env('allure')) {
    cy.allure().epic(epic);
  }
});

Cypress.Commands.add('allureFeature', (feature) => {
  if (Cypress.env('allure')) {
    cy.allure().feature(feature);
  }
});

Cypress.Commands.add('allureStory', (story) => {
  if (Cypress.env('allure')) {
    cy.allure().story(story);
  }
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
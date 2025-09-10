// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Comandos customizados para testes de API
Cypress.Commands.add('apiLogin', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://www.saucedemo.com/api/auth/login',
    body: {
      username: username,
      password: password
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiGetProducts', () => {
  return cy.request({
    method: 'GET',
    url: 'https://www.saucedemo.com/api/products',
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiGetCart', () => {
  return cy.request({
    method: 'GET',
    url: 'https://www.saucedemo.com/api/cart',
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiAddToCart', (productId) => {
  return cy.request({
    method: 'POST',
    url: 'https://www.saucedemo.com/api/cart/add',
    body: {
      productId: productId
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiCheckout', (checkoutData) => {
  return cy.request({
    method: 'POST',
    url: 'https://www.saucedemo.com/api/checkout',
    body: checkoutData,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('validateApiResponse', (response, expectedStatus) => {
  expect(response.status).to.be.oneOf(expectedStatus);
  return cy.wrap(response);
});

Cypress.Commands.add('logApiResponse', (response, description) => {
  cy.log(`${description}:`, response);
  return cy.wrap(response);
});
/// <reference types="Cypress"/>


describe('Teste funcional de compra', () => {
  it('Deve executar compra com sucesso', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory')
    cy.wait(2000)
    cy.get('.inventory_list').should('be.visible')
    cy.get('select').first().should('be.visible').select('Price (low to high)')

    cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
    cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
    cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')
    cy.get(':nth-child(4) > [data-test="inventory-item-description"]').should('contain', 'Test.allTheThings() T-Shirt (Red)')
    cy.get(':nth-child(5) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Backpack')
    cy.get(':nth-child(6) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Fleece Jacket')


    cy.contains('Sauce Labs Onesie').click()
    cy.get('[data-test="add-to-cart"]').click()

    cy.get('[data-test="back-to-products"]').click()
    cy.contains('Sauce Labs Bike Light').click()
    cy.get('[data-test="add-to-cart"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('João')
    cy.get('[data-test="lastName"]').type('Santos')
    cy.get('[data-test="postalCode"]').type('1234567890')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
    cy.contains('Thank you for your order!').should('be.visible') 
  });

});
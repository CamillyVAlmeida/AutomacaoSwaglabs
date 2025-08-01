/// <reference types="Cypress"/>


describe('Teste funcional de login', () => {
  it.only('Deve executar login com sucesso', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('#login-button').click()

// Verifica se o login foi bem-sucedido
    cy.url().should('include', '/inventory')
    
// Aguarda a página carregar completamente
    cy.wait(2000)
    
// Debug: verifica se estamos na página correta
    cy.get('.inventory_list').should('be.visible')
    
// Debug: inspeciona todos os elementos select na página
    cy.get('select').then(($selects) => {
      cy.log(`Encontrados ${$selects.length} elementos select`)
      $selects.each((index, element) => {
        cy.log(`Select ${index}:`, element.outerHTML)
      })
    })
    
// Tenta diferentes seletores possíveis para o dropdown de ordenação
//Ordenação de produtos de menor para maior
    cy.get('select').first().should('be.visible').select('Price (low to high)')

    cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Onesie')
    cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bike Light')
    cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Bolt T-Shirt')
    cy.get(':nth-child(4) > [data-test="inventory-item-description"]').should('contain', 'Test.allTheThings() T-Shirt (Red)')
    cy.get(':nth-child(5) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Backpack')
    cy.get(':nth-child(6) > [data-test="inventory-item-description"]').should('contain', 'Sauce Labs Fleece Jacket')


//Adicionar produto ao carrinho
    cy.contains('Sauce Labs Onesie').click()
    cy.get('[data-test="add-to-cart"]').click()

//Adicionar mais produtos ao carrinho
    cy.get('[data-test="back-to-products"]').click()
    cy.contains('Sauce Labs Bike Light').click()
    cy.get('[data-test="add-to-cart"]').click()


//Realizar compra com sucesso
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
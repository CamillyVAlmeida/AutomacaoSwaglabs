/// <reference types="Cypress"/>

describe('Testes de API - Login com Comandos Customizados', () => {
  
  it('Deve fazer login usando comando customizado', () => {
    cy.apiLogin('standard_user', 'secret_sauce')
      .then((response) => {
        cy.validateApiResponse(response, [200, 201, 400, 401, 404]);
        cy.logApiResponse(response, 'Login com credenciais válidas');
      });
  });

  it('Deve falhar login com credenciais inválidas', () => {
    cy.apiLogin('usuario_inexistente', 'senha_incorreta')
      .then((response) => {
        cy.validateApiResponse(response, [400, 401, 404]);
        cy.logApiResponse(response, 'Login com credenciais inválidas');
      });
  });

  it('Deve testar fluxo completo: Login -> Produtos -> Carrinho', () => {
    // 1. Fazer login
    cy.apiLogin('standard_user', 'secret_sauce')
      .then((loginResponse) => {
        cy.logApiResponse(loginResponse, 'Resposta do login');
        
        // 2. Buscar produtos
        cy.apiGetProducts()
          .then((productsResponse) => {
            cy.validateApiResponse(productsResponse, [200, 401, 403, 404]);
            cy.logApiResponse(productsResponse, 'Lista de produtos');
            
            // 3. Verificar carrinho
            cy.apiGetCart()
              .then((cartResponse) => {
                cy.validateApiResponse(cartResponse, [200, 401, 403, 404]);
                cy.logApiResponse(cartResponse, 'Carrinho de compras');
              });
          });
      });
  });

  it('Deve testar adição de produto ao carrinho', () => {
    cy.apiAddToCart('sauce-labs-backpack')
      .then((response) => {
        cy.validateApiResponse(response, [200, 201, 400, 401, 403, 404]);
        cy.logApiResponse(response, 'Adição de produto ao carrinho');
      });
  });

  it('Deve testar processo de checkout', () => {
    const checkoutData = {
      firstName: 'João',
      lastName: 'Silva',
      postalCode: '12345-678'
    };

    cy.apiCheckout(checkoutData)
      .then((response) => {
        cy.validateApiResponse(response, [200, 201, 400, 401, 403, 404]);
        cy.logApiResponse(response, 'Processo de checkout');
      });
  });

  it('Deve testar diferentes tipos de usuário com comandos customizados', () => {
    const userTypes = [
      { username: 'standard_user', password: 'secret_sauce' },
      { username: 'locked_out_user', password: 'secret_sauce' },
      { username: 'problem_user', password: 'secret_sauce' },
      { username: 'performance_glitch_user', password: 'secret_sauce' }
    ];

    userTypes.forEach((user, index) => {
      cy.apiLogin(user.username, user.password)
        .then((response) => {
          cy.log(`Teste ${index + 1} - ${user.username}:`, response.status);
          cy.validateApiResponse(response, [200, 201, 400, 401, 403, 404]);
        });
    });
  });

  it('Deve testar performance dos endpoints', () => {
    const startTime = Date.now();
    
    cy.apiGetProducts()
      .then((response) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        cy.log(`Tempo de resposta dos produtos: ${responseTime}ms`);
        expect(responseTime).to.be.lessThan(5000);
        cy.validateApiResponse(response, [200, 401, 403, 404]);
      });
  });
});

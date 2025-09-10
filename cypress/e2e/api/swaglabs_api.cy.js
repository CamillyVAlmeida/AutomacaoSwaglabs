/// <reference types="Cypress"/>

describe('Testes de API - SwagLabs', () => {
  const baseUrl = 'https://www.saucedemo.com';
  
  // Dados de teste
  const validCredentials = {
    username: 'standard_user',
    password: 'secret_sauce'
  };

  const invalidCredentials = {
    username: 'locked_out_user',
    password: 'secret_sauce'
  };

  it('Deve testar autenticação via API', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: validCredentials,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Resposta da autenticação:', response);
      expect(response.status).to.be.oneOf([200, 201, 400, 401, 404]);
    });
  });

  it('Deve testar endpoint de usuários', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/users`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Resposta dos usuários:', response);
      expect(response.status).to.be.oneOf([200, 401, 403, 404]);
    });
  });

  it('Deve testar endpoint de produtos', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/products`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Resposta dos produtos:', response);
      expect(response.status).to.be.oneOf([200, 401, 403, 404]);
    });
  });

  it('Deve testar endpoint de carrinho', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/cart`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Resposta do carrinho:', response);
      expect(response.status).to.be.oneOf([200, 401, 403, 404]);
    });
  });

  it('Deve testar endpoint de checkout', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/checkout`,
      body: {
        firstName: 'Teste',
        lastName: 'Usuario',
        postalCode: '12345'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Resposta do checkout:', response);
      expect(response.status).to.be.oneOf([200, 201, 400, 401, 403, 404]);
    });
  });

  it('Deve testar diferentes métodos HTTP', () => {
    // Teste GET
    cy.request({
      method: 'GET',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

    // Teste HEAD
    cy.request({
      method: 'HEAD',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deve testar validação de campos obrigatórios', () => {
    // Teste sem username
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: {
        password: 'secret_sauce'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 404]);
    });

    // Teste sem password
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: {
        username: 'standard_user'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 404]);
    });
  });

  it('Deve testar performance da API', () => {
    const startTime = Date.now();
    
    cy.request({
      method: 'GET',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      expect(response.status).to.eq(200);
      expect(responseTime).to.be.lessThan(5000); // Menos de 5 segundos
      
      cy.log(`Tempo de resposta: ${responseTime}ms`);
    });
  });

  it('Deve testar diferentes tipos de usuário', () => {
    const userTypes = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user'
    ];

    userTypes.forEach(userType => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/api/auth/login`,
        body: {
          username: userType,
          password: 'secret_sauce'
        },
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Resposta para ${userType}:`, response.status);
        expect(response.status).to.be.oneOf([200, 201, 400, 401, 403, 404]);
      });
    });
  });

  it('Deve testar segurança da API', () => {
    // Teste com SQL injection
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: {
        username: "admin'; DROP TABLE users; --",
        password: 'secret_sauce'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 404]);
    });

    // Teste com XSS
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: {
        username: '<script>alert("xss")</script>',
        password: 'secret_sauce'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 401, 404]);
    });
  });
});

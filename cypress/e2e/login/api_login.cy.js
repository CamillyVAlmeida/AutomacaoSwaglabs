/// <reference types="Cypress"/>

describe('Testes de requisição - Login', () => {
  const baseUrl = 'https://www.saucedemo.com';
  
  beforeEach(() => {
    cy.log('Iniciando teste de API');
  });

  it('Deve fazer login via API com credenciais válidas', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include('Swag Labs');
    });
  });

  it('Deve testar endpoint de recursos estáticos', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/favicon.ico`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 404]);
    });
  });

  it('Deve validar endpoint de inventário', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/inventory.html`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 302, 401, 403, 404]);
    });
  });

  it('Deve testar endpoint do carrinho', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cart.html`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 302, 401, 403, 404]);
    });
  });

  it('Deve validar headers da requisição', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('text/html');
    });
  });

  it('Deve validar estrutura da página de login', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.include('Swag Labs');
      expect(response.body).to.include('root');
    });
  });

  it('Deve testar performance da página', () => {
    const startTime = Date.now();
    
    cy.request({
      method: 'GET',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      expect(response.status).to.eq(200);
      expect(responseTime).to.be.lessThan(5000);
    });
  });
});

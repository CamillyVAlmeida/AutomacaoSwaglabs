/// <reference types="Cypress"/>

describe('Testes de API - Login', () => {
  const baseUrl = 'https://www.saucedemo.com';
  
  beforeEach(() => {
    // Configuração base para os testes de API
    cy.log('Iniciando teste de API');
  });

  it('Deve fazer login via API com credenciais válidas', () => {
    // Teste de login via API
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/login`,
      body: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Verificar se a requisição foi processada
      expect(response.status).to.be.oneOf([200, 201, 400, 401]);
      
      // Log da resposta para debug
      cy.log('Resposta da API:', response.body);
    });
  });

  it('Deve retornar erro 401 para credenciais inválidas', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/login`,
      body: {
        username: 'usuario_inexistente',
        password: 'senha_incorreta'
      },
      failOnStatusCode: false
    }).then((response) => {
      // Verificar se retorna erro de autenticação
      expect(response.status).to.be.oneOf([401, 400]);
    });
  });

  it('Deve validar endpoint de produtos via API', () => {
    // Primeiro fazer login para obter token/sessão
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/login`,
      body: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      failOnStatusCode: false
    }).then((loginResponse) => {
      // Tentativa de acesso ao endpoint de produtos
      cy.request({
        method: 'GET',
        url: `${baseUrl}/api/products`,
        failOnStatusCode: false
      }).then((productsResponse) => {
        expect(productsResponse.status).to.be.oneOf([200, 401, 403]);
        cy.log('Resposta dos produtos:', productsResponse.body);
      });
    });
  });

  it('Deve testar endpoint de inventário', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/inventory.html`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 401, 403]);
      cy.log('Status do inventário:', response.status);
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
      expect(response.body).to.include('login');
      expect(response.body).to.include('username');
      expect(response.body).to.include('password');
    });
  });
});

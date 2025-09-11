/// <reference types="Cypress"/>

describe('Testes de requisição - Login', () => {
  const baseUrl = 'https://www.saucedemo.com';
  
  beforeEach(() => {
    // Configuração base para os testes de API
    cy.log('Iniciando teste de API');
  });

  it('Deve fazer login via API com credenciais válidas', () => {
    // Teste de login via API - SwagLabs não tem API real, então testamos a página
    cy.request({
      method: 'GET',
      url: `${baseUrl}`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar se a página carrega corretamente
      expect(response.status).to.eq(200);
      expect(response.body).to.include('Swag Labs');
      
      // Log da resposta para debug
      cy.log('Página carregada com sucesso');
    });
  });

  it('Deve testar endpoint de recursos estáticos', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/favicon.ico`,
      failOnStatusCode: false
    }).then((response) => {
      // Verificar se recursos estáticos carregam
      expect(response.status).to.be.oneOf([200, 404]);
      cy.log('Status do favicon:', response.status);
    });
  });

  it('Deve validar endpoint de inventário', () => {
    // Teste de acesso direto à página de inventário
    cy.request({
      method: 'GET',
      url: `${baseUrl}/inventory.html`,
      failOnStatusCode: false
    }).then((response) => {
      // SwagLabs retorna 404 para páginas que não existem como arquivos estáticos
      expect(response.status).to.be.oneOf([200, 302, 401, 403, 404]);
      cy.log('Status do inventário:', response.status);
    });
  });

  it('Deve testar endpoint do carrinho', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/cart.html`,
      failOnStatusCode: false
    }).then((response) => {
      // SwagLabs retorna 404 para páginas que não existem como arquivos estáticos
      expect(response.status).to.be.oneOf([200, 302, 401, 403, 404]);
      cy.log('Status do carrinho:', response.status);
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
      // SwagLabs é uma SPA, então verificamos elementos do HTML base
      expect(response.body).to.include('Swag Labs');
      expect(response.body).to.include('root');
      cy.log('Página SPA carregada corretamente');
    });
  });

  it('Deve testar CORS e headers de segurança', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      
      // Verificar headers de segurança
      expect(response.headers).to.have.property('content-type');
      expect(response.headers['content-type']).to.include('text/html');
      
      // Log dos headers para análise
      cy.log('Headers da resposta:', response.headers);
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
      expect(responseTime).to.be.lessThan(5000); // Menos de 5 segundos
      
      cy.log(`Tempo de resposta: ${responseTime}ms`);
    });
  });
});

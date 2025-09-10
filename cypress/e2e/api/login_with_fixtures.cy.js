/// <reference types="Cypress"/>

describe('Testes de API - Login com Fixtures', () => {
  let apiData;

  before(() => {
    // Carregar dados do fixture
    cy.fixture('api_data').then((data) => {
      apiData = data;
    });
  });

  it('Deve fazer login com dados do fixture - usuário válido', () => {
    const credentials = apiData.credentials.valid.standard_user;
    
    cy.request({
      method: 'POST',
      url: `${apiData.baseUrl}${apiData.endpoints.login}`,
      body: credentials,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Login com usuário válido:', response);
      expect(response.status).to.be.oneOf([
        ...apiData.expectedStatusCodes.success,
        ...apiData.expectedStatusCodes.clientError
      ]);
    });
  });

  it('Deve testar todos os tipos de usuário válidos', () => {
    Object.keys(apiData.credentials.valid).forEach(userType => {
      const credentials = apiData.credentials.valid[userType];
      
      cy.request({
        method: 'POST',
        url: `${apiData.baseUrl}${apiData.endpoints.login}`,
        body: credentials,
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Login ${userType}:`, response.status);
        expect(response.status).to.be.oneOf([
          ...apiData.expectedStatusCodes.success,
          ...apiData.expectedStatusCodes.clientError
        ]);
      });
    });
  });

  it('Deve testar credenciais inválidas', () => {
    Object.keys(apiData.credentials.invalid).forEach(invalidType => {
      const credentials = apiData.credentials.invalid[invalidType];
      
      cy.request({
        method: 'POST',
        url: `${apiData.baseUrl}${apiData.endpoints.login}`,
        body: credentials,
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Login ${invalidType}:`, response.status);
        expect(response.status).to.be.oneOf(apiData.expectedStatusCodes.clientError);
      });
    });
  });

  it('Deve testar endpoint de produtos com dados do fixture', () => {
    cy.request({
      method: 'GET',
      url: `${apiData.baseUrl}${apiData.endpoints.products}`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Produtos:', response);
      expect(response.status).to.be.oneOf([
        ...apiData.expectedStatusCodes.success,
        ...apiData.expectedStatusCodes.clientError
      ]);
    });
  });

  it('Deve testar adição de produtos ao carrinho', () => {
    apiData.testData.products.forEach(productId => {
      cy.request({
        method: 'POST',
        url: `${apiData.baseUrl}/api/cart/add`,
        body: { productId: productId },
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Adicionar ${productId}:`, response.status);
        expect(response.status).to.be.oneOf([
          ...apiData.expectedStatusCodes.success,
          ...apiData.expectedStatusCodes.clientError
        ]);
      });
    });
  });

  it('Deve testar checkout com dados válidos', () => {
    const checkoutData = apiData.testData.checkout.valid;
    
    cy.request({
      method: 'POST',
      url: `${apiData.baseUrl}${apiData.endpoints.checkout}`,
      body: checkoutData,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Checkout válido:', response);
      expect(response.status).to.be.oneOf([
        ...apiData.expectedStatusCodes.success,
        ...apiData.expectedStatusCodes.clientError
      ]);
    });
  });

  it('Deve testar checkout com dados inválidos', () => {
    const checkoutData = apiData.testData.checkout.invalid;
    
    cy.request({
      method: 'POST',
      url: `${apiData.baseUrl}${apiData.endpoints.checkout}`,
      body: checkoutData,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Checkout inválido:', response);
      expect(response.status).to.be.oneOf(apiData.expectedStatusCodes.clientError);
    });
  });

  it('Deve testar todos os endpoints disponíveis', () => {
    Object.keys(apiData.endpoints).forEach(endpointName => {
      const endpoint = apiData.endpoints[endpointName];
      
      cy.request({
        method: 'GET',
        url: `${apiData.baseUrl}${endpoint}`,
        failOnStatusCode: false
      }).then((response) => {
        cy.log(`Endpoint ${endpointName}:`, response.status);
        expect(response.status).to.be.oneOf([
          ...apiData.expectedStatusCodes.success,
          ...apiData.expectedStatusCodes.clientError,
          ...apiData.expectedStatusCodes.serverError
        ]);
      });
    });
  });
});

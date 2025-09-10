# Testes de API - SwagLabs

Este diretório contém os testes de API para o projeto SwagLabs.

## Estrutura dos Arquivos

### Arquivos de Teste
- `swaglabs_api.cy.js` - Testes básicos de API para diferentes endpoints
- `login_with_commands.cy.js` - Testes utilizando comandos customizados
- `login_with_fixtures.cy.js` - Testes utilizando dados de fixtures

### Arquivos de Suporte
- `../fixtures/api_data.json` - Dados de teste para os testes de API
- `../support/commands.js` - Comandos customizados para facilitar os testes

## Comandos Customizados Disponíveis

### `cy.apiLogin(username, password)`
Faz login via API com as credenciais fornecidas.

```javascript
cy.apiLogin('standard_user', 'secret_sauce')
  .then((response) => {
    // Processar resposta
  });
```

### `cy.apiGetProducts()`
Busca a lista de produtos via API.

```javascript
cy.apiGetProducts()
  .then((response) => {
    // Processar lista de produtos
  });
```

### `cy.apiGetCart()`
Busca o carrinho de compras via API.

```javascript
cy.apiGetCart()
  .then((response) => {
    // Processar carrinho
  });
```

### `cy.apiAddToCart(productId)`
Adiciona um produto ao carrinho via API.

```javascript
cy.apiAddToCart('sauce-labs-backpack')
  .then((response) => {
    // Processar resposta
  });
```

### `cy.apiCheckout(checkoutData)`
Processa o checkout via API.

```javascript
cy.apiCheckout({
  firstName: 'João',
  lastName: 'Silva',
  postalCode: '12345-678'
}).then((response) => {
  // Processar resposta
});
```

### `cy.validateApiResponse(response, expectedStatus)`
Valida se o status da resposta está entre os esperados.

```javascript
cy.validateApiResponse(response, [200, 201, 400, 401]);
```

### `cy.logApiResponse(response, description)`
Registra a resposta da API no log do Cypress.

```javascript
cy.logApiResponse(response, 'Login realizado');
```

## Dados de Teste (Fixtures)

Os dados de teste estão organizados no arquivo `api_data.json`:

### Credenciais Válidas
- `standard_user` - Usuário padrão
- `locked_out_user` - Usuário bloqueado
- `problem_user` - Usuário com problemas
- `performance_glitch_user` - Usuário com lentidão

### Credenciais Inválidas
- `wrong_username` - Username incorreto
- `wrong_password` - Senha incorreta
- `empty_credentials` - Credenciais vazias

### Endpoints Testados
- `/api/auth/login` - Autenticação
- `/api/products` - Lista de produtos
- `/api/cart` - Carrinho de compras
- `/api/checkout` - Processo de checkout
- `/api/users` - Dados de usuários

## Como Executar os Testes

### Executar todos os testes de API
```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
```

### Executar teste específico
```bash
npx cypress run --spec "cypress/e2e/api/swaglabs_api.cy.js"
```

### Executar no modo interativo
```bash
npx cypress open
```

## Códigos de Status Esperados

### Sucesso (200-299)
- `200` - OK
- `201` - Created

### Erro do Cliente (400-499)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found

### Erro do Servidor (500-599)
- `500` - Internal Server Error
- `502` - Bad Gateway
- `503` - Service Unavailable
- `504` - Gateway Timeout

## Observações Importantes

1. **failOnStatusCode: false** - Todos os testes usam esta opção para não falhar em códigos de erro esperados
2. **Logs detalhados** - Todos os testes incluem logs para facilitar o debug
3. **Validação flexível** - Os testes validam múltiplos códigos de status possíveis
4. **Dados organizados** - Uso de fixtures para manter os dados de teste organizados
5. **Comandos reutilizáveis** - Comandos customizados para facilitar a manutenção

## Estrutura de Testes

Cada arquivo de teste segue a estrutura:
1. **Setup** - Configuração inicial
2. **Testes de Autenticação** - Login com diferentes credenciais
3. **Testes de Endpoints** - Validação de diferentes APIs
4. **Testes de Performance** - Validação de tempo de resposta
5. **Testes de Segurança** - Validação contra ataques comuns
6. **Testes de Validação** - Campos obrigatórios e formatos

# Automação de Testes - Swag Labs

## Sobre o Projeto

Este projeto tem como objetivo automatizar testes funcionais e de API para a aplicação **Swag Labs** (Sauce Demo), simulando cenários reais de login e processo de compra. O foco principal está na validação de funcionalidades críticas através de testes automatizados utilizando **Cypress**.

## Objetivos

- Simular o processo de login com diferentes cenários
- Automatizar o fluxo completo de compra
- Testar validações de formulários e campos obrigatórios
- Validar ordenação e filtros de produtos
- Executar testes de API e requisições HTTP
- Garantir qualidade e confiabilidade da aplicação

## Tecnologias Utilizadas

- **Cypress** v14.5.3 - Framework de automação de testes
- **JavaScript** - Linguagem de programação
- **Node.js** - Runtime environment
- **Git** - Controle de versão

## Estrutura do Projeto

```
AutomacaoSwaglabs/
├── cypress/
│   ├── e2e/
│   │   ├── login/
│   │   │   └── gui_login.cy.js          # Testes de login
│   │   └── compras/
│   │       └── ComprasComSucesso.cy.js  # Testes de compra
│   ├── fixtures/
│   │   └── example.json                 # Dados de teste
│   └── support/
│       ├── commands.js                  # Comandos customizados
│       └── e2e.js                       # Configurações de suporte
├── cypress.config.js                    # Configuração do Cypress
├── package.json                         # Dependências do projeto
└── README.md                           # Documentação
```

## Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Navegador web (Chrome, Firefox, Edge)

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd AutomacaoSwaglabs
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute os testes:**
   ```bash
   # Executar todos os testes
   npx cypress run
   
   # Executar com interface gráfica
   npx cypress open
   ```

## Cenários de Teste

### Testes de Login

- **Login com sucesso** - Validação de credenciais corretas
- **Login com usuário incorreto** - Teste de validação de usuário
- **Login com senha incorreta** - Teste de validação de senha

### Testes de Compra

- **Fluxo completo de compra** - Do login ao checkout
- **Ordenação de produtos** - Validação de filtros (preço baixo para alto)
- **Adição de produtos ao carrinho** - Múltiplos produtos
- **Processo de checkout** - Preenchimento de dados e finalização
- **Confirmação de pedido** - Validação da mensagem de sucesso

## Dados de Teste

### Credenciais Válidas
- **Usuário:** `standard_user`
- **Senha:** `secret_sauce`

### Dados de Checkout
- **Nome:** João
- **Sobrenome:** Santos
- **CEP:** 1234567890

## Configurações

### Cypress Configuration
O arquivo `cypress.config.js` contém as configurações principais do Cypress, incluindo:
- Configurações de E2E
- Event listeners personalizados
- Configurações de ambiente

### Comandos Customizados
O arquivo `cypress/support/commands.js` permite a criação de comandos reutilizáveis para otimizar os testes.

## Relatórios e Evidências

Os testes geram automaticamente:
- Screenshots em caso de falha
- Vídeos das execuções
- Relatórios detalhados no terminal
- Logs de debug para análise

## Próximos Passos

- [ ] Testar requisições

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## Autor

Desenvolvido para automação de testes e garantia de qualidade.

---

**Swag Labs** é uma aplicação demo desenvolvida pela Sauce Labs para fins de teste e aprendizado em automação.

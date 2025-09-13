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
- **Allure Report** v2.41.2 - Geração de relatórios detalhados
- **Git** - Controle de versão

## Estrutura do Projeto

```
AutomacaoSwaglabs/
├── cypress/
│   ├── e2e/
│   │   ├── login/
│   │   │   ├── gui_login.cy.js          # Testes de login GUI
│   │   │   └── api_login.cy.js          # Testes de API e requisições
│   │   └── compras/
│   │       └── ComprasComSucesso.cy.js  # Testes de compra
│   ├── fixtures/
│   │   └── example.json                 # Dados de teste
│   ├── screenshots/                     # Screenshots de falhas
│   └── support/
│       ├── commands.js                  # Comandos customizados e Allure
│       └── e2e.js                       # Configurações de suporte
├── allure-results/                      # Resultados dos testes para Allure
├── allure-report/                       # Relatórios gerados pelo Allure
├── cypress.config.js                    # Configuração do Cypress + Allure
├── package.json                         # Dependências e scripts
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
   
   # Executar testes com Allure Report
   npm run cy:run:allure
   
   # Gerar relatório Allure
   npm run allure:generate
   
   # Abrir relatório Allure
   npm run allure:open
   
   # Executar testes e gerar relatório completo
   npm run test:allure
   ```

## Cenários de Teste

### Testes de Login

#### Testes GUI (gui_login.cy.js)
- **Login com sucesso** - Validação de credenciais corretas
- **Login com usuário incorreto** - Teste de validação de usuário
- **Login com senha incorreta** - Teste de validação de senha

#### Testes de API (api_login.cy.js)
- **Validação de página principal** - Teste de carregamento da aplicação
- **Teste de recursos estáticos** - Validação de favicon e assets
- **Validação de endpoints** - Teste de páginas de inventário e carrinho
- **Validação de headers** - Verificação de headers HTTP
- **Teste de estrutura SPA** - Validação de Single Page Application
- **Teste de CORS e segurança** - Validação de headers de segurança
- **Teste de performance** - Medição de tempo de resposta

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

#### Comandos Allure Report
- `cy.allureStep()` - Cria steps detalhados nos relatórios
- `cy.allureLabel()` - Adiciona labels aos testes
- `cy.allureTag()` - Adiciona tags para categorização
- `cy.allureDescription()` - Adiciona descrições aos testes
- `cy.allureSeverity()` - Define severidade dos testes
- `cy.allureOwner()` - Define responsável pelo teste
- `cy.allureEpic()` - Define épico do teste
- `cy.allureFeature()` - Define feature do teste
- `cy.allureStory()` - Define story do teste

#### Comandos de Negócio
- `cy.login(username, password)` - Comando reutilizável para login
- `cy.addToCart(productName)` - Comando para adicionar produtos ao carrinho

## Relatórios e Evidências

### Relatórios Allure
O projeto utiliza **Allure Report** para gerar relatórios detalhados e interativos:

- **Relatórios HTML interativos** - Visualização rica dos resultados
- **Timeline de execução** - Cronologia detalhada dos testes
- **Categorização por severidade** - Organização por criticidade
- **Screenshots automáticos** - Capturas em caso de falha
- **Steps detalhados** - Passo a passo de cada teste
- **Métricas de performance** - Tempo de execução e tendências
- **Histórico de execuções** - Comparação entre diferentes runs

### Evidências Automáticas
Os testes geram automaticamente:
- Screenshots em caso de falha
- Vídeos das execuções
- Relatórios detalhados no terminal
- Logs de debug para análise
- Dados estruturados para Allure Report

## Próximos Passos

- [x] Implementar testes de API e requisições HTTP
- [x] Integrar Allure Report para relatórios detalhados
- [x] Criar comandos customizados para reutilização
- [ ] Implementar testes de performance
- [ ] Adicionar testes de acessibilidade
- [ ] Implementar testes de responsividade

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

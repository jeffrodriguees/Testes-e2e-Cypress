Automação de Teste com Cypress

Este repositório contém um projeto de automação de testes usando o framework Cypress para testes de ponta a ponta (end-to-end). O projeto é destinado a testar um software de gestão escolar.

Não será possível execução do projeto, visto que não estou exibindo os links do sistema e usuários e senha.

o Projeto serve apenas para consulta e visualização de como utilizar estrutura do cypress.

Estrutura do Projeto O projeto está organizado da seguinte forma:

cypress/e2e/executar: Esta pasta contém os arquivos de teste Cypress escritos em JavaScript. Você pode adicionar, modificar ou excluir esses arquivos conforme necessário para testar diferentes partes da aplicação.

cypress/support: Esta pasta contém arquivos de suporte, incluindo o arquivo variaveis.js, onde você pode centralizar as variáveis utilizadas em seus testes.

cypress.config.js: Este arquivo contém a configuração global do Cypress, como URLs base, configurações de relatório e muito mais.

azure-pipelines.yml: Este arquivo contém a configuração da pipeline de CI/CD para execução dos testes.
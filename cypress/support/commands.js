// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
    // menuEnsino: '#menu-gestao > :nth-child(2) > :nth-child(1) > .menu-item-parent',
    // menuAluno: '#menu-gestao > :nth-child(3) > :nth-child(1) > .menu-item-parent',
    // menuEscola: '#menu-gestao > :nth-child(4) > :nth-child(1) > .menu-item-parent',
    // menuColaborador: '#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent',
    // menuCadastro: '#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent',
    // menuConfiguracoes: '#menu-gestao > :nth-child(9) > :nth-child(1) > .menu-item-parent',
    // menu2: '[class="menu open"]',
    // menu3: '[class="open"]',


Cypress.Commands.add('titlePage', (text) => { 
    cy.contains("h4", text, { timeout: 20000 }).should('be.visible')
})

Cypress.Commands.add('cadastro', () => { 
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
})
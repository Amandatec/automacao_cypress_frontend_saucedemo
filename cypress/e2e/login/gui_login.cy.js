/// <reference types="Cypress"/>

describe.only('Teste funcional de login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.login_teste('standard_user','secret_sauce')
        cy.get('[data-test="title"]').should('contain', 'Products')
    });

    it('Validando login incorreto', () => {
        cy.login_teste('standard_user1','secret_sauce')
        cy.get('[data-test="error"]').should('contain',"Epic sadface: Username and password do not match any user in this service")
    });

    it('Validando senha incorreta', () => {
       cy.login_teste('standard_user','secret_sa')
       cy.get('[data-test="error"]').should('contain',"Epic sadface: Username and password do not match any user in this service")
    });
});
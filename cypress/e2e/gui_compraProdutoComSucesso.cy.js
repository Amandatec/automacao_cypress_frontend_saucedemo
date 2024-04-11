/// <reference types="Cypress"/>

const { should } = require("chai");

describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo da compra de produtos', () => {
        cy.login_teste('standard_user','secret_sauce')
        cy.get('[data-test="title"]').should('contain', 'Products') 

        //Ordenação de produtos dos menor para o maior valor
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        //Validação de ordenação dos produtos
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bolt T-Shirt')

        //Adicionando produtos ao carrinho
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary ').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary ').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary ').click()
        cy.get('[data-test="back-to-products"]').click()

           
        
        //Checagem da quantidade de produtos adicionados ao carrinho
        cy.get('.shopping_cart_link').should('have.text','3')

        //check produtos no carrinho'
        cy.get('.shopping_cart_link').click()
        cy.VerificaProdutos()

        //checkout
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Amandatec')
        cy.get('[data-test="lastName"]').type('Oliveira')
        cy.get('[data-test="postalCode"]').type('01478000')
        cy.get('[data-test="continue"]').click()

        //Verificando produtos no checkout
        cy.VerificaProdutos()

        //Checagem no valor total:
        cy.get('.summary_total_label').should('have.text','Total: $36.69')

        //Finalizar processo
        cy.get('[data-test="finish"]').click()

        //Checagem de pedido concluído
        cy.get('.complete-header').should('have.text','Thank you for your order!')
    });
});
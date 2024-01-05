/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys' +  
        'standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'

        cy.get('#firstName').type('Daniel')
        cy.get('input[name="lastName"]').type('Fernando')
        cy.get('#email').type('danielft11@hotmail.com')
        cy.get('textarea[name="open-text-area"]').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Daniel')
        cy.get('input[name="lastName"]').type('Fernando')
        cy.get('#email').type('danielft11#hotmailcom')
        cy.get('textarea[name="open-text-area"]').type('Teste muito top!', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
            .type('abcd')
            .should('not.have.value')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Daniel')
        cy.get('input[name="lastName"]').type('Fernando')
        cy.get('#email').type('danielft11@hotmail.com')
        cy.get('#phone-checkbox').click() //setei o telefone como obrigatório mas não digitei nada no campo.
        cy.get('textarea[name="open-text-area"]').type('Teste muito top!', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('#firstName')
        .type('Daniel')
        .should('have.value', 'Daniel')
        .clear()
        .should('have.value', '')
            
        cy.get('input[name="lastName"]')
        .type('Fernando')
        .should('have.value', 'Fernando')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('danielft11@hotmail.com')
        .should('have.value', 'danielft11@hotmail.com')
        .clear()
        .should('have.value', '')

        cy.get('#phone')
        .type('31971752770')
        .should('have.value', '31971752770')
        .clear()
        .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto no dropdownlist de produtos', function() {
        cy.get('#product').select('YouTube') 
        cy.get('#product').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value) no dropdownlist de produtos', function() {
        cy.get('#product').select('Mentoria') 
        cy.get('#product').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice no dropdownlist de produtos', function() {
        cy.get('#product').select(1) 
        cy.get('#product').should('have.value', 'blog')
    })

  })
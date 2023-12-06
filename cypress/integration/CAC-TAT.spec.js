/// <reference types="Cypress" />

/*
* Neste código estamos criando uma estrutura básica de uma suíte de testes.
* Na linha 1 acima estamos referenciando o Cypress para obtermos o intelli-sense.
* Na linha 10 estamos usando o método cy.visit para visitar a página index.html local.
* Na linha 13 estamos usando o método cy.title para buscar o título da aplicação e encadeamos com o método .should
* para verificar se o título da aplicação é igual a 'Central de Atendimento ao Cliente TAT' 
*/
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
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Daniel')
        cy.get('input[name="lastName"]').type('Fernando')
        cy.get('#email').type('danielft11#hotmailcom')
        cy.get('textarea[name="open-text-area"]').type('Teste muito top!', {delay: 0})
        cy.get('button[type="submit"]').click()
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
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

  })
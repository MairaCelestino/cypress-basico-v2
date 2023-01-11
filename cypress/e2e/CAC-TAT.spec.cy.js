/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach( ()=> {
    cy.viewport(900, 1300)
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('Preencha os campos obrigatórios e envia o formulário', ()=> {

    const longText = 'TesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTesteTeste'

      cy.get('#firstName').type('Maira')
      cy.get('#lastName').type('Celestino')
      cy.get('#email').type('mairacelestino@hotmail.com')
      cy.get('#open-text-area').type(longText , { delay: 0})
      //cy.get('button[type="submit"]').click()
      cy.contains('button', 'Enviar').click()

      cy.get('.success').should('be.visible')

  }) 

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
      cy.get('#firstName').type('Maira')
      cy.get('#lastName').type('Celestino')
      cy.get('#email').type('mairacelestino@hotmai,com')
      cy.get('#open-text-area').type('Test')
     // cy.get('button[type="submit"]').click()
     cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com valor não-numérico', ()=> {

      cy.get('#phone')
      .type('abcdefflk')
      .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {

    cy.get('#firstName').type('Maira')
    cy.get('#lastName').type('Celestino')
    cy.get('#email').type('mairacelestino@hotmai,com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Test')
    //cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {

    cy.get('#firstName')
    .type('Maira')
    .should('have.value', 'Maira')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('Celestino')
    .should('have.value', 'Celestino')
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type('mairacelestino@hotmail.com')
    .should('have.value', 'mairacelestino@hotmail.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('961436981')
    .should('have.value', '961436981')
    .clear()
    .should('have.value', '')

    //cy.wait(5000)
    cy.get('#open-text-area')
    .type('Test')
    .should('have.value', 'Test')
    .clear()
    .should('have.value', '')

  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {

     // cy.get('button[type="submit"]').click()
     cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

  })

  it.only('envia o formuário com sucesso usando um comando customizado', ()=> {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })

      

})
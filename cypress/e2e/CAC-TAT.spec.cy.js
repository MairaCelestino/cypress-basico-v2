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
      cy.get('button[type="submit"]').click()

      cy.get('.success').should('be.visible')

  }) 

  it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
     cy.get('#firstName').type('Maira')
      cy.get('#lastName').type('Celestino')
      cy.get('#email').type('mairacelestino@hotmai,com')
      cy.get('#open-text-area').type('Test')
      cy.get('button[type="submit"]').click()

      cy.get('.error').should('be.visible')



  })


      

})
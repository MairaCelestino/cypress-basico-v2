/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach( ()=> {
    //cy.viewport(900, 1300)
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
    //cy.get('#phone-checkbox').click()
    cy.get('#phone-checkbox').check()
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

  it('envia o formuário com sucesso usando um comando customizado', ()=> {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })

  it('Seleciona um produto (Youtube) por seu texto', ()=> {

    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', ()=> {

    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')

  })

  it('seleciona um produto (Blog) por seu índice', ()=> {

   //cy.get('select')
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')

  })

  it('marca o tipo de atendimento "Feedback"', ()=> {

    //cy.get('[type="radio"][value="feedback"]').check
     cy.get('[type="radio"]')
     .check('feedback')
     .should('have.value', 'feedback')
     .should('be.checked')
 
   })

   it('marca cada tipo de atendimento', ()=> {

    cy.get('[type="radio"]')
    .should('have.length', 3)
    .each(($radio)=>{
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
 
   })

   it('marca ambos checkboxes, depois desmarca o último', ()=>{

     /* cy.get('[type="checkbox"]')
      .check('email')
      .should("have.value", '')*/

      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

   })

   it('seleciona um arquivo da pasta fixtures', ()=> {

    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(($input)=> {
      //console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')

    })

   })

   it('seleciona um arquivo simulando um drag-and-drop', ()=> {

    cy.get('input[type="file"]#file-upload')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(($input)=> {
      //console.log($input)
      expect($input[0].files[0].name).to.equal('example.json')

        })
      })

   it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=> {
      
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(($input)=> {
          expect($input[0].files[0].name).to.equal('example.json')
        })


    })

   it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
       cy.get('#privacy a').should('have.attr', 'target', '_blank')

   })

   it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
   })

   it('testa a página da política de privacidade de forma independente', ()=> {
    
   })
   
})
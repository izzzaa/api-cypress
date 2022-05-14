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

Cypress.Commands.add('token', (email, senha) => {

  cy.request({

    method: 'Post',
    url: '/Login',
    body:
    {
      "email": email,
      "password": senha
    }
  }).then((Response) => {
    expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
    return Response.body.authorization
  });

})

Cypress.Commands.add('cadastrarProduto', (token, produto, preco, descricao, qtd) => {

  cy.request({
    headers: {
      authorization: token //colocando que a variavel token vai trazer a autorizacao
    },
    method: 'Post',
    url: 'Produtos',
    body:
    {
      "nome": produto,
      "preco": preco,
      "descricao": descricao,
      "quantidade": qtd
    },
    failOnStatusCode: false //usamos esse comando quando validamos cenarios negativos

  })

})

Cypress.Commands.add('cadastrarUsuario', (nome, email, password, admin) => {

  cy.request({
    method: 'Post',
    url: 'usuarios',
    body:
    {
      "nome": nome,
      "email": email,
      "password": password,
      "administrador": admin
    },
    failOnStatusCode: false //usamos esse comando quando validamos cenarios negativos

  })

})
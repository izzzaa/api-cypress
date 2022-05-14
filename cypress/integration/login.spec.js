/// <reference types="cypress" />

describe('Login - Testes do Api ServRest', () => {

    it('Deve fazer login com sucesso' , () => {
            cy.request({

                method: 'Post',
                url:'http://localhost:3000/Login',
                body:
                {
                    "email": "iza@qa.com.br",
                    "password": "teste"
                  }
            }).then((Response) => {
                expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
                expect(Response.body.message).to.equal("Login realizado com sucesso")
                cy.log(Response.body.authorization)
            });


    })

})


/// <reference types="cypress" />
import contrato from '../contracts/produtos.contracts.js'


describe('Produtos', () => {

    let token //criando variavel para token recebido
    before(() => {
        cy.token( 'iza@qa.com.br' , 'teste').then(tkn => {
            token = tkn
        })
    });


    it('Validar Contrato' , () => {
        cy.request('produtos').then(Response => {
            return contrato.validateAsync(Response.body)

        })


    });

    it('Listar Produtos' , () => {
            cy.request({

                method: 'Get',
                url:'http://localhost:3000/Produtos'
              
            }).then((Response) =>{
                expect(Response.body.produtos[2].nome).to.equal('Iphone xr alterado')
                expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
                expect(Response.body).to.have.property('produtos')
                expect(Response.duration).to.be.lessThan(10)
            })

        });


        it('Cadastrar Produto', () => {
            let produto = `Produto Notebook ${Math.floor(Math.random() * 10000000)}`
            cy.request({

                method: 'Post',
                url:'Produtos', 
              body:
              {
                "nome": produto,
                "preco": 3350,
                "descricao": "Macbook",
                "quantidade": 3581
              }, 
              headers: {
                  authorization : token //colocando que a variavel token vai trazer a autorizacao
              }
            

        }).then((Response) => {
            expect(Response.status).to.equal(201) //espera que na resposta da api o status seja 200
            expect(Response.body.message).to.equal("Cadastro realizado com sucesso")

        })
    });


    it('Deve exibir critica ao cadastrar produto com nome já cadastrado' , () => {
        
        cy.cadastrarProduto(token,"Produto Teste",250, "descricao",180)

        .then((Response) => {
        expect(Response.status).to.equal(400) //espera que na resposta da api o status seja 200
        expect(Response.body.message).to.equal("Já existe produto com esse nome")

    })
});

    it('Alterar Produto cadastrado', () =>{
            cy.request('produtos').then(Response => {
                let id = Response.body.produtos[0]._id //criando variavel para pegar o id de um produto
                cy.request({
                    method: "Put",
                    url: `produtos/${id}`,
                    headers: {
                        authorization : token //colocando que a variavel token vai trazer a autorizacao
                    },
                    body:
                    {
                        "nome": "Produto editado",
                        "preco": 470,
                        "descricao": "Mouse",
                        "quantidade": 381
                    }


                })

            }).then((Response) => {
                expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
                expect(Response.body.message).to.equal("Registro alterado com sucesso")
    
            })


    })


it('Deve editar um produto cadastrado previamente', () => {
    let produto = `Produto Notebook ${Math.floor(Math.random() * 10000000)}`
    cy.cadastrarProduto(token, produto, 250, "teste descricao", 450)
    .then(Response =>{
        let id = Response.body._id

        cy.request({
            method: "Put",
            url: `produtos/${id}`,
            headers: {
                authorization : token //colocando que a variavel token vai trazer a autorizacao
            },
            body:
            {
                "nome": produto,
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
            }


        })

    }).then((Response) => {
        expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
        expect(Response.body.message).to.equal("Registro alterado com sucesso")

    })

    })


it('Deve deletar um produto cadastrado', () => {
    let produto = `Produto Notebook ${Math.floor(Math.random() * 10000000)}`
    cy.cadastrarProduto(token, produto, 250, "teste descricao", 450)
    .then(Response =>{
        let id = Response.body._id
        cy.request({
            method: "Delete",
            url: `produtos/${id}`,
            headers: {
                authorization : token //colocando que a variavel token vai trazer a autorizacao
            }}).then(Response => {
                expect(Response.body.message).to.equal("Registro excluído com sucesso")

            })
            


        })

})

});






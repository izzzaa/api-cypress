/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contracts.js'


describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
        cy.request('usuarios').then(Response => {
            return contrato.validateAsync(Response.body)

        })
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({

            method: 'Get',
            url: 'usuarios'

        }).then((Response) => {
            expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200

        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let usuario = `Usuario number ${Math.floor(Math.random() * 10000000)}`
        let email = `email${Math.floor(Math.random() * 10000000)}@qa.com.br`
        cy.request({
            method: 'Post',
            url: 'usuarios',
            body: {
                "nome": usuario,
                "email": email,
                "password": "teste",
                "administrador": "true"
            }
        }).then((Response) => {
            expect(Response.status).to.equal(201) //espera que na resposta da api o status seja 200
            expect(Response.body.message).to.equal("Cadastro realizado com sucesso")
        })
    });

    it('Deve cadastrar um usuário com sucesso usando Comando Customizado', () => {

        let usuario = `Usuario number ${Math.floor(Math.random() * 10000000)}`
        let email = `email${Math.floor(Math.random() * 10000000)}@qa.com.br`

        cy.cadastrarUsuario(usuario, email, "teste", "true")

            .then((Response) => {
                expect(Response.status).to.equal(201) //espera que na resposta da api o status seja 200
                expect(Response.body.message).to.equal("Cadastro realizado com sucesso")

            })

    });


    it('Deve validar um usuário com email inválido', () => {
        let usuario = `Usuario number ${Math.floor(Math.random() * 10000000)}`
        cy.request({
            method: 'Post',
            url: 'usuarios',
            body:
            {
                "nome": usuario,
                "email": "qa @ .odsa",
                "password": "teste",
                "administrador": "true"
            },
            failOnStatusCode: false

        }).then((Response) => {
            expect(Response.status).to.equal(400) //espera que na resposta da api o status seja 400
            expect(Response.body.email).to.equal("email deve ser um email válido")
        });


    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let usuario = `Usuario number ${Math.floor(Math.random() * 10000000)}`
        let email = `email${Math.floor(Math.random() * 10000000)}@qa.com.br`

        cy.cadastrarUsuario(usuario, email, "teste", "true")

        .then(Response =>{
            let id = Response.body._id
    
            cy.request({
                method: "Put",
                url: `usuarios/${id}`,
                body:
                {
                    "nome": "Usuario Alterado",
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
                }
    
    
            })
    
        }).then((Response) => {
            expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
            expect(Response.body.message).to.equal("Registro alterado com sucesso")
    
        })


    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        
        let usuario = `Usuario number ${Math.floor(Math.random() * 10000000)}`
        let email = `email${Math.floor(Math.random() * 10000000)}@qa.com.br`

        cy.cadastrarUsuario(usuario, email, "teste", "true")

        .then(Response =>{
            let id = Response.body._id
    
            cy.request({
                method: "Delete",
                url: `usuarios/${id}`
            })
    
        }).then((Response) => {
            expect(Response.status).to.equal(200) //espera que na resposta da api o status seja 200
            expect(Response.body.message).to.equal("Registro excluído com sucesso")
    
        })


    });


});
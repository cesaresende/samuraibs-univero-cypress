//import faker from '@faker-js/faker' //Gerar dados fakes

import signupPage from '../support/pages/signup'

describe('cadastro', function () {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_double = signup.email_double
            this.email_invalid = signup.email_invalid
            this.short_password = signup.short_password
        })
    })

    context('quando o usuário é novato', function () {

        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })


        it('deve cadastrar um novo usuário', function () {

            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quando o email já existe', function () {

        before(function () {
            cy.postUser(this.email_double)
        })

        it('não deve cadastrar usuário', function () {
            signupPage.go()
            signupPage.form(this.email_double)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')

        })
    })

    context('quando o email é incorreto', function () {

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_invalid)
            signupPage.submit()
            signupPage.alert.HaveText('Informe um email válido')

        })
    })

    context('quando a senha é muito curta', function () {
        const passwords = ['1', '22', '333', '4444', '55555']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('não deve cadastrar com a senha: ' + p, function () {

                this.short_password.password = p
                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.HaveText('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {
                signupPage.alert.HaveText(alert)
            })
        })
    })
})

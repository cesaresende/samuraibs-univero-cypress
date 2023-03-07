import { el} from './elements'

class SignupPage {
    go() {
        cy.visit('/signup')
    }

    form(user) {
        cy.get(el.name).type(user.name)
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.signupButton).click()
    }

    toastHaveText(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }

    alertHaveText(expectText) {
        cy.contains('.alert-error', expectText)
        .should('be.visible')
    }
    
} export default new SignupPage()
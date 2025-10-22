class HrLoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('#login-email').type(email);
  }

  fillPassword(password) {
    cy.get('#login-password').type(password).wait(9000);
  }

  submit() {
    cy.get('#login-submit').click().wait(12000);
  }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

export default HrLoginPage;

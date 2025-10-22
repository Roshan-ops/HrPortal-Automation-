import HrLoginPage from '../../pageObjects/HrLoginPage';

describe('HR Login via UI', () => {
  const hrLoginPage = new HrLoginPage();

  it('should successfully login as HR using UI', () => {
    const email = Cypress.env('HR_EMAIL');
    const password = Cypress.env('HR_PASSWORD');

    hrLoginPage.login(email, password);

    //Assertion: adjust based on actual post-login dashboard UI
    cy.url().should('include', 'http://51.20.64.81:82/#/dashboard');
    // cy.contains('Welcome, HR').should('exist');
  });
});

require('cypress-xpath');

class HrOnboardingPage {
  navigateToUserManagement() {
   cy.xpath("(//li[@routerlinkactive='active-link'])[2]").click();
    // cy.contains('User Management').click();
  }

  clickProfiles() {
    // Uses the reliable ID selector and waits for it to be visible before clicking
    cy.get('#Profiles').should('be.visible').click();
  }

  clickAddNewUser() {
    // Reverted to XPath as requested:
    cy.xpath("(//span[@class='text-[#FFFFFF] text-sm font-semibold'])[1]").click();
  }

  enterWorkEmail(email) {
    cy.get('input[placeholder="olivia@untitledui.com"]').type(email).wait(500);
    cy.contains('button', 'Get Started').click();
  }

  selectEmploymentStatus(status) {
    // Clicks the span/button that contains the text of the selected status (FullTime, PartTime, Contract).
    cy.contains(status).should('be.visible').click(); 
  }

  selectDepartment(department) {
    // Clicks the button/badge that contains the department text
    cy.contains(department).should('be.visible').click(); 
  }

//   clickNext() {
//     cy.contains('Next').click();
//   }

  fillProfile({
    salutationtitle,
    gender,
    dob,
    joinDate,
    systemRole,
    workShift,
    designation,
    supervisor,
    firstName,
    lastName,
    phone,
    personalEmail
  }) {
    // FIX: PrimeNG Dropdown interaction for Title (salutationtitle)
    cy.get('#salutationId').click();
    cy.contains('p-dropdownitem', salutationtitle).click();

    // FIX: PrimeNG Dropdown interaction for Gender
    cy.get('#gender').click();
    cy.contains('p-dropdownitem', gender).click();

    // Date of Birth (DOB) - Improved stability for date entry
//     cy.contains('Date of Birth').click().clear().type(dob).blur();
cy.get('label').contains('Date of Birth').parent().find('input').clear().blur().type(dob);
    
// cy.contains('Date of Birth').find('input').clear().type(dob);
    
    // Joining Date - Improved stability for date entry
//     cy.get('#join-date').click().clear().type(joinDate).blur();
cy.get('label').contains('Join Date').parent().find('input').clear().blur().type(joinDate);


    // FIX: PrimeNG Dropdown interaction for System Role
    cy.contains('System Role').click();
    cy.get('li[role="option"]').contains(new RegExp(systemRole, 'i')).click();

    // FIX: PrimeNG Dropdown interaction for Work Shift
    cy.get('#work-shift').click();
    cy.contains('p-dropdownitem', workShift).click();

    // FIX: PrimeNG Dropdown interaction for Designation
    cy.get('#designation').click();
    cy.contains('p-dropdownitem', designation).click();

    // FIX: PrimeNG Dropdown interaction for Supervisor
    cy.get('#supervisor').click();
    cy.contains('p-dropdownitem', supervisor).click();

    cy.get('#first-name').type(firstName);
    cy.get('#last-name').type(lastName);
    cy.get('#phone').type(phone);
    cy.get('#personal-email').type(personalEmail);
  }

  submit() {
    cy.contains('Save').click();
  }
}

export default HrOnboardingPage;

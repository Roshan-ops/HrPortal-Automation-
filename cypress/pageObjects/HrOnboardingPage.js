require('cypress-xpath');
class HrOnboardingPage {
  navigateToUserManagement() {
   cy.xpath("(//li[@routerlinkactive='active-link'])[2]").click();
    // cy.contains('User Management').click();
  }

   clickProfile() {
    cy.xpath("(//span[normalize-space()='Profiles'])[1]").click();
  }

  clickAddNewUser() {
    cy.xpath("(//span[@class='text-[#FFFFFF] text-sm font-semibold'])[1]").click();
  }

  enterWorkEmail(email) {
    cy.get('input[placeholder="olivia@untitledui.com"]').type(email).wait(2000); // Replace selector if needed
    cy.xpath('//button[contains(text(), "Get Started")]').click();
  }

  selectSystemRole(role) {
    cy.xpath("(//span[normalize-space()='FullTime'])[1]").select(role); // fulltime / parttime / contract
  }

  selectDepartment(department) {
    cy.get('#department').select(department); // Based on your options
  }

  clickNext() {
    cy.contains('Next').click(); // If exists before profile form
  }

  fillProfile({
    supervisortitle,
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
    cy.get('#supervisortitle').select(supervisortitle);
    cy.get('#gender').select(gender);
    cy.get('#dob').type(dob);
    cy.get('#join-date').type(joinDate);
    cy.get('#system-role-dropdown').select(systemRole);
    cy.get('#work-shift').select(workShift);
    cy.get('#designation').select(designation);
    cy.get('#supervisor').select(supervisor);
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

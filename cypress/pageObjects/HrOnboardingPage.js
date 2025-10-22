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
    // FIX: Add a specific tag type (assuming 'div' wraps the department buttons) to resolve the "multiple elements" error.
    cy.contains('div', department).should('be.visible').click(); 
  }
    // FIX: Converted helper function to a standard class method so it can be called using 'this.selectCustomDropdown'
    selectCustomDropdown(fieldSelector, optionText) {
        // 1. Click the main field element to open the list
        cy.get(fieldSelector).click(); 
        // 2. Search the global dropdown list (in the body) for the option text and click it
        cy.get('body').find('li[role="option"]')
          .contains(new RegExp(optionText, 'i'))
          .should('be.visible')
          .click();
    }
  fillProfile({salutationtitle,gender,dob,joinDate,systemRole, workShift, designation, supervisor, firstName, lastName, phone, personalEmail})
{
    // Title
    this.selectCustomDropdown('#salutationId', salutationtitle);
    // Gender
    this.selectCustomDropdown('#gender', gender);
    // Date of Birth (DOB) - Uses reliable label-finding and blur to close the date picker
    cy.get('label').contains('Date of Birth').parent().find('input').clear().blur().type(dob);   
    // Joining Date - Uses reliable label-finding and blur to close the date picker
    cy.get('label').contains('Join Date').parent().find('input').clear().blur().type(joinDate);
    // FIX: System Role - Enforces selection of 'Employee' (case-insensitive)
    // Use user-provided XPath to click the combobox directly to open the options list
    cy.xpath("(//span[@role='combobox'])[4]").click(); 
    // Search the body globally for the option and click it
    cy.get('body').find('li[role="option"]').contains('Employee', { matchCase: false }).click();
    // Work Shift - NOW USING ROBUST HELPER
    this.selectCustomDropdown('#workshiftId', workShift);
    // Designation - NOW USING ROBUST HELPER
    this.selectCustomDropdown('#designationId', designation),{ force: true };
    // Supervisor - NOW USING ROBUST HELPER
    this.selectCustomDropdown('#supervisor', supervisor);
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

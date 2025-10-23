// Ensure cypress-xpath is imported/configured if XPaths must be used.
// Best practice recommendation: Replace XPaths with more stable CSS selectors (cy.get) or text content selectors (cy.contains) where possible.
require('cypress-xpath');

class HrOnboardingPage {
  // Navigation to User Management (Using existing XPath)
  navigateToUserManagement() {
    cy.xpath("(//li[@routerlinkactive='active-link'])[2]").should('be.visible').click();
  }

  // Click Profiles (Using robust ID selector)
  clickProfiles() {
    cy.get('#Profiles').should('be.visible').click();
  }

  // Click Add New User (Using existing XPath)
  clickAddNewUser() {
    // FIX: Using { force: true } to bypass the visibility check, as the element is clipped by a parent container.
    cy.xpath("(//span[@class='text-[#FFFFFF] text-sm font-semibold'])[1]").click({ force: true });
  }

  // Enters email and clicks 'Get Started'. Removed hardcoded wait.
  enterWorkEmail(email) {
    // Assert and type into the email field
    cy.get('input[placeholder="olivia@untitledui.com"]').should('be.visible').type(email);
    // Click the button
    cy.contains('button', 'Get Started').should('be.enabled').click();
  }

  // Selects Employment Status (FullTime, PartTime, Contract)
  selectEmploymentStatus(status) {
    cy.contains(status).should('be.visible').click(); 
  }

  // Selects Department
  selectDepartment(department) {
    // Using 'div' to scope the selection and avoid multiple element issues
    cy.contains('div', department).should('be.visible').click(); 
  }
  
  // Clicks the 'Next' button to move from the initial screen to the profile form
//   clickNext() {
//     cy.contains('button', 'Next').should('be.enabled').click();
//   }

  /**
   * Helper function to select an option from a custom (non-native <select>) dropdown.
   * @param {string} fieldSelector - The CSS selector of the input/field that opens the dropdown (e.g., '#salutationId').
   * @param {string} optionText - The text of the option to select.
   */
  selectCustomDropdown(fieldSelector, optionText) {
    // 1. Click the main field element to open the list
    cy.get(fieldSelector).should('be.visible').click(); 
    // 2. Search the global dropdown list (in the body) for the option text and click it
    // Using RegExp ensures case-insensitivity and precise matching
    cy.get('body').find('li[role="option"]')
      .contains(new RegExp('^' + optionText + '$', 'i'))
      .should('exist')
      .click({ force: true });
  }

  // Fills the main profile form details
  fillProfile({salutationtitle, gender, dob, joinDate, systemRole, workShift, designation, supervisor, firstName, lastName, phone, personalEmail}) {
    // Title
    this.selectCustomDropdown('#salutationId', salutationtitle);
    
    // Gender
    this.selectCustomDropdown('#gender', gender);
    
    // Date of Birth (DOB) - Clear, type, and blur to ensure the date picker closes correctly
    cy.get('label').contains('Date of Birth').parent().find('input').clear().type(dob).blur();
    
    // Joining Date
    cy.get('label').contains('Join Date').parent().find('input').clear().type(joinDate).blur();
    cy.get('body').click(0, 0);
    // System Role (Assuming ID #systemRoleId)
    // this.selectCustomDropdown('#roleId', systemRole);
    

        // FIX: System Role - Enforces selection of 'Employee' (case-insensitive)
    // Use user-provided XPath to click the combobox directly to open the options list
    cy.xpath("(//span[@role='combobox'])[4]").click(); 
    // Search the body globally for the option and click it
    cy.get('body').find('li[role="option"]').contains('Employee', { matchCase: false }).click();
    // Work Shift - NOW USING ROBUST HELPER
    // Work Shift
    this.selectCustomDropdown('#workshiftId', workShift);
    
    // Designation
    this.selectCustomDropdown('#designationId', designation);
    
    // Supervisor
    this.selectCustomDropdown('#supervisorId', supervisor);
    
    // Basic Text Inputs
    cy.xpath("//input[@formcontrolname='firstName']").should('exist').type(firstName);
    cy.xpath("//input[@formcontrolname='lastName']").should('exist').type(lastName);
    cy.get('#phoneNumber').should('exist').type(phone);
    cy.xpath("//input[@formcontrolname='personalEmail']").should('exist').type(personalEmail);
  }

  // Submits the form
  submit() {
    cy.contains('button', 'Save').should('be.enabled').click();
  }
}

export default HrOnboardingPage;

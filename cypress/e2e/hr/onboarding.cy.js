import HrLoginPage from '../../pageObjects/HrLoginPage';
import HrOnboardingPage from '../../pageObjects/HrOnboardingPage';
import { faker } from '@faker-js/faker';

describe('Employee Onboarding with Random Valid Data', () => {
  const loginPage = new HrLoginPage();
  const onboardingPage = new HrOnboardingPage();

  // Helper function to pick a random item from a list
  const random = (list) => list[Math.floor(Math.random() * list.length)];

  // Helper function to format Date object into MM/DD/YYYY string
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // 1. Department Supervisor Mapping (New Logic)
  const supervisorMap = {
    'Quality Assurance': 'Bikalpa Tripathi',
    'Design': 'Suraj Neupane',
    'Artifical Intelligence': 'Suraj Neupane',
    'Business Analyst': 'Suraj Neupane',
    'Human Resource': 'HR Vertex',
    'Frontend': 'Suraj Neupane',
    'Backend': 'Suraj Neupane',
    // Defaulting 'Manager' which was in the original list but not the new logic
    'Manager': 'HR Vertex' 
  };
  
  // Dropdown Options
  const titleOptions = ['Mr.', 'Mrs.', 'Ms.'];
  const genderOptions = ['Male', 'Female', 'Others'];
  const employmentStatusOptions = ['FullTime', 'PartTime', 'Contract'];
  
  // 2. Updated Department Options to include 'Business Analyst' and standardize 'Frontend'
  const departmentOptions = [ 
    'Quality Assurance', 
    'Manager',
    'Design',
    'Artifical Intelligence',
    'Frontend',
    'Human Resource',
    'Backend',
    'Business Analyst'
  ];
  
  const workShiftOptions = ['MIdnight','Morning','Evening','Afternon'];
  const designationOptions = ['Senior', 'Mid', 'Junior', 'Trainee', 'Intern'];
  
  // Updated list of all possible supervisors
  const allSupervisors = ['Bikalpa Tripathi', 'Suraj Neupane', 'HR Vertex'];

  // Random Data Generation
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const emailPrefix = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.string.numeric(4)}`;
  const workEmail = `${emailPrefix}@yopmail.com`;
  const phone = faker.phone.number('98########');
  const personalEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.string.numeric(2)}@yopmail.com`;

  // Date Generation - NOW IN MM/DD/YYYY FORMAT
  const dobDate = faker.date.birthdate({ min: 22, max: 40, mode: 'age' });
  const dob = formatDate(dobDate); // e.g., 10/23/2000
  const joinDate = formatDate(new Date()); // Today's date in MM/DD/YYYY format

  before(() => {
    loginPage.login(Cypress.env('HR_EMAIL'), Cypress.env('HR_PASSWORD'));
  });

  it('should onboard a new employee from CoreHR → User Management → Profile setup with dynamic supervisor assignment', () => {
    // Determine the department and supervisor based on the new logic
    const selectedDepartment = random(departmentOptions);
    const assignedSupervisor = supervisorMap[selectedDepartment];

    // Log the selected values for debugging
    cy.log(`Onboarding: ${firstName} ${lastName}`);
    cy.log(`Department: ${selectedDepartment}`);
    cy.log(`Supervisor: ${assignedSupervisor}`);

    onboardingPage.navigateToUserManagement();
    onboardingPage.clickProfiles();
    onboardingPage.clickAddNewUser();
    onboardingPage.enterWorkEmail(workEmail);

    // 🔹 Select random employment status and the determined department
    onboardingPage.selectEmploymentStatus(random(employmentStatusOptions));
    onboardingPage.selectDepartment(selectedDepartment);

    // Clicks 'Next' to move to the profile form
    // onboardingPage.clickNext();

    onboardingPage.fillProfile({
      salutationtitle: random(titleOptions),
      gender: random(genderOptions),
      dob,
      joinDate,
      systemRole: 'Employee',
      workShift: random(workShiftOptions),
      designation: random(designationOptions),
      // 3. Use the dynamically assigned supervisor
      supervisor: assignedSupervisor, 
      firstName,
      lastName,
      phone,
      personalEmail
    });
    
    // Submits the form
    onboardingPage.submit();

    // Assertion for success message
    cy.contains('Employee onboarded successfully').should('exist');
  });
});

import HrLoginPage from '../../pageObjects/HrLoginPage';
import HrOnboardingPage from '../../pageObjects/HrOnboardingPage';
import { faker } from '@faker-js/faker';

describe('Employee Onboarding with Random Valid Data', () => {
  const loginPage = new HrLoginPage();
  const onboardingPage = new HrOnboardingPage();

  const random = (list) => list[Math.floor(Math.random() * list.length)];

  // Helper function to format Date object into MM/DD/YYYY string
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Dropdown Options
  const titleOptions = ['Mr.', 'Mrs.', 'Ms.'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const employmentStatusOptions = ['FullTime', 'PartTime', 'Contract'];
  const departmentOptions = [
   'Quality Assurance',
    'Manager',
    'Design',
    'Artificial Intelligence',
    'Front-End',
    'Human Resource',
    'Backend', // Corrected to match UI button text
  ];
  const workShiftOptions = ['Day shift', 'Morning shift', 'First shift'];
  const designationOptions = ['Senior', 'Mid', 'Junior', 'Trainee', 'Intern'];
  const supervisorOptions = ['Vertex HR'];
  
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

  it('should onboard a new employee from CoreHR → User Management → Profile setup', () => {
    onboardingPage.navigateToUserManagement();
    onboardingPage.clickProfiles();
    onboardingPage.clickAddNewUser();
    onboardingPage.enterWorkEmail(workEmail);

    // 🔹 Pick random employment status and department
    onboardingPage.selectEmploymentStatus(random(employmentStatusOptions));
    onboardingPage.selectDepartment(random(departmentOptions));
//     onboardingPage.clickNext(); // move to profile form

    onboardingPage.fillProfile({
      salutationtitle: random(titleOptions),
      gender: random(genderOptions),
      dob,
      joinDate,
      systemRole: 'Employee', // fixed in profile
      workShift: random(workShiftOptions),
      designation: random(designationOptions),
      supervisor: random(supervisorOptions),
      firstName,
      lastName,
      phone,
      personalEmail
    });

    onboardingPage.submit();

    cy.contains('Employee onboarded successfully').should('exist');
  });
});

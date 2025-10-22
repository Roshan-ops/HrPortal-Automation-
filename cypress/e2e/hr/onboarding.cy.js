import HrLoginPage from '../../pageObjects/HrLoginPage';
import HrOnboardingPage from '../../pageObjects/HrOnboardingPage';
import { faker } from '@faker-js/faker';

describe('Employee Onboarding with Random Valid Data', () => {
  const loginPage = new HrLoginPage();
  const onboardingPage = new HrOnboardingPage();

  const random = (list) => list[Math.floor(Math.random() * list.length)];

  // Dropdown Options
  const titleOptions = ['Mr.', 'Mrs.', 'Ms.'];
  const genderOptions = ['Male', 'Female', 'Other'];
  const systemRoleOptions = ['fulltime', 'parttime', 'contract'];
  const departmentOptions = [
    'Artificial Intelligence',
    'QUALITY ANALYST',
    'BACK-END',
    'FRONT-END',
    'DESIGN',
    'BUSINESS ANALYST',
    'MANAGER',
    'HUMAN RESOURCE'
  ];
  const workShiftOptions = ['Day shift', 'Morning shift', 'First shift'];
  const designationOptions = ['Senior', 'Mid', 'Junior', 'Trainee', 'Intern'];
  const supervisorOptions = ['Vertex HR'];

  const workEmail = faker.internet.email('qauser');
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = faker.phone.number('98########');
  const personalEmail = faker.internet.email(firstName);
  const dob = faker.date
    .birthdate({ min: 22, max: 40, mode: 'age' })
    .toISOString()
    .split('T')[0];
  const joinDate = new Date().toISOString().split('T')[0];

  before(() => {
    loginPage.login(Cypress.env('HR_EMAIL'), Cypress.env('HR_PASSWORD'));
  });

  it('should onboard a new employee from CoreHR → User Management → Profile setup', () => {
    onboardingPage.navigateToUserManagement();
    onboardingPage.clickAddNewUser();
    onboardingPage.enterWorkEmail(workEmail);

    // 🔹 Pick random system role and department
    const selectedRole = random(systemRoleOptions);
    const selectedDepartment = random(departmentOptions);

    onboardingPage.selectSystemRole(selectedRole);
    onboardingPage.selectDepartment(selectedDepartment);
    onboardingPage.clickNext(); // move to profile form

    onboardingPage.fillProfile({
      supervisortitle: random(titleOptions),
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

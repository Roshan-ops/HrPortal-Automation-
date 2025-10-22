// // const { defineConfig } = require("cypress");

// // module.exports = defineConfig({
// //   e2e: {
// //     setupNodeEvents(on, config) {
// //       // implement node event listeners here
// //     },
// //   },
// // });


// const { defineConfig } = require("cypress");
// require('dotenv').config(); // <--- LOAD .env FILE HERE

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // You can customize node events here
//     },
//     baseUrl: 'http://51.20.64.81:82/#',
//     env: {
//       EMAIL: process.env.CYPRESS_EMAIL,
//       PASSWORD: process.env.CYPRESS_PASSWORD,
//       API_TOKEN: process.env.CYPRESS_API_TOKEN,
//     },
//   },
// });


// require('dotenv').config();

// import { defineConfig } from 'cypress';

// export default defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000', // Replace with your actual app URL
//     setupNodeEvents(on, config) {
//       config.env.HR_EMAIL = process.env.HR_EMAIL;
//       config.env.HR_PASSWORD = process.env.HR_PASSWORD;
//       config.env.MANAGER_EMAIL = process.env.MANAGER_EMAIL;
//       config.env.MANAGER_PASSWORD = process.env.MANAGER_PASSWORD;
//       config.env.EMPLOYEE_EMAIL = process.env.EMPLOYEE_EMAIL;
//       config.env.EMPLOYEE_PASSWORD = process.env.EMPLOYEE_PASSWORD;
//       return config;
//     }
//   }
// });


const { defineConfig } = require("cypress");
require('dotenv').config(); // Load .env file

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://51.20.64.81:82/#',
    setupNodeEvents(on, config) {
      // Set Cypress environment variables from .env
      config.env.HR_EMAIL = process.env.HR_EMAIL;
      config.env.HR_PASSWORD = process.env.HR_PASSWORD;
      config.env.MANAGER_EMAIL = process.env.MANAGER_EMAIL;
      config.env.MANAGER_PASSWORD = process.env.MANAGER_PASSWORD;
      config.env.EMPLOYEE_EMAIL = process.env.EMPLOYEE_EMAIL;
      config.env.EMPLOYEE_PASSWORD = process.env.EMPLOYEE_PASSWORD;
      return config;
    }
  }
});

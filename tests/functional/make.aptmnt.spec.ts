import { test, expect } from '@playwright/test';
import { log } from '../helpers/logger.js';

test.describe("Login Testing", ()=>{

    test.beforeEach("Login to app", async ({page})=>{
      
      //custom log
await log("info","The test is running in Test environment")

  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();

    })

test("Login sucessful", async ({page})=>{
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill(process.env.TEST_USERNAME);
  console.log("Username:", process.env.TEST_USERNAME);
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD);
  console.log("Password:", process.env.TEST_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();


  //Verify login is successful by asserting a text
  await expect(page.locator("h2")).toContainText("Make Appointment")
  await log("info" ,"The login is successful");

  //get the login cookie
const loginCookie= await page.context().cookies()
process.env.LOGIN_COOKIE = JSON.stringify(loginCookie)
//acessthe login coockies
console.log(`>>The login cookie is : ${process.env.LOGIN_COOKIE}`)

//MAke appoinment
  await page.getByLabel('Facility').selectOption('Hongkong CURA Healthcare Center');
  await page.getByRole('radio', { name: 'Medicaid' }).check();
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
  await page.getByRole('cell', { name: '20' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).fill('Test');
  await page.getByRole('button', { name: 'Book Appointment' }).click();
  await expect(page.getByRole('heading', { name: 'Appointment Confirmation' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible();
  await page.getByRole('link', { name: 'Go to Homepage' }).click();

  });

test('Login unsuccessful', async ({ page }) => {
  await page.locator('#menu-toggle').click();
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('Anu');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Login failed! Please ensure')).toBeVisible();
});

})




//import { test, expect } from '@playwright/test';
//import { AuthPage } from '../pages/AuthPage';
//import { RegistrationPage } from '../pages/RegistrationPage';
//import { generateRandomEmail, generateRandomString, generateValidPhone, generateRandomPassword } from '../utils/helpers';

//test.describe.configure({ mode: 'serial' });

//let testEmail: string;
//let testName: string;
//let testSurname: string;

//test.beforeEach(async ({ page }) => {
    //testEmail = generateRandomEmail();
   // testName = generateRandomString(10);
   // testSurname = generateRandomString(10);

   // const authPage = new AuthPage(page);
  //  await authPage.navigateTo(LoginUrl);
  //  await authPage.navigateToRegistration();
  //  await expect(page.getByRole('button', { name: 'Зарегестрироватся' })).toBeVisible();
 // await expect(page.locator('#root')).toContainText('Зарегестрироватся');
    
//});

//test.describe('Регистрация', () => {

  // test('1. Регистрация с валидными данными', async ({ page }) => {
     //   const registrationPage = new RegistrationPage(page);

      //  await registrationPage.register({
       //     email: testEmail,
       //     password: generateRandomPassword(),
       //     name: testName,
      //      surname: testSurname,
       //     phone: generateValidPhone()
       // });
        
       // await expect(page).toHaveURL(AccountUrl);
      //  await expect(page.getByText('Кабинет')).toBeVisible();
     //   await expect(page.getByText('Мои объявления')).toBeVisible();
   // });

import { test, expect } from '../fixtures';
import { generateRandomEmail, generateRandomString, generateValidPhone } from '../utils/helpers';

const AccountUrl = "http://market.sedtest-tools.ru/account";
const LoginUrl = "http://market.sedtest-tools.ru/login";

test.describe('Регистрация', () => {
    test.beforeEach(async ({ page, authPage }) => {
        await authPage.navigateTo('http://market.sedtest-tools.ru/login');
        await authPage.navigateToRegistration();
        await expect(page.getByRole('button', { name: 'Зарегестрироватся' })).toBeVisible();
    });

    test('1. Регистрация с валидными данными', async ({ registrationPage, page }) => {
        await registrationPage.register({
            email: generateRandomEmail(),
            password: 'validPass123',
            name: generateRandomString(10),
            surname: generateRandomString(10),
            phone: generateValidPhone()
        });
        
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/account');
        await expect(page.getByText('Кабинет')).toBeVisible();
    });



    test('2. Регистрация с паролем из 6 символов', async ({registrationPage, page }) => {
    
        await registrationPage.register({
            email: generateRandomEmail(),
            password: '123456',
            name: generateRandomString(10),
            surname: generateRandomString(10),
            phone: generateValidPhone()
        });
        
        await expect(registrationPage.passwordError).toHaveText('Мин.длинна - 7 символов');
        await expect(page).toHaveURL(LoginUrl);
        await expect(registrationPage.registerButton).toBeVisible();
    });

    test('3. Регистрация с незаполненными полями', async ({ registrationPage, page }) => {

        await registrationPage.registerButton.click();
        
        await registrationPage.expectEmptyFieldsErrors();//проверка отображения подсказок
        await expect(page).toHaveURL(LoginUrl);
        await expect(registrationPage.registerButton).toBeVisible();
    });

    test('4. Регистрация с неверным форматом почты', async ({ registrationPage, page }) => {
        //const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            email: 'invalidemail',
            password: '1234567',
            name: generateRandomString(10),
            surname: generateRandomString(10),
            phone: generateValidPhone()
        });
        
        await expect(registrationPage.emailError).toHaveText('Неверный формат почты');
        await expect(page).toHaveURL(LoginUrl);
        await expect(registrationPage.registerButton).toBeVisible();
    });

    test('5. Регистрация с неверным форматом телефона', async ({ registrationPage, page }) => {
        //const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            email: generateRandomEmail(),
            password: '1234567',
            name: generateRandomString(10),
            surname: generateRandomString(10),
            phone: '+ 7 (1)'
        });
        
        await expect(registrationPage.phoneError).toHaveText('Неверный формат телефона');
        await expect(page).toHaveURL(LoginUrl);
        await expect(registrationPage.registerButton).toBeVisible();
    });
});
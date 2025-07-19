import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { generateRandomEmail, generateRandomString, generateValidPhone } from '../utils/helpers';

test.describe.configure({ mode: 'serial' });

let testEmail: string;
let testName: string;
let testSurname: string;

test.beforeEach(async ({ page }) => {
    testEmail = generateRandomEmail();
    testName = generateRandomString(10);
    testSurname = generateRandomString(10);

    const authPage = new AuthPage(page);
    await authPage.navigateTo('http://market.sedtest-tools.ru/login');
    await authPage.navigateToRegistration();
    await authPage.waitForElement(page.getByText('Регистрация'));
});

test.describe('Регистрация', () => {
    test('1. Регистрация с валидными данными', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            email: testEmail,
            password: '1234567',
            name: testName,
            surname: testSurname,
            phone: generateValidPhone()
        });
        
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/');
        await expect(page.getByText('Кабинет')).toBeVisible();
        await expect(page.getByText('Мои объявления')).toBeVisible();
    });

    test('2. Регистрация с паролем из 6 символов', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            email: testEmail,
            password: '123456',
            name: testName,
            surname: testSurname,
            phone: generateValidPhone()
        });
        
        await expect(registrationPage.passwordError).toHaveText('Мин.длинна - 7 символов');
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
        await expect(registrationPage.registerButton).toBeVisible();
    });

    test('3. Регистрация с незаполненными полями', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.registerButton.click();
        
        await registrationPage.expectEmptyFieldsErrors();
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
    });

    test('4. Регистрация с неверным форматом почты', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            email: 'invalidemail',
            password: '1234567',
            name: testName,
            surname: testSurname,
            phone: generateValidPhone()
        });
        
        await expect(registrationPage.emailError).toHaveText('Неверный формат почты');
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
        await expect(registrationPage.registerButton).toBeVisible();
    });

    test('5. Регистрация с неверным форматом телефона', async ({ page }) => {
        const registrationPage = new RegistrationPage(page);
        await registrationPage.register({
            email: testEmail,
            password: '1234567',
            name: testName,
            surname: testSurname,
            phone: '+ 7 (1)'
        });
        
        await expect(registrationPage.phoneError).toHaveText('Неверный формат телефона');
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
        await expect(registrationPage.registerButton).toBeVisible();
    });
});
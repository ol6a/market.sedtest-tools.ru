import { test, expect, LoginUrl, AccountUrl } from '../fixtures.ts';
import { generateRandomEmail, generateRandomString, generateValidPhone } from '../utils/helpers';


test.describe('Регистрация', () => {
    test.beforeEach(async ({ page, authPage }) => {
        await authPage.navigateTo(LoginUrl);
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
        
        await expect(page).toHaveURL(AccountUrl);
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
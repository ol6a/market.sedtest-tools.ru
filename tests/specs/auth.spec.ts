import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.navigateTo('http://market.sedtest-tools.ru/login');
    await authPage.waitForElement(authPage.loginButton);
});

test.describe('Авторизация', () => {
    test('1. Авторизация с корректными данными', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login('rm@ex.ru', '1234567');
        
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/');
        await expect(page.getByText('Кабинет')).toBeVisible();
        await expect(page.getByText('Мои объявления')).toBeVisible();
    });

    test('2. Авторизация с неверным форматом почты', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login('1', '1234567');
        
        await expect(authPage.emailError).toHaveText('Неверный формат почты');
        await expect(authPage.errorMessage).not.toBeVisible();
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
    });

    test('3. Авторизация с несуществующей почтой', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login('nonexistent@example.com', '1234567');
        
        await expect(authPage.errorMessage).toHaveText('Неправильный логин или пароль');
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
        await expect(authPage.loginButton).toBeVisible();
    });

    test('4. Авторизация с незаполненными данными', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.loginButton.click();
        
        await expect(authPage.emailError).toHaveText('Заполните поле');
        await expect(authPage.passwordError).toHaveText('Заполните поле');
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
    });

    test('5. Авторизация с существующей почтой и неправильным паролем', async ({ page }) => {
        const authPage = new AuthPage(page);
        await authPage.login('rm@ex.ru', 'wrongpassword');
        
        await expect(authPage.errorMessage).toHaveText('Неправильный логин или пароль');
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
        await expect(authPage.loginButton).toBeVisible();
    });
});
import { test as base } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AccountPage } from './pages/AccountPage';

type TestFixtures = {
    authPage: AuthPage;
    registrationPage: RegistrationPage;
    accountPage: AccountPage;
    testUser: { email: string; password: string };
};

export const test = base.extend<TestFixtures>({
    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await use(authPage);
    },

    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },

    accountPage: async ({ page }, use) => {
        const accountPage = new AccountPage(page);
        await use(accountPage);
    },

    testUser: async ({ page, registrationPage }, use) => {
        // Регистрируем нового пользователя
        await page.goto('http://market.sedtest-tools.ru/login');
        await page.getByText('Еще не зарегистрированы ?').click();
        //await expect(page.getByText('Регистрация')).toBeVisible();
        const { email, password } = await registrationPage.register2();
        
        // Используем данные пользователя в тестах
        await use({ email, password });
        
        // Здесь можно добавить очистку тестовых данных после тестов
        // (если ваше API поддерживает удаление пользователей)
    },
});

export { expect } from '@playwright/test';
import { test as baseTest, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AccountPage } from './pages/AccountPage';

export const test = baseTest.extend<{
    authPage: AuthPage;
    registrationPage: RegistrationPage;
    accountPage: AccountPage;
    testUser: { email: string; password: string };
}>({
    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await authPage.navigateTo(BaseUrl);
        await authPage.loginHeader.click();
        await expect(page.getByText('Вход')).toBeVisible();
        await use(authPage);
    },

    registrationPage: async ({ page, authPage }, use) => {
        const registrationPage = new RegistrationPage(page);
        await authPage.navigateToRegistration();
        await expect(page.getByRole('button', { name: 'Зарегестрироватся' })).toBeVisible();
        await use(registrationPage);
    },

    accountPage: async ({ page }, use) => {
        const accountPage = new AccountPage(page);
        await use(accountPage);
    },

    testUser: async ({}, use) => {
        await use({
            email: 'test@example.com',
            password: 'validPass123'
        });
    }
});

export const BaseUrl = "http://market.sedtest-tools.ru/";
export const LoginUrl = "http://market.sedtest-tools.ru/login";
export const AccountUrl = "http://market.sedtest-tools.ru/account";
export { expect } from '@playwright/test';
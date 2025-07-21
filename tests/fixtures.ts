import { test as base, expect } from '@playwright/test';
import { AuthPage } from './pages/AuthPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { AccountPage } from './pages/AccountPage';

type TestFixtures = {
    authPage: AuthPage;
    registrationPage: RegistrationPage;
    accountPage: AccountPage;
    testUser: { email: string; password: string };
};
export const LoginUrl = 'http://market.sedtest-tools.ru/login'; // Экспортируем URL отдельно
export const BaseUrl = "http://market.sedtest-tools.ru/";
export const AccountUrl = "http://market.sedtest-tools.ru/account";

//export const test = base.extend<TestFixtures>({
   // authPage: async ({ page }, use) => {
    //    const authPage = new AuthPage(page);
   //     await use(authPage);
  //  },
    
   export const test = base.extend<{
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
        await authPage.navigateTo(LoginUrl);
        await authPage.navigateToRegistration();
        await expect(page.getByRole('button', { name: 'Зарегестрироватся' })).toBeVisible();
        await use(registrationPage);
    },

    accountPage: async ({ page, authPage, testUser  }, use) => {
        const accountPage = new AccountPage(page);
        await authPage.login(testUser.email, testUser.password);
        await page.getByText('Кабинет').click();
        await expect(page.getByText('Кабинет')).toBeVisible();
        await use(accountPage);
    },

    testUser: async ({ page, registrationPage }, use) => {
        // Регистрируем нового пользователя
        await page.goto(LoginUrl);
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
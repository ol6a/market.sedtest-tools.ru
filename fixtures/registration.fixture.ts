import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginUrl } from './index.ts';
import { expect } from './index.ts';

export const registrationFixtures = {
    registrationPage: async ({ page, authPage }, use) => {
        const registrationPage = new RegistrationPage(page);
        await authPage.navigateTo(LoginUrl);
        await authPage.navigateToRegistration();
        await expect(page.getByRole('button', { name: 'Зарегестрироватся' })).toBeVisible();
        await use(registrationPage);
    },
};
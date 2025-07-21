import { RegistrationPage } from '../pages/RegistrationPage.ts';
import { LoginUrl } from './index';

export const userFixtures = {
    testUser: async ({ page, registrationPage }, use) => {
        await page.goto(LoginUrl);
        await page.getByText('Еще не зарегистрированы ?').click();
        const { email, password } = await registrationPage.register2();
        await use({ email, password });
    },
};
import { AuthPage } from '../pages/AuthPage';
import { BaseUrl } from './index.ts';
import { expect } from './index.ts';

export const authFixtures = {
    authPage: async ({ page }, use) => {
        const authPage = new AuthPage(page);
        await authPage.navigateTo(BaseUrl);
        await authPage.loginHeader.click();
        await expect(page.getByText('Вход')).toBeVisible();
        await use(authPage);
    },
};
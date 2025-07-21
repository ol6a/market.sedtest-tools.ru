import { AccountPage } from '../pages/AccountPage';
import { expect } from './index.ts';

export const accountFixtures = {
    accountPage: async ({ page, authPage, testUser }, use) => {
        const accountPage = new AccountPage(page);
        await authPage.login(testUser.email, testUser.password);
        await page.getByText('Кабинет').click();
        await expect(page.getByText('Кабинет')).toBeVisible();
        await use(accountPage);
    },
};
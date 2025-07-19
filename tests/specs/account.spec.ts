import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { AccountPage } from '../pages/AccountPage';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.navigateTo('http://market.sedtest-tools.ru/login');
    await authPage.login('rm@ex.ru', '1234567');
    
    const accountPage = new AccountPage(page);
    await accountPage.navigateTo('http://market.sedtest-tools.ru/account');
    await accountPage.waitForElement(accountPage.nameInput);
});

test.describe('Редактирование кабинета', () => {
    test('1. Проверка отображения основных элементов', async ({ page }) => {
        const accountPage = new AccountPage(page);
        
        await expect(accountPage.myAdsHeader).toBeVisible();
        await expect(accountPage.cabinetHeader).toBeVisible();
        await expect(accountPage.uploadPhotoButton).toBeVisible();
        await expect(accountPage.saveButton).toBeVisible();
        await expect(accountPage.logoutButton).toBeVisible();
    });

    test('2. Редактирование имени', async ({ page }) => {
        const accountPage = new AccountPage(page);
        const newName = 'НовоеИмя';
        await accountPage.updateProfile({ name: newName });
        
        await expect(accountPage.successMessage).toContainText('Информация сохранена');
        await accountPage.expectProfileData({ name: newName });
    });

    test('3. Редактирование фамилии', async ({ page }) => {
        const accountPage = new AccountPage(page);
        const newSurname = 'НоваяФамилия';
        await accountPage.updateProfile({ surname: newSurname });
        
        await expect(accountPage.successMessage).toContainText('Информация сохранена');
        await accountPage.expectProfileData({ surname: newSurname });
    });

    test('4. Редактирование телефона', async ({ page }) => {
        const accountPage = new AccountPage(page);
        const newPhone = '+ 7 (999) 999-99-99';
        await accountPage.updateProfile({ phone: newPhone });
        
        await expect(accountPage.successMessage).toContainText('Информация сохранена');
        await accountPage.expectProfileData({ phone: newPhone });
    });

    test('5. Выход из аккаунта', async ({ page }) => {
        const accountPage = new AccountPage(page);
        await accountPage.logout();
        
        await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
        await expect(page.getByText('Вход')).toBeVisible();
        await expect(page.getByText('Еще не зарегистрированы ?')).toBeVisible();
    });
});
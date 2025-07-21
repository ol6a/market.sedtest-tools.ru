
import { test, expect, LoginUrl } from '../fixtures/index.ts';
import { generateRandomString, generateValidPhone } from '../utils/helpers';


test.describe('Кабинет, его редаактирование и элементы кабинета', () => {
    let newName: string;
    let newSurname: string;
    newName = generateRandomString(11);
    newSurname = generateRandomString(11);

    test('1. Проверка отображения основных элементов', async ({ accountPage,  authPage, testUser }) => {
        
        await expect(accountPage.myAdsHeader).toBeVisible();
        await expect(accountPage.cabinetHeader).toBeVisible();
        await expect(accountPage.uploadPhotoButton).toBeVisible();
        await expect(accountPage.saveButton).toBeVisible();
        await expect(accountPage.nameInput).toBeVisible();
        await expect(accountPage.surnameInput).toBeVisible();
        await expect(accountPage.phoneInput).toBeVisible();
        await expect(accountPage.emailInput).toBeVisible();
        await expect(accountPage.logoutButton).toBeVisible();
    });

    test('2. Редактирование имени', async ({ accountPage }) => {
       
        await accountPage.updateProfile({ name: newName });
        await expect(accountPage.successMessage).toContainText('Информация сохранена');
        await accountPage.expectProfileData({ name: newName });
        await expect(accountPage.saveButton).toBeVisible();
    });

    test('3. Редактирование фамилии', async ({ accountPage }) => {
        await accountPage.updateProfile({ surname: newSurname });
        await expect(accountPage.successMessage).toHaveText('Информация сохранена');
        await accountPage.expectProfileData({ surname: newSurname });
        await expect(accountPage.saveButton).toBeVisible();
    });

    test('4. Редактирование телефона', async ({ accountPage }) => {
        const newPhone = generateValidPhone();
        await accountPage.updateProfile({ phone: newPhone });
        
        await expect(accountPage.successMessage).toHaveText('Информация сохранена');
        await accountPage.expectProfileData({ phone: newPhone });
        await expect(accountPage.saveButton).toBeVisible();
    });

    test('5. Выход из аккаунта', async ({ accountPage, page }) => {
        await accountPage.logout();
        
        await expect(page).toHaveURL(LoginUrl);
        await expect(page.getByText('Вход')).toBeVisible();
        await expect(page.getByText('Еще не зарегистрированы ?')).toBeVisible();
    });
});
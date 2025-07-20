import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly saveButton: Locator;
    readonly logoutButton: Locator;
    readonly successMessage: Locator;
    readonly phoneError: Locator;
    readonly uploadPhotoButton: Locator;
    readonly myAdsHeader: Locator;
    readonly cabinetHeader: Locator;

    constructor(page: Page) {
        super(page);
        this.nameInput = page.locator('input[name="name"]');
        this.surnameInput = page.locator('input[name="surname"]');
        this.phoneInput = page.locator('input[name="phone"]');
        this.emailInput = page.locator('input[name="email"]');
        this.saveButton = page.getByRole('button', { name: 'Сохранить' });
        this.logoutButton = page.getByRole('button', { name: 'Выход' });
        this.successMessage = page.locator('.MuiAlert-filled');
        this.phoneError = page.getByText('Неверный формат телефона');
        this.uploadPhotoButton = page.getByRole('button', { name: 'Загрузить фото' });
        this.myAdsHeader = page.getByText('Мои объявления');
        this.cabinetHeader = page.getByText('Кабинет');
    }

    async updateProfile(data: {
        name?: string;
        surname?: string;
        phone?: string;
    }) {
        if (data.name) {
            await this.nameInput.click();
            await this.nameInput.fill(data.name);
        }
        if (data.surname) {
            await this.surnameInput.click();
            await this.surnameInput.fill(data.surname);
        }
        if (data.phone) {
            await this.phoneInput.click();
            await this.phoneInput.fill(data.phone);
        }
        await this.saveButton.click();
    }

    async logout() {
        await this.cabinetHeader.click();
        await this.logoutButton.click();
        await this.page.waitForURL('**/login');
    }

    async expectProfileData(data: {
        name?: string;
        surname?: string;
        phone?: string;
        email?: string;
    }) {
        if (data.name) await expect(this.nameInput).toHaveValue(data.name);
        if (data.surname) await expect(this.surnameInput).toHaveValue(data.surname);
        if (data.phone) await expect(this.phoneInput).toHaveValue(data.phone);
        if (data.email) await expect(this.emailInput).toHaveValue(data.email);
    }
}
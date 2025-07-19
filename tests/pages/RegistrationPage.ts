import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly nameInput: Locator;
    readonly surnameInput: Locator;
    readonly phoneInput: Locator;
    readonly registerButton: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly nameError: Locator;
    readonly surnameError: Locator;
    readonly phoneError: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByRole('textbox', { name: 'Почта' });
        this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
        this.nameInput = page.getByRole('textbox', { name: 'Имя' });
        this.surnameInput = page.getByRole('textbox', { name: 'Фамилия' });
        this.phoneInput = page.getByRole('textbox', { name: 'Телефон' });
        this.registerButton = page.getByRole('button', { name: 'Зарегестрироватся' });
        this.emailError = page.locator('#\\:r1\\:-helper-text');
        this.passwordError = page.locator('#\\:r2\\:-helper-text');
        this.nameError = page.locator('#\\:r3\\:-helper-text');
        this.surnameError = page.locator('#\\:r4\\:-helper-text');
        this.phoneError = page.locator('#\\:r5\\:-helper-text');
    }

    async register(userData: {
        email: string;
        password: string;
        name: string;
        surname: string;
        phone: string;
    }) {
        if (userData.email) await this.emailInput.fill(userData.email);
        if (userData.password) await this.passwordInput.fill(userData.password);
        if (userData.name) await this.nameInput.fill(userData.name);
        if (userData.surname) await this.surnameInput.fill(userData.surname);
        if (userData.phone) await this.phoneInput.fill(userData.phone);
        await this.registerButton.click();
    }

    async expectEmptyFieldsErrors() {
        await expect(this.emailError).toHaveText('Заполните поле');
        await expect(this.passwordError).toHaveText('Заполните поле');
        await expect(this.nameError).toHaveText('Заполните поле');
        await expect(this.surnameError).toHaveText('Заполните поле');
        await expect(this.phoneError).toHaveText('Заполните поле');
    }
}
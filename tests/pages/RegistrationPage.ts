import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { AccountPage } from './AccountPage';
import { generateRandomEmail, generateRandomString, generateValidPhone } from '../utils/helpers';


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
        //return { userData.email, userData.emailpassword };
    }

    async expectEmptyFieldsErrors() {
        await expect(this.emailError).toHaveText('Заполните поле');
        await expect(this.passwordError).toHaveText('Заполните поле');
        await expect(this.nameError).toHaveText('Заполните поле');
        await expect(this.surnameError).toHaveText('Заполните поле');
        await expect(this.phoneError).toHaveText('Заполните поле');
    }
    
    private generateRandomEmail(): string {
        return `test_${Date.now()}@example.com`;
    }

    private generateRandomPassword(): string {
        return `Password_${Date.now()}`;
    }

    private generateRandomName(): string {
        return `Name_${Date.now()}`;
    }

    private generateRandomSurname(): string {
        return `Surname_${Date.now()}`;
    }

    private generateValidPhone(): string {
        return `+7${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    }
    
    async register2(userData?: {
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
    phone?: string;
}): Promise<{ email: string; password: string }> {
    // Генерируем данные, если они не предоставлены
    const email = userData?.email || this.generateRandomEmail();
    const password = userData?.password || this.generateRandomPassword();
    const name = userData?.name || this.generateRandomName();
    const surname = userData?.surname || this.generateRandomSurname();
    const phone = userData?.phone || this.generateValidPhone();

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.nameInput.fill(name);
    await this.surnameInput.fill(surname);
    await this.phoneInput.fill(phone);
    
    await this.registerButton.click();
    await expect(this.page).toHaveURL('http://market.sedtest-tools.ru/account');

    // Создаем экземпляр AccountPage для выхода
    const accountPage = new AccountPage(this.page);
    await accountPage.logout();
    await expect(this.page).toHaveURL('http://market.sedtest-tools.ru/login');

    // Возвращаем только email и пароль для использования в авторизации
    return { email, password };
}

     
}


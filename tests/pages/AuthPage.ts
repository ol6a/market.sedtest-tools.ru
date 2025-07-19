import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly registerLink: Locator;
    readonly errorMessage: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByRole('textbox', { name: 'Почта' });
        this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
        this.loginButton = page.getByRole('button', { name: 'Войти' });
        this.registerLink = page.getByText('Еще не зарегистрированы ?');
        this.errorMessage = page.getByRole('alert');
        this.emailError = page.locator('#\\:r1\\:-helper-text');
        this.passwordError = page.locator('#\\:r2\\:-helper-text');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async navigateToRegistration() {
        await this.registerLink.click();
        await this.page.waitForURL('**/login');
    }
}
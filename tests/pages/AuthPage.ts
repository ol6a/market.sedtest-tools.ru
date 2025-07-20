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
    readonly helperTextElement1: Locator;
    readonly loginHeader: Locator;
    //readonly BaseUrl = "http://market.sedtest-tools.ru/"

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByRole('textbox', { name: 'Почта' });
        this.passwordInput = page.getByRole('textbox', { name: 'Пароль' });
        this.loginButton = page.locator('button.MuiButton-outlined');
        this.registerLink = page.getByText('Еще не зарегистрированы ?');
        this.errorMessage = page.getByRole('alert');
        this.emailError = page.locator('#\\:r1\\:-helper-text');
        this.passwordError = page.locator('#\\:r2\\:-helper-text');
        this.helperTextElement1 = page.locator('#\\:r1\\:-helper-text');
        this.loginHeader = page.getByRole('button', { name: 'Войти' });
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
    //async navigateToLogin(page, expect, BaseUrl) {
       // await page.goto(BaseUrl);
      //  await this.loginHeader.click();
       // await expect(page.getByText('Вход')).toBeVisible();
      // await page.goto(BaseUrl);
       //await page.getByRole('button', { name: 'Войти' }).click();
      // await expect(page.getByText('Вход')).toBeVisible();
  //  }

        


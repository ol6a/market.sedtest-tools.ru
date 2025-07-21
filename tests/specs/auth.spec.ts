import { AuthPage } from '../pages/AuthPage';
import { test, expect, LoginUrl, BaseUrl, AccountUrl} from '../fixtures';



//test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    
    const authPage = new AuthPage(page);
    
    // Вход на страницу авторизации
    await authPage.navigateTo(BaseUrl);
    await authPage.loginHeader.click();
    await expect(page.getByText('Вход')).toBeVisible();

});

test.describe('Авторизация', () => {
    test('1. Авторизация с корректными данными', async ({ page, authPage, testUser }) => {
         // Добавляем проверку, что мы на странице логина
        await expect(page.getByText('Вход')).toBeVisible();
        
        // Выполняем вход
        await authPage.login(testUser.email, testUser.password);
        
        // Проверяем результат
        await expect(page).toHaveURL(AccountUrl);
        await expect(page.getByText('Кабинет')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('Мои объявления')).toBeVisible({ timeout: 10000 });
    });
    

    test('2. Авторизация с неверным форматом почты', async ({ page, authPage }) => {
        
        await authPage.login('1', '1234567');
        
        await expect(authPage.emailError).toHaveText('Неверный формат почты');
        await expect(authPage.helperTextElement1).toHaveText('Неверный формат почты');
        await expect(page).toHaveURL(LoginUrl);
    });

    test('3. Авторизация с несуществующей почтой', async ({ page, authPage }) => {
        
        await authPage.login('nonexistent@example.com', '1234567');
        
        await expect(authPage.errorMessage).toHaveText('Неправильный логин или пароль');
        await expect(page).toHaveURL(LoginUrl);
        await expect(authPage.loginButton).toBeVisible();
    });

    test('4. Авторизация с незаполненными данными', async ({ page, authPage }) => {
        
        await authPage.loginButton.click();
        
        await expect(authPage.emailError).toHaveText('Заполните поле');
        await expect(authPage.passwordError).toHaveText('Заполните поле');
        await expect(page).toHaveURL(LoginUrl);
    });

    test('5. Авторизация с существующей почтой и неправильным паролем', async ({ page, authPage }) => {
     
        await authPage.login('rm@ex.ru', 'wrongpassword');
        
        await expect(authPage.errorMessage).toHaveText('Неправильный логин или пароль');
        await expect(page).toHaveURL(LoginUrl);
        await expect(authPage.loginButton).toBeVisible();
    });
});
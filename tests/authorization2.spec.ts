import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://market.sedtest-tools.ru/');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByText('Вход')).toBeVisible();
});

test.describe('Авторизация', () => {

test('1. Авторизация с корректными данными', async ({ page }) => {
 //Предварительно регистрируем пользователя
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill('rm@ex.ru');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button').click();
  await expect(page.getByText('Кабинет')).toBeVisible();
  await expect(page.getByText('Мои объявления')).toBeVisible();
  await expect(page.getByTestId('PersonIcon')).toBeVisible();
});

test('2. Авторизация с неверным форматом почты', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill('1');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button').click();
  await expect(page.getByRole('paragraph')).toContainText('Неверный формат почты');
  await expect(page.getByText('Неверный формат почты')).toBeVisible();
  const passwordInput = page.locator('input[name="email"]'); // Найти элемент input для телефона
  const ariaDescribedBy = await passwordInput.getAttribute('aria-describedby'); // Получить значение aria-describedby
  expect(ariaDescribedBy).toBe(':r1:-helper-text');// Убедиться, что значение aria-describedby у элемента  равен :r1:-helper-text
  const helperTextElement1 = page.locator('#\\:r1\\:-helper-text');
  await expect(helperTextElement1).toHaveText('Неверный формат почты');
  await expect(page.getByText('Вход')).toBeVisible();
});

test('3. Авторизация с несуществующей почтой, но верным форматом почты', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill('rm1@ex.ru');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button').click();
  await expect(page.getByText('Неправильный логин или пароль')).toBeVisible();
  await expect(page.getByRole('alert')).toHaveText('Неправильный логин или пароль');
  await expect(page.getByText('Вход')).toBeVisible();
});

test('4. Авторизация с незаполненными данными', async ({ page }) => {
  await page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button').click();
  await expect(page.getByText('Вход')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^ПочтаПочтаЗаполните поле$/ }).getByRole('paragraph')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^ПарольПарольЗаполните поле$/ }).getByRole('paragraph')).toBeVisible();
});

test('5. Авторизация с существующим логином и неправильным паролем', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill('rm1@ex.ru');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234');
  await page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button').click();
  await expect(page.getByText('Неправильный логин или пароль')).toBeVisible();
  await expect(page.getByRole('alert')).toHaveText('Неправильный логин или пароль');
  await expect(page.getByText('Вход')).toBeVisible();
  
});
//  

});
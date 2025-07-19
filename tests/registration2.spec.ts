import { test, expect } from '@playwright/test';


// Функция для генерации случайной почты заданной длины
function generateRandomEmail(): string {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const domain = 'example.com'; // Вы можете изменить домен на нужный вам

    // Генерация длины почты от 10 до 20 символов
    const usernameLength = Math.floor(Math.random() * 10) + 10;
    let username = '';
    for (let i = 0; i < usernameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters[randomIndex];
    }

     return username + '@' + domain;
}
 // Генерация случайного email
    const randomEmail = generateRandomEmail();

    // Заполнение текстового поля сгенерированным email
    
// Функция для генерации случайной строки заданной длины
function generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
// Генерация случайного имени и фамилии из 10 символов
    const randomName = generateRandomString(10);
    const randomSurname = generateRandomString(10);

test.beforeEach(async ({ page }) => {
  await page.goto('http://market.sedtest-tools.ru/login');
  await page.getByText('Еще не зарегистрированы ?').click();
  await expect(page.getByText('Регистрация')).toBeVisible();
    });
// Группа тестов
test.describe('Регистрация', () => {

test('1. Регистрация с паролем длиной 7 символов', async ({ page }) => {
  
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill(randomEmail);  // Заполнение текстового поля сгенерированным email
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Фамилия' }).click();
  await page.getByRole('textbox', { name: 'Фамилия' }).fill(randomSurname);
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+ 7 (921) 123-45-67');
  await page.getByRole('button', { name: 'Зарегестрироватся' }).click();
  await expect(page.getByText('Кабинет')).toBeVisible();
  await expect(page.getByText('Мои объявления')).toBeVisible();
  await expect(page.getByText('Объявлений нет')).toBeVisible();
  await expect(page.getByText('Активные (0)', { exact: true })).toBeVisible();
  await expect(page.getByText('Не активные (0)')).toBeVisible();
  await expect(page.getByText('Отклоненные (0)')).toBeVisible();
  await expect(page.getByText('Проданные (0)')).toBeVisible();
});

test('2. Регистрация с длиной пароля 6 символов', async ({ page }) => {
  
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill(randomEmail);  // Заполнение текстового поля сгенерированным email
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('123456');
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Фамилия' }).click();
  await page.getByRole('textbox', { name: 'Фамилия' }).fill(randomSurname);
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+ 7 (921) 123-45-67');
  await page.getByRole('button', { name: 'Зарегестрироватся' }).click();
  await expect(page.getByRole('paragraph')).toHaveText('Мин.длинна - 7 символов');
  await expect(page.getByText('Мин.длинна - 7 символов')).toBeVisible();
  const passwordInput = page.locator('input[name="password"]'); // Найти элемент input для пароля
  const ariaDescribedBy = await passwordInput.getAttribute('aria-describedby'); // Получить значение aria-describedby
  expect(ariaDescribedBy).toBe(':r2:-helper-text');// Убедиться, что значение aria-describedby у элемента пароль равен :r2:-helper-text
  const helperTextElement = page.locator('[id=":r2:-helper-text"]');// второй вариант написания локатора - с экранированием #\\:r2\\:-helper-text
  await expect(helperTextElement).toHaveText('Мин.длинна - 7 символов'); 
  await expect(page.getByText('Регистрация')).toBeVisible();
  //const paragraph = page.getByRole('paragraph');
  //await expect(paragraph).toContainText('Мин.длинна - 7 символов');
  //await expect(page.getByRole('paragraph')).toContainText('Мин.длинна - 7 символов');
});

test('3. Не заполнены данные', async ({ page }) => {
  await page.goto('http://market.sedtest-tools.ru/login');
  await page.getByText('Еще не зарегистрированы ?').click();
  await expect(page.getByText('Регистрация')).toBeVisible();
  await page.getByRole('button', { name: 'Зарегестрироватся' }).click();
  const helperTextElement1 = page.locator('#\\:r1\\:-helper-text');
  const helperTextElement2 = page.locator('#\\:r2\\:-helper-text');
  const helperTextElement3 = page.locator('#\\:r3\\:-helper-text');
  const helperTextElement4 = page.locator('#\\:r4\\:-helper-text');
  const helperTextElement5 = page.locator('#\\:r5\\:-helper-text');
  await expect(helperTextElement1).toHaveText('Заполните поле');
  await expect(helperTextElement2).toHaveText('Заполните поле');
  await expect(helperTextElement3).toHaveText('Заполните поле');
  await expect(helperTextElement4).toHaveText('Заполните поле');
  await expect(helperTextElement5).toHaveText('Заполните поле');
});

test('4. Регистрация с неверным форматом почты', async ({ page }) => {
  
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill("ivanov");  
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Фамилия' }).click();
  await page.getByRole('textbox', { name: 'Фамилия' }).fill(randomSurname);
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+ 7 (921) 123-45-67');
  await page.getByRole('button', { name: 'Зарегестрироватся' }).click();
  await expect(page.getByText('Неверный формат почты')).toBeVisible();
  const passwordInput = page.locator('input[name="email"]'); // Найти элемент input для почты
  const ariaDescribedBy = await passwordInput.getAttribute('aria-describedby'); // Получить значение aria-describedby
  expect(ariaDescribedBy).toBe(':r1:-helper-text');// Убедиться, что значение атрибута aria-describedby у элемента почты равен :r1:-helper-text
  const helperTextElement1 = page.locator('#\\:r1\\:-helper-text');
  await expect(helperTextElement1).toHaveText('Неверный формат почты');
  await expect(page.getByText('Регистрация')).toBeVisible();
});

test('5. Регистрация с неверным форматом телефона', async ({ page }) => {
  
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill(randomEmail);  // Заполнение текстового поля сгенерированным email
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Фамилия' }).click();
  await page.getByRole('textbox', { name: 'Фамилия' }).fill(randomSurname);
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+ 7 (1)'); //заполняем некорректным значением
  await page.getByRole('button', { name: 'Зарегестрироватся' }).click();
  await expect(page.getByText('Неверный формат телефона')).toBeVisible();
  const passwordInput = page.locator('input[name="phone"]'); // Найти элемент input для телефона
  const ariaDescribedBy = await passwordInput.getAttribute('aria-describedby'); // Получить значение aria-describedby
  expect(ariaDescribedBy).toBe(':r5:-helper-text');// Убедиться, что значение aria-describedby у элемента равен :r5:-helper-text
  const helperTextElement1 = page.locator('#\\:r5\\:-helper-text');
  await expect(helperTextElement1).toHaveText('Неверный формат телефона');
  await expect(page.getByText('Регистрация')).toBeVisible();
});

});
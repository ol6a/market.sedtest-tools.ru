import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://market.sedtest-tools.ru/');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.getByText('Вход')).toBeVisible();
  await page.getByRole('textbox', { name: 'Почта' }).click();
  await page.getByRole('textbox', { name: 'Почта' }).fill('rm@ex.ru');
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill('1234567');
  await page.locator('div').filter({ hasText: /^ВходПочтаПочтаПарольПарольВойти Еще не зарегистрированы \?$/ }).getByRole('button').click();
  await page.getByText('Кабинет').click();
  await expect(page.getByText('Кабинет')).toBeVisible();
  
});

test.describe('Редактирование кабинета', () => {

test('1. Проверка отображения основных элементов страницы', async ({ page }) => {
  // 1. Проверяем заголовок страницы Мои объявления
  await expect(page.getByText('Мои объявления')).toBeVisible();
  
  // 2. Проверяем наличие кнопки загрузки фото
  await expect(page.getByRole('button', { name: 'Загрузить фото' })).toBeVisible();
  
  // 3. Проверяем наличие полей формы
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="surname"]')).toBeVisible();
  await expect(page.locator('input[name="phone"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  // 3. Проверяем наличие кнопки Сохранить
  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible();
  // 4. Проверяем наличие кнопки Выхода
  await expect(page.getByRole('button', { name: 'Выход' })).toBeVisible();
});

test('2. Редактирование имени', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill('Иван');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await expect(page.getByRole('alert')).toContainText('Информация сохранена');//Проверяем, что отображается сообщение Информация сохранена
  await expect(page.getByText('Иван')).toBeVisible();// Проверяем , что элемент с локатором с текстом Иван отображается
  const nameInput = page.locator('input[name="name"]'); // Найти элемент input для имени
  const vanueName = await nameInput.getAttribute('value');
  expect(vanueName).toBe('Иван'); 
});

test('3. Проверка валидации поля "Телефон"', async ({ page }) => {
 
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+ 7 (123) 45__-__-__'); // 1. Вводим невалидный номер телефона
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await expect(page.getByText('Неверный формат телефона')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText('Неверный формат телефона');
});

test('4. Проверка сохранения данных формы (в тесте меняем все даннные кроме почты', async ({ page }) => {
  // Тестовые данные
  const testData = {
    name: 'Валерий',
    surname: 'Артемьев',
    phone: '+ 7 (931) 123-45-67',
  };

  // 1. Заполняем форму валидными данными
  
  await page.getByRole('textbox', { name: 'Имя' }).click();
  await page.getByRole('textbox', { name: 'Имя' }).fill(testData.name);
  await page.getByRole('textbox', { name: 'Фамилия' }).click();
  await page.getByRole('textbox', { name: 'Фамилия' }).fill(testData.surname);
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill('+ 7 (__) ___-__-__');
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill(testData.phone);
  await page.getByRole('textbox', { name: 'Телефон' }).click();
  await page.getByRole('textbox', { name: 'Телефон' }).fill(testData.phone);
  await page.getByRole('button', { name: 'Сохранить' }).click();


  // 2. Проверяем сообщение об успешном сохранении
  await expect(page.locator('.MuiAlert-filled')).toHaveText('Информация сохранена');

  // Дополнительные проверки сохраненных данных (новые точки контроля)
  
  // 3. Проверяем, что имя сохранилось
;
  const nameInput = page.locator('input[name="name"]'); // Найти элемент input 
  const namevalue = await nameInput.getAttribute('value'); 
  expect(namevalue).toBe(testData.name);

  
  // 4. Проверяем, что фамилия сохранилась и отображается
  const surnameInput = page.locator('input[name="surname"]'); // Найти элемент input 
  const surnamevalue = await surnameInput.getAttribute('value'); 
  expect(surnamevalue).toBe(testData.surname);
  
  // 5. Проверяем, что телефон сохранился и отображается
  const phoneInput = page.locator('input[name="phone"]'); // Найти элемент input 
  const phonevalue = await phoneInput.getAttribute('value'); 
  expect(phonevalue).toBe(testData.phone);
  
});

test('5. Проверка кнопки выхода из аккаунта', async ({ page }) => {
  await page.getByRole('button', { name: 'Выход' }).click();
  //  Проверяем, что произошел переход на главную страницу
  await expect(page).toHaveURL('http://market.sedtest-tools.ru/login');
  await expect(page.getByText('Вход')).toBeVisible();
  await expect(page.getByText('Еще не зарегистрированы ?')).toBeVisible();
});

});
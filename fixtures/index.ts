import { test as base } from '@playwright/test';
import type { AuthPage } from '../pages/AuthPage';
import type { RegistrationPage } from '../pages/RegistrationPage';
import type { AccountPage } from '../pages/AccountPage';

import { authFixtures } from './auth.fixture';
import { registrationFixtures } from './registration.fixture';
import { accountFixtures } from './account.fixture';
import { userFixtures } from './user.fixture';

// Типизация всех фикстур
type MyFixtures = {
    authPage: AuthPage;
    registrationPage: RegistrationPage;
    accountPage: AccountPage;
    testUser: { email: string; password: string };
};

// Экспортируемые константы URL
export const BaseUrl = "http://market.sedtest-tools.ru/";
export const LoginUrl = 'http://market.sedtest-tools.ru/login';
export const AccountUrl = "http://market.sedtest-tools.ru/account";

// Объединение всех фикстур
export const test = base
    .extend<MyFixtures>(authFixtures)
    .extend(registrationFixtures)
    .extend(accountFixtures)
    .extend(userFixtures);

export { expect } from '@playwright/test';
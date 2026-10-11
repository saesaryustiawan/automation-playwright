import { expect, test } from '@playwright/test';
import { users } from '../../data/users';
import { applicationPaths, invalidLoginScenarios } from '../../data/test-data';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', { tag: '@regression' }, () => {
  test('allows a standard user to log in', { tag: '@smoke' }, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(applicationPaths.products);
  });

  for (const scenario of invalidLoginScenarios) {
    test(`shows a helpful error for ${scenario.title}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.navigate();
      await loginPage.login(scenario.username, scenario.password);

      await expect(loginPage.errorMessage).toContainText(scenario.expectedError);
    });
  }
});

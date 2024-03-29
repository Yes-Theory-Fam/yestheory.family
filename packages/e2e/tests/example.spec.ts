import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Yes Theory Family/);

  await page.getByRole('button', {name: 'Accept'}).click();
  await expect(page.getByText('Dive in')).toBeVisible();
});

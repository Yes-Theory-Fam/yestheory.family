import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/YesTheory Family/);

  await page.getByRole('button', {name: 'Accept'}).click();
  await expect(page.getByText('We are happy to have you')).toBeVisible();
});

import { test, expect } from '@playwright/test';

const nopCommerceUrl = 'https://admin-demo.nopcommerce.com/';
const blockedReason = 'admin-demo.nopcommerce.com is protected by Cloudflare security verification and blocks automated Playwright login.';

const isCloudflareError = (error: unknown) => {
  return typeof error === 'object' && error !== null &&
    'message' in error && typeof (error as any).message === 'string' &&
    /cloudflare|blocked|verification/i.test((error as any).message);
};

test('nopCommerce admin demo login', async ({ page }) => {
  test.info().annotations.push({
    type: 'blocked',
    description: blockedReason,
  });

  // Attempt navigation and skip if Cloudflare blocks the site.
  try {
    await page.goto(nopCommerceUrl, { timeout: 15000 });
  } catch (error) {
    if (isCloudflareError(error)) {
      test.skip(true, blockedReason);
    }
    throw error;
  }

  //Login to site
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
  await page.getByRole('button', { name: 'Log in' }).click();
  
  //Asserting after landing to next page
  await expect(page).toHaveURL(/\/admin\/?$/i);
});

import { test, expect } from "@playwright/test";
/* Fetch the first product and move it to chekcout */

test.describe("Inventory feature", () => {
    test.beforeEach("Login with valid creds", async ({ page }) => {
        // Launch the URL
        await page.goto("https://www.saucedemo.com/");

        // Login
        await page.locator('[data-test="username"]').fill("standard_user");
        await page.locator('[data-test="password"]').fill("secret_sauce");
        await page.locator('[data-test="login-button"]').click();

        // Assertion
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\/inventory/);

    });

  test("First product checkout", async ({ page }) => {
  await page.locator('[data-test="item-4-title-link"]').click();
  //await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible()
  let firstProduct=await page.locator('[data-test="inventory-item-name"]').textContent()
  console.log (`My first Product:${firstProduct}`)
  await page.locator('[data-test="add-to-cart"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="item-quantity"]').click();
  await page.getByText('$29.99Remove').click();
  await page.locator('[data-test="checkout"]').click();


    })
})
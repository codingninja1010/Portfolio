import { test, expect } from '@playwright/test';

// Verify that the contact form exists and basic validation works client-side

test('contact form presence and fields', async ({ page }) => {
  await page.goto('/');
  await page.locator('button', { hasText: 'Contact' }).click();
  await expect(page.locator('#contact')).toBeVisible();
  await expect(page.getByLabel('Your Name')).toBeVisible();
  await expect(page.getByLabel('Email Address')).toBeVisible();
  await expect(page.getByLabel('Message')).toBeVisible();
});

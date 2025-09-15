import { test, expect } from '@playwright/test';

// Basic homepage smoke test and navigation interactions

test('home loads and shows key sections', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Portfolio|Rakesh/i);
  await expect(page.getByText(/Featured Projects/i)).toBeVisible();
  await expect(page.getByText(/Let's Connect/i)).toBeVisible();
});

test('navigation scrolls to sections (desktop)', async ({ page }) => {
  await page.goto('/');
  const aboutBtn = page.getByRole('button', { name: 'About' });
  await aboutBtn.click();
  // section heading becomes visible
  await expect(page.locator('#about')).toBeVisible();
});

// Responsive check
for (const size of [
  { w: 375, h: 812 },
  { w: 768, h: 1024 },
  { w: 1280, h: 800 },
]) {
  test(`home responsive ${size.w}x${size.h}`, async ({ page }) => {
    await page.setViewportSize({ width: size.w, height: size.h });
    await page.goto('/');
    await expect(page.getByText(/Featured Projects/i)).toBeVisible();
  });
}

import { test, expect } from '@playwright/test';

test.describe('Bài viết', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
    });

    test('should display and click the "Bài viết" navbar link', async ({ page }) => {
      await page.getByRole('link', { name: 'Bài viết' }).click();
      await expect(page).toHaveURL('http://localhost:3000/list-news');
      await expect(page).toHaveTitle('Danh sách bài viết | Khoảng Trời Của Bé');
    });

    test('should display focus effect on "Bài viết" navbar link', async ({ page }) => {
      const baiVietLink = page.getByRole('link', { name: 'Bài viết' });
      await baiVietLink.focus();
      await expect(baiVietLink).toHaveCSS('border-color', 'rgb(229, 231, 235)');
    });
  });
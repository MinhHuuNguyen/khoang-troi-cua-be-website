import { test, expect } from '@playwright/test';

test.describe('Giới thiệu', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
    });

    test('should display and click the "Giới thiệu" navbar link', async ({ page }) => {
      await page.getByRole('link', { name: 'Giới thiệu' }).click();
      await expect(page).toHaveURL('http://localhost:3000/khoang-troi-cua-be');
      await expect(page).toHaveTitle('Khoảng Trời Của Bé - Bước lên phi thuyền, bay tới tương lai | Khoảng Trời Của Bé');
    });

    test('should display focus effect on "Giới thiệu" navbar link', async ({ page }) => {
      const baiVietLink = page.getByRole('link', { name: 'Giới thiệu' });
      await baiVietLink.focus();
      // Kiểm tra hiệu ứng focus, ví dụ: thay đổi border
      await expect(baiVietLink).toHaveCSS('border-color', 'rgb(229, 231, 235)'); // Thay đổi giá trị border theo yêu cầu
    });
  });
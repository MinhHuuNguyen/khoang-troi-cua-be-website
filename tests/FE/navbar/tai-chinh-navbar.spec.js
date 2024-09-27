import { test, expect } from '@playwright/test';

test.describe('Tài chính', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
    });

    test('should display focus effect on "Tài chính" navbar link', async ({ page }) => {
      const baiVietLink = page.getByRole('link', { name: 'Tài chính' });
      await baiVietLink.focus();
      // Kiểm tra hiệu ứng focus, ví dụ: thay đổi border
      await expect(baiVietLink).toHaveCSS('border-color', 'rgb(229, 231, 235)'); // Thay đổi giá trị border theo yêu cầu
    });
  
    test('should display and click the "Tài chính" navbar link and its "Báo cáo thu chi" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Tài chính');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Báo cáo thu chi' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/list-news?team=quy-ktcb');
      await expect(page).toHaveTitle('Danh sách bài viết | Khoảng Trời Của Bé');
    });
  
    test('should display and click the "Tài chính" navbar link and its "Sao kê tổng hợp theo tháng" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Tài chính');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Sao kê tổng hợp theo tháng' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/sao-ke-tai-khoan-ngan-hang');
      await expect(page).toHaveTitle('Sao kê tài khoản ngân hàng | Khoảng Trời Của Bé');
    });
  });
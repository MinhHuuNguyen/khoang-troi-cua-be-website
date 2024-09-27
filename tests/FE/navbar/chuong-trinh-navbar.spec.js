import { test, expect } from '@playwright/test';

test.describe('Chương trình', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
    });

    test('should display and click the "Chương trình" navbar link and its "Dự án cùng bé trải nghiệm" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Chương trình');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Dự án Cùng Bé Trải Nghiệm' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/teams/cung-be-trai-nghiem');
      await expect(page).toHaveTitle('Khoảng Trời Của Bé | Khoảng Trời Của Bé');
    });

    test('should display focus effect on "Chương trình" navbar link', async ({ page }) => {
      const chuongTrinhLink = page.getByRole('link', { name: 'Chương trình', exact: true });
      await chuongTrinhLink.focus();
      await expect(chuongTrinhLink).toHaveCSS('border-color', 'rgb(229, 231, 235)'); 
    });
  
    test('should display and click the "Chương trình" navbar link and its "Dự án kiến trúc sư tình nguyện" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Chương trình');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Dự án Kiến Trúc Sư Tình Nguyện' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/teams/kien-truc-su-tinh-nguyen');
      await expect(page).toHaveTitle('Khoảng Trời Của Bé | Khoảng Trời Của Bé');
    });
  
    test('should display and click the "Chương trình" navbar link and its "Các chương trình khác" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Chương trình');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Các chương trình khác' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/list-news?team=noi-dung');
      await expect(page).toHaveTitle('Danh sách bài viết | Khoảng Trời Của Bé');
    });
  });
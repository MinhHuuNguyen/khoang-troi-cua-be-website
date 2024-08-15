import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000');
    });

    test('should display focus effect on "Tham gia" navbar link', async ({ page }) => {
      const baiVietLink = page.getByRole('link', { name: 'Tham gia', exact: true });
      await baiVietLink.focus();
      await expect(baiVietLink).toHaveCSS('border-color', 'rgb(229, 231, 235)'); 
    });

    test('should display and click the "Tham gia" navbar link and its "Thành viên" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Tham gia');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Thành viên' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/member-registration');
      await expect(page).toHaveTitle('Đăng ký thành viên | Khoảng Trời Của Bé');
    });
  
    test('should display and click the "Tham gia" navbar link and its "Nhà hảo tâm" submenu', async ({ page }) => {
      // Hover over the "Tham gia" link to reveal the submenu
      await page.hover('text=Tham gia');
    
      // Verify the submenu is visible
      const submenuLink = page.getByRole('link', { name: 'Nhà hảo tâm' });
      await expect(submenuLink).toBeVisible();
    
      // Click the submenu link
      await submenuLink.click();
    
      // Verify the URL and title after clicking the submenu link
      await expect(page).toHaveURL('http://localhost:3000/donor-registration');
      await expect(page).toHaveTitle('Đăng ký nhà hảo tâm | Khoảng Trời Của Bé');
    });
  });
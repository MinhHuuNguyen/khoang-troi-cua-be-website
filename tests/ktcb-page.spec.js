import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Khoảng Trời Của Bé | Khoảng Trời Của Bé');
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

  test('should display and click the "Bài viết" navbar link', async ({ page }) => {
    await page.getByRole('link', { name: 'Bài viết' }).click();
    await expect(page).toHaveURL('http://localhost:3000/list-news');
    await expect(page).toHaveTitle('Danh sách bài viết | Khoảng Trời Của Bé');
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

test.describe('Member Registration', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/member-registration'); // Adjust the URL as needed
    });
  
    test('should submit the form and show success toast', async ({ page }) => {
      // Fill out the form
      await page.getByPlaceholder('Nhập họ và tên').fill('John Doe');
      await page.getByPlaceholder('Nhập số điện thoại').fill('0123456789');
      await page.getByPlaceholder('Nhập email').fill('johndoe@gmail.com');
      await page.getByPlaceholder('Nhập nơi làm việc').fill('123 Main St');
      await page.getByPlaceholder('Nhập khu vực đang sinh sống').fill('Ha Noi');

      // Submit the form
      await page.click('button:has-text("Gửi thông tin")');
    });
  });
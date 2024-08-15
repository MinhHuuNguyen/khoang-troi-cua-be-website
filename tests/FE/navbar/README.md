# Navbar Test Logic Explanation
This section explains the logic behind the tests for the navbar component.

## Test Structure

Each test file for the navbar follows a similar structure:

1. **Setup**: Navigate to the homepage before each test.
2. **Hover**: Hover over the main navbar link to reveal the submenu.
3. **Verify Visibility**: Check if the submenu link is visible.
4. **Click**: Click the submenu link.
5. **Verify URL and Title**: Verify that the URL and title are correct after clicking the submenu link.

# Example Test: "Tham gia" Navbar Link

Here is an example test from the [`tests/FE/navbar/tham-gia-navbar.spec.js`] file:

```javascript
import { test, expect } from '@playwright/test';

test.describe('Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display and click the "Tham gia" navbar link and its "Thành viên" submenu', async ({ page }) => {
    await page.hover('text=Tham gia');
    const submenuLink = page.getByRole('link', { name: 'Thành viên' });
    await expect(submenuLink).toBeVisible();
    await submenuLink.click();
    await expect(page).toHaveURL('http://localhost:3000/member-registration');
    await expect(page).toHaveTitle('Đăng ký thành viên | Khoảng Trời Của Bé');
  });

  test('should display and click the "Tham gia" navbar link and its "Nhà hảo tâm" submenu', async ({ page }) => {
    await page.hover('text=Tham gia');
    const submenuLink = page.getByRole('link', { name: 'Nhà hảo tâm' });
    await expect(submenuLink).toBeVisible();
    await submenuLink.click();
    await expect(page).toHaveURL('http://localhost:3000/donor-registration');
    await expect(page).toHaveTitle('Đăng ký nhà hảo tâm | Khoảng Trời Của Bé');
  });
});

#Step-by-Step Explanation
1. Setup:
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

This code navigates to the homepage before each test.

2. Hover:
await page.hover('text=Tham gia');

This code hovers over the "Tham gia" navbar link to reaveal the submenu.

3. Verify Visibility:
const submenuLink = page.getByRole('link', { name: 'Thành viên' });
await expect(submenuLink).toBeVisible();

This code will check the "Thành viên" submenu link is visible.

4. Click:
await submenuLink.click();

This code clicks the "Thành viên" submenu link.

5. Verify URL and Title:
await expect(page).toHaveURL('http://localhost:3000/member-registration');
await expect(page).toHaveTitle('Đăng ký thành viên | Khoảng Trời Của Bé');

This code verifies that the URL and title are correct after clicking the submenu link.


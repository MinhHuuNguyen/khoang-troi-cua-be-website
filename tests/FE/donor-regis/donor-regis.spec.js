import { test, expect } from "@playwright/test";
import { MemberRegistrationInputSchema } from "@/components/features/member-registration/types";

test.describe("Donor Registration Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/donor-registration");
  });

  test('should navigate to donor registration page when "Trở thành nhà hảo tâm" button is clicked', async ({ page }) => {
    const donorButton = page.locator('button:has-text("Trở thành thành viên")');
    await expect(donorButton).toBeVisible();
    await donorButton.click();
    await expect(page).toHaveURL("http://localhost:3000/member-registration");

    // Navigate back to donor registration page
    const memberButton = page.locator('button:has-text("Trở thành nhà hảo tâm")');
    await expect(memberButton).toBeVisible();
    await memberButton.click();
    await expect(page).toHaveURL("http://localhost:3000/donor-registration");
  });

  test('should show validation errors for empty required fields', async ({ page }) => {
    // Submit the form without filling required fields
    const submitButton = page.locator('button:has-text("Gửi thông tin")');
    await submitButton.click();

    // Check for validation errors
    await expect(page.locator('text=Không được để trống')).toHaveCount(4); // Adjust the count based on the number of required fields
  });

  test('should show validation error for invalid email format', async ({ page }) => {
    // Fill out the email field with invalid format
    await page.fill('input[placeholder="Nhập email"]', 'invalid-email');
    const submitButton = page.locator('button:has-text("Gửi thông tin")');
    await submitButton.click();

    // Check for validation error
    await expect(page.locator('text=Email không hợp lệ')).toBeVisible();
  });

  test('should show validation error for invalid phone number format', async ({ page }) => {
    // Fill out the phone number field with invalid format
    await page.fill('input[placeholder="Nhập số điện thoại"]', '123124124');
    const submitButton = page.locator('button:has-text("Gửi thông tin")');
    await submitButton.click();

    // Check for validation error
    await expect(page.locator('text=Số điện thoại không hợp lệ')).toBeVisible();
  });

  test('should show validation error for phone number exceeding 11 characters', async ({ page }) => {
    // Fill out the phone number field with more than 11 characters
    await page.fill('input[placeholder="Nhập số điện thoại"]', '123456789012');
    const submitButton = page.locator('button:has-text("Gửi thông tin")');
    await submitButton.click();

    // Check for validation error
    await expect(page.locator('text=Số điện thoại không được để trống và không được quá 11 ký tự')).toBeVisible();
  });

  test('should close the modal without confirming', async ({ page }) => {
    await page.fill('input[placeholder="Nhập họ và tên"]', 'John Doe');
    await page.fill('input[placeholder="Nhập số điện thoại"]', '0912345678');
    await page.fill('input[placeholder="Nhập email"]', 'john.doe@example.com');
    await page.getByLabel("Tiền").check();
    const submitButton = page.locator('button:has-text("Gửi thông tin")');
    await submitButton.click();

    await expect(page.locator('text=Xác nhận thành công')).not.toBeVisible();
  });

  test('should show success modal when form is submitted with valid data', async ({ page }) => {
    await page.fill('input[placeholder="Nhập họ và tên"]', 'John Doe');
    await page.fill('input[placeholder="Nhập số điện thoại"]', '0912345678');
    await page.fill('input[placeholder="Nhập email"]', 'john.doe@example.com');
    await page.getByLabel("Tiền").check();
    const submitButton = page.locator('button:has-text("Gửi thông tin")');
    await submitButton.click();
  });
});
import { test, expect } from '@playwright/test';
import footerData from '../../../src/utils/data/json/footer.json';

test.describe('Footer component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page where the Footer component is rendered
    await page.goto('http://localhost:3000'); // Adjust the URL as needed
  });

  test('should display logo and navigate to homepage on click', async ({ page }) => {
    // Check if the logo image is present
    const logoImage = await page.locator('img[alt="logoNoBackground"]');
    await expect(logoImage).toBeVisible();

    // Click the logo image
    await logoImage.click();

    // Verify that the page navigates to the homepage
    await expect(page).toHaveURL('http://localhost:3000/'); // Adjust the URL as needed
  });

  test('should display social media icons and navigate on click', async ({ page, context }) => {
    // Function to handle new tab and verify URL
    const verifyNewTab = async (iconLocator, expectedUrl) => {
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        iconLocator.click(),
      ]);
      await newPage.waitForLoadState();
      await expect(newPage).toHaveURL(expectedUrl);
      await newPage.close();
    };

    // Check if the Facebook icon is present and clickable
    const facebookIcon = await page.locator('a[href="' + footerData.facebookLink + '"]');
    await expect(facebookIcon).toBeVisible();
    await verifyNewTab(facebookIcon, footerData.facebookLink);

    // Check if the YouTube icon is present and clickable
    const youtubeIcon = await page.locator('a[href="' + footerData.youtubeLink + '"]');
    await expect(youtubeIcon).toBeVisible();
    await verifyNewTab(youtubeIcon, footerData.youtubeLink);

    // Check if the TikTok icon is present and clickable
    const tiktokIcon = await page.locator('a[href="' + footerData.tiktokLink + '"]');
    await expect(tiktokIcon).toBeVisible();
    await verifyNewTab(tiktokIcon, footerData.tiktokLink);
  });
});
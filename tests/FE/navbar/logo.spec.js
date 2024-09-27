const { test, expect } = require("@playwright/test");

test("should display logo KTCB and navigate to homepage on click", async ({
  page,
}) => {
  // Navigate to the page where the Header component is rendered
  await page.goto("http://localhost:3000"); // Adjust the URL as needed

  // Check if the logo image is present
  const logoImage = await page.locator('img[alt="logoNoBackground"]');
  await expect(logoImage).toBeVisible();

  // Click on the logo image
  await logoImage.click();
  await expect(page).toHaveURL("http://localhost:3000");
});

import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Khoảng Trời Của Bé | Khoảng Trời Của Bé");
  });

  test('should display and click the "Xem thêm" button', async ({ page }) => {
    // Verify the "Xem thêm" button is visible
    const loadMoreButton = page.locator('button:has-text("Xem thêm")');
    await expect(loadMoreButton).toBeVisible();

    // Click the "Xem thêm" button
    await loadMoreButton.click();

    // Add a delay to wait for the content to load
    await page.waitForTimeout(2000);
  });

  test("should display the CoverImageSlide component", async ({ page }) => {
    // Verify the CoverImageSlide component is visible
    const coverImageSlide = page.locator(".alice-carousel");
    await expect(coverImageSlide).toBeVisible();
  });

  test("should display the next button in CoverImageSlide", async ({
    page,
  }) => {
    // Verify the next button is visible
    const nextButton = page.locator(
      'button:has(svg[data-testid="ArrowForwardIosIcon"])'
    );
    await expect(nextButton).toBeVisible();
  });

  test("should display the prev button in CoverImageSlide", async ({
    page,
  }) => {
    // Verify the prev button is visible
    const prevButton = page.locator(
      'button:has(svg[data-testid="ArrowBackIosNewIcon"])'
    );
    await expect(prevButton).toBeVisible();
  });

  test("should click the next button in CoverImageSlide", async ({ page }) => {
    // Click the next button
    const nextButton = page.locator(
      'button:has(svg[data-testid="ArrowForwardIosIcon"])'
    );
    await nextButton.click();

    // Add a delay to wait for the slide to change
    await page.waitForTimeout(1000);
  });

  test("should click the prev button in CoverImageSlide", async ({ page }) => {
    // Click the prev button
    const prevButton = page.locator(
      'button:has(svg[data-testid="ArrowBackIosNewIcon"])'
    );
    await prevButton.click();

    // Add a delay to wait for the slide to change
    await page.waitForTimeout(1000);
  });

  test('should display the "TIN TỨC GẦN ĐÂY" section', async ({ page }) => {
    // Verify the "TIN TỨC GẦN ĐÂY" section is visible
    const newsSection = page.locator("text=TIN TỨC GẦN ĐÂY");
    await expect(newsSection).toBeVisible();
  });

  test('should display article details when clicking "Đọc tiếp" button', async ({
    page,
  }) => {
    // Verify the news articles are visible
    const newsArticles = page.locator(
      'section:has-text("TIN TỨC GẦN ĐÂY") article'
    );
    if ((await newsArticles.count()) > 0) {
      // Click the "Đọc tiếp" button of the first article
      await newsArticles.first().locator('button:has-text("Đọc tiếp")').click();

      // Wait for the article details page to load
      await page.waitForLoadState("networkidle");

      // Verify that the article details page is displayed
      const articleTitle = page.locator("h1.article-title"); // Adjust the selector as needed
      await expect(articleTitle).toBeVisible();
    }
  });

  test('should display the "KHO ẢNH KỶ NIỆM" title and NewsLoadMore component', async ({
    page,
  }) => {
    // Verify the title is visible
    const title = page.locator("h3", { hasText: "KHO ẢNH KỶ NIỆM" });
    await expect(title).toBeVisible();

    // Verify the NewsLoadMore component is visible
    const newsLoadMore = page.locator('button:has-text("Xem thêm")'); // Adjust the selector if needed
    await expect(newsLoadMore).toBeVisible();

    // Locate the first image in the NewsLoadMore component
    const firstImage = page.locator('.MuiContainer-root > .MuiStack-root > div > div > div > .MuiBox-root').first(); // Adjust the selector as needed
    await expect(firstImage).toBeVisible();

    // Click the first image
    await firstImage.click();
    await expect(page.locator('.MuiModal-root > div:nth-child(3) > div').first()).toBeVisible();

    // Click the "Đọc tiếp" button
    const readMoreButton = page.getByRole('link', { name: 'Đọc tiếp' }); // Adjust the selector if needed
    await expect(readMoreButton).toBeVisible();
    await readMoreButton.click();
  });

  test("should navigate to member registration when clicking the first button in Opportunity", async ({
    page,
  }) => {
    // Locate the Opportunity button with the text from opportunityData.button1
    const opportunityButton = page.locator(
      `button:has-text("Trở thành thành viên")`
    ); // Adjust the text as needed
    await expect(opportunityButton).toBeVisible();

    // Click the button
    await opportunityButton.click();

    // Verify that the URL has changed to "/member-registration"
    await expect(page).toHaveURL("http://localhost:3000/member-registration");
  });

  test("should navigate to donor registration when clicking the second button in Opportunity", async ({
    page,
  }) => {
    // Locate the Opportunity button with the text from opportunityData.button1
    const opportunityButton = page.locator(
      `button:has-text("Trở thành nhà hảo tâm")`
    ); // Adjust the text as needed
    await expect(opportunityButton).toBeVisible();

    // Click the button
    await opportunityButton.click();

    // Verify that the URL has changed to "/member-registration"
    await expect(page).toHaveURL("http://localhost:3000/donor-registration");
  });
});
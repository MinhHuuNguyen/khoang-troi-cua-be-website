import { test, expect } from '@playwright/test';

test.describe('Highlight News', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/list-news'); // Adjust the URL as needed
    });
  
    test('should display the highlight news', async ({ page }) => {
      // Verify the SEO title
      await expect(page).toHaveTitle(/Danh sách bài viết/);
  
      // Verify the HighlightNews section
      const highlightNews = page.locator('section.highlight-news');
      if (await highlightNews.count() > 0) {
        await expect(highlightNews).toBeVisible();
      }
    });

    test('should display article details when clicking "Đọc tiếp" button', async ({ page }) => {
      // Verify the medium news articles
      const highlightNewsArticles = page.locator('section.highlight-news article');
      if (await highlightNewsArticles.count() > 0) {
        // Click the "Đọc tiếp" button of the first article
        await highlightNewsArticles.first().locator('button:has-text("Đọc tiếp")').click();
    
        // Wait for the article details page to load
        await page.waitForLoadState('networkidle');
    
        // Verify that the article details page is displayed
        const articleTitle = page.locator('h1.article-title'); // Điều chỉnh selector nếu cần
        await expect(articleTitle).toBeVisible();
      }
    });
  });
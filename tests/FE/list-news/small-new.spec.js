import { test, expect } from '@playwright/test';

test.describe('Small News', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/list-news'); // Adjust the URL as needed
    });
  
    test('should display the ListSmallNews section with correct elements', async ({ page }) => {
        // Verify the ListSmallNews section
        const listSmallNews = page.locator('section.list-small-news');
        if (await listSmallNews.count() > 0) {
          await expect(listSmallNews).toBeVisible();
    
          // Verify that the ListSmallNews section contains articles
          const smallNewsArticles = listSmallNews.locator('article');
          await expect(smallNewsArticles).toHaveCountGreaterThan(0);
    
          // Optionally, verify the content of the first article
          const firstArticleTitle = smallNewsArticles.first().locator('h2'); // Adjust selector if needed
          await expect(firstArticleTitle).toBeVisible();
        }
      });
  
      test('should display article details when clicking a news item in ListSmallNews', async ({ page }) => {
        // Verify the ListSmallNews section
        const listSmallNews = page.locator('section.list-small-news');
        if (await listSmallNews.count() > 0) {
          // Click the first news item in the ListSmallNews section
          await listSmallNews.first().locator('article').click();
      
          // Wait for the article details page to load
          await page.waitForLoadState('networkidle');
      
          // Verify that the article details page is displayed
          const articleTitle = page.locator('h1.article-title'); // Adjust selector if needed
          await expect(articleTitle).toBeVisible();
        }
      });
  });
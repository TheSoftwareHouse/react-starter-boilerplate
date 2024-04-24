import { Page, expect } from '@playwright/test';

const openHomePage = async (page: Page) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/React App/);
  await expect(page.locator('h2')).toContainText('Home');
};

export const homePageActions = {
  openHomePage,
};

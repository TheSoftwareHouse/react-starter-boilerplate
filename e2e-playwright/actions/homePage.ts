import { Page, expect } from '@playwright/test';

import { AppRoute } from '../../src/routing/AppRoute.enum';

const openHomePage = async (page: Page) => {
  await page.goto(AppRoute.home);

  await expect(page).toHaveTitle(/React App/);
  await expect(page.locator('h2')).toContainText('Home');
};

export const homePageActions = {
  openHomePage,
};

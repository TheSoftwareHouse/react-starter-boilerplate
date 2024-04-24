import { test } from '@playwright/test';

import { homePageActions } from '../actions/homePage';
import { navigationActions } from '../actions/navigation';

test.describe('Home Page', () => {
  test('should navigate to the about page', async ({ page }) => {
    await homePageActions.openHomePage(page);
    await navigationActions.navigateToAboutPage(page);
  });

  test('should navigate to the help page', async ({ page }) => {
    await homePageActions.openHomePage(page);
    await navigationActions.navigateToHelpPage(page);
  });

  test('should navigate to the home page from other page', async ({ page }) => {
    await homePageActions.openHomePage(page);
    await navigationActions.navigateToAboutPage(page);
    await navigationActions.navigateToHomePage(page);
  });
});

import { Page, expect } from '@playwright/test';

import { AppRoute } from '../../src/routing/AppRoute.enum';

const navigateToHomePage = async (page: Page) => {
  const link = page.getByRole('link', { name: 'Home' });

  await expect(link).toHaveAttribute('href', AppRoute.home);
  await link.click();

  await expect(page).toHaveURL('');
};
const navigateToAboutPage = async (page: Page) => {
  const link = page.getByRole('link', { name: 'About' });

  await expect(link).toHaveAttribute('href', AppRoute.about);
  await link.click();

  await expect(page).toHaveURL(/about/);
};
const navigateToHelpPage = async (page: Page) => {
  const link = page.getByRole('link', { name: 'Help' });

  await expect(link).toHaveAttribute('href', AppRoute.help);
  await link.click();

  await expect(page).toHaveURL(/help/);
};

export const navigationActions = {
  navigateToHomePage,
  navigateToAboutPage,
  navigateToHelpPage,
};

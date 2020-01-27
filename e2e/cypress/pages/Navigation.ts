import { AppRoute } from '../../../src/app/routes/AppRoute.enum';

class Navigation {
  goToAbout(): void {
    cy.get(`a[href*="${AppRoute.about}"]`).click();
  }

  goToHelp(): void {
    cy.get(`a[href*="${AppRoute.help}"]`).click();
  }

  get aboutLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.about}`;
  }

  get helpLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.help}`;
  }
}

export const NavigationMenu = new Navigation();

import { AppRoute } from '../../../src/routing/AppRoute.enum';

class Navigation {
  goToHome(): void {
    cy.get(`a[href*="${AppRoute.home}"]`).first().click();
  }

  goToAbout(): void {
    cy.get(`a[href*="${AppRoute.about}"]`).first().click();
  }

  goToHelp(): void {
    cy.get(`a[href*="${AppRoute.help}"]`).first().click();
  }

  get homeLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.home}`;
  }

  get aboutLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.about}`;
  }

  get helpLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.help}`;
  }
}

export const NavigationMenu = new Navigation();

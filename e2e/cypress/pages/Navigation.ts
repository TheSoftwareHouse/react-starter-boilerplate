import { AppRoute } from '../../../src/routing/AppRoute.enum';

class Navigation {
  goToLogout(): void {
    cy.get(`a[href*="${AppRoute.logout}"]`).first().click();
  }

  goToHome(): void {
    cy.get(`a[href*="${AppRoute.home}"]`).first().click();
  }

  goToLogin(): void {
    cy.get(`a[href*="${AppRoute.login}"]`).first().click();
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

  get loginLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.login}`;
  }

  get logoutLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.logout}`;
  }

  get aboutLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.about}`;
  }

  get helpLink(): string {
    return `${Cypress.env().baseUrl}${AppRoute.help}`;
  }
}

export const NavigationMenu = new Navigation();

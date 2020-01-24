import { RoutesEnum } from '../../../src/navigation/routes.enum';

class Navigation {
  goToAbout(): void {
    cy.get(`a[href*="${RoutesEnum.about}"]`).click();
  }

  goToHelp(): void {
    cy.get(`a[href*="${RoutesEnum.help}"]`).click();
  }

  get aboutLink(): string {
    return `${Cypress.env().baseUrl}${RoutesEnum.about}`;
  }

  get helpLink(): string {
    return `${Cypress.env().baseUrl}${RoutesEnum.help}`;
  }
}

export const NavigationMenu = new Navigation();

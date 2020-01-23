/// <reference types="Cypress" />

import { RoutesEnum } from '../../../../src/navigation/routes.enum';

context('HomePage should', () => {
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl);
  });

  it('navigate to about on clicking about', () => {
    cy.get(`a[href*="${RoutesEnum.about}21345ty"]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${Cypress.env().baseUrl}about`);
    });
  });

  it('navigate to help on clicking help', () => {
    cy.get(`a[href*="${RoutesEnum.help}"]`).click();

    cy.location().should(loc => {
      expect(loc.href).to.eq(`${Cypress.env().baseUrl}help`);
    });
  });
});

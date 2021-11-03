/// <reference types="Cypress" />

import { NavigationMenu } from '../../pages/Navigation';

context('HomePage should', () => {
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl);
  });

  it('navigate to about on clicking about', () => {
    NavigationMenu.goToAbout();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.aboutLink);
    });
  });

  it('navigate to help on clicking help', () => {
    NavigationMenu.goToHelp();
    // debugger;
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.helpLink);
    });
  });
});

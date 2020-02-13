/// <reference types="Cypress" />

import { NavigationMenu } from '../../pages/Navigation';

context('Login Page should', () => {
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl);
  });

  it('navigate home after logging in', () => {
    //session clearing is currently not done automatically https://github.com/cypress-io/cypress/issues/413
    cy.clearSession();
    cy.userLogin();
    cy.location().should(loc => {
      expect(loc.href).to.eq(NavigationMenu.homeLink);
    });
  });
});

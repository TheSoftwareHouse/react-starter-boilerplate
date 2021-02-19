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

  it('navigate to login on clicking login', () => {
    cy.clearSession();
    NavigationMenu.goToLogin();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.loginLink);
    });
  });

  it('log out after clicking logout', () => {
    //session clearing is currently not done automatically https://github.com/cypress-io/cypress/issues/413
    cy.clearSession();
    cy.userLogin();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.homeLink);
    });
    cy.window().then((win) => {
      const accessToken = win.sessionStorage.getItem('accessToken');
      expect(accessToken).to.not.equal(null);
    });
    NavigationMenu.goToLogout();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.loginLink);
    });
    cy.window().then((win) => {
      const accessToken = win.sessionStorage.getItem('accessToken');
      expect(accessToken).to.equal(null);
    });
  });
});

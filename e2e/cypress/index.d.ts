/// <reference types="Cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    userLogin(): Chainable<void>;
    clearSession(): Chainable<void>;
  }
}

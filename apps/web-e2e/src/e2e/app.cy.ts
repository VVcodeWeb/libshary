import { getGreeting } from '../support/app.po';

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains(/Welcome/);
  });
  it('should display page title', () => {
    cy.visit('/');
    cy.title().should('eq', 'Libshary');
  });
});

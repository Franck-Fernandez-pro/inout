describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have 2 transaction table', () => {
    cy.get('[data-testid^="transactions_table_"]').should('have.length', 2);
  });

  it('should have transaction table IN', () => {
    cy.get('[data-testid="transactions_table_IN"]').should('be.visible');
  });

  it('should have transaction table OUT', () => {
    cy.get('[data-testid="transactions_table_OUT"]').should('be.visible');
  });
});

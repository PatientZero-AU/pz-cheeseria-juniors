/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add items to cart', () => {
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=badge-count]').should('have.text', '2');
  });

  it('Purchase items', () => {
    cy.get('[data-cy=add-to-cart-1]').click();
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=go-to-cart]').click();
    cy.get('[data-cy=purchase-button]').click();

    cy.get('[data-cy=response-message]').should(
      'have.text',
      'Purchased successfully.'
    );

    cy.get('[data-cy=recent-purchases]').click();
    cy.get('[data-cy=latest-order-item-amount-1]').should('have.text', '1');
    cy.get('[data-cy=latest-order-item-amount-2]').should('have.text', '2');
    cy.get('[data-cy=latest-order-item-amount-3]').should('have.text', '3');
  });
});

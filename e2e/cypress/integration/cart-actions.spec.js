/// <reference types="cypress" />

context('Cart Actions', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Add items to cart', () => {

    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();

    cy.get('[data-cy=shopping-cart-badge-count]').should('have.text', '2');

    // Open Cart and check items are included
    cy.get('[data-cy=shopping-cart-button]').click();

    cy.get('[data-cy=cart-drawer]').should('be.visible');

    cy.get('[data-cy=cart-item-2]').should('be.visible');

    cy.get('[data-cy=cart-item-3]').should('be.visible');

    // Purchase items, check cleared cart and close cart

    cy.get('[data-cy=purchase-cart-button]').click();

    cy.get('[data-cy=cart-no-items-header]').should('be.visible');

    cy.get('[data-cy=close-cart-button]').click();

    cy.get('[data-cy=cart-drawer]').should('not.be.visible');

    // open recent purchases and check purchase has been made

    cy.get('[data-cy=recent-purchases-button]').click();

    cy.get('[data-cy=recent-purchases-drawer]').should('be.visible');

    cy.get('[data-cy=no-recent-purchases-message]').should('not.be.visible');

    cy.get(`[data-cy=recent-purchase-item-${new Date().toDateString()}]`).should('be.visible');

    cy.get('[data-cy=cart-item-2]').should('be.visible');

    cy.get('[data-cy=cart-item-3]').should('be.visible');

  })
})

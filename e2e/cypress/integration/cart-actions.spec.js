/// <reference types="cypress" />
context("Cart Actions", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("Add items to cart", () => {
		cy.get("[data-cy=add-to-cart-2]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=badge-count]").should("have.text", "2");
	});
});

context("Purchase items", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.get("[data-cy=add-to-cart-2]").click();
		cy.get("[data-cy=add-to-cart-3]").click();
		cy.get("[data-cy=badge-count]").should("have.text", "2");
		cy.get("[data-cy=open-cart]").click();

	});

	it("Make the purchase", () => {
		cy.get("[data-cy=purchase-button]").click();
		cy.get(".cart--empty").contains("No items in cart.");
	});
});

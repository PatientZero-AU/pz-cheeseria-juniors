context('Purchase Actions', () => {
    beforeEach(() => {
      cy.visit('/');
    })
  
    it('Add items to cart', () => {
  
      cy.get('[data-cy=add-to-cart-2]').click();
      cy.get('[data-cy=add-to-cart-3]').click();
  
      cy.get('[data-cy=badge-count]').should('have.text', '2');
  
    })

    it('Clicks purchase button', () => {
  
        cy.get('[data-cy=purchase]').click();
    
        cy.request({
          method : 'POST',
          url : baseURL+'/api/purchases',
          body : [
            {
              "id": 5,
              "title": "JARLSBERG",
              "price": 88.15,
              "description": "Jarlsberg is a mild, semi-soft cow’s milk cheese of Norwegian origin. Created by Anders Larsen Bakke, it resembles a Swiss Emmental with distinctive, open and irregular ‘eyes’. Many a times Jarlsberg is marketed as a Swiss cheese because of its characteristics, though it tends to be sweeter and stronger than Emmentaler.",
              "category": "open, smooth and supple",
              "image": "https://www.cheese.com/media/img/cheese/Jarlsberg_in_Wholefoods_2.jpg",
              "amount": 1
            },
            {
              "id": 7,
              "title": "ROYALP TILSIT",
              "price": 625.57,
              "description": "oyalp Tilsit or Swiss Tilsit is a light yellow semi-hard smear-ripened cheese made from unpasteurised/pasteurised cow milk. The pasteurised version is mild in flavour whereas the one made from fresh, unpasteurised milk is more strongly flavoured (called Farmhouse Tilsit). It is aged for about 5 months, which makes it a very strong smelling cheese comparable to a Limburger.",
              "category": "semi-hard, smear-ripened",
              "image": "https://www.cheese.com/media/img/cheese/Tilsit_cheese_1.jpg",
              "amount": 1
            }
          ]
        }) .then((response) => 
        { 
            expect(response).property('status').to.equal(200) 
             
        })
    
      })
  
  })
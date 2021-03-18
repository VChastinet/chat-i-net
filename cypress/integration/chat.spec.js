describe('chat app', () => {
  it('renders correctly', async () => {
    cy.visit('/');
    cy.get('#user-login').should("exist");
  });

  it('login with nickname', async () => {
    cy.visit('/');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#user-login').type('test nickname');
    cy.get('.button').click();
    /* ==== End Cypress Studio ==== */
    cy.get('.chat-body').should("exist");
  });

  it('Sends a message to chat', async () => {
    const mockMesage = 'test chat message';
    cy.visit('/');
    cy.get('#user-login').type('test nickname');
    cy.get('.button').click();
    cy.get('#msg').type(`${mockMesage} {enter}`);
    cy.get('.msg-li:last-child').should('have.text', mockMesage);
  });
});

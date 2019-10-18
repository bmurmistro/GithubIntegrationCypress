describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    cy.visit('https://demo.applitools.com');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is Applitools!',
      testName: 'My first Cypress Test',
      browser: { width: 800, height: 600 },
    });
    cy.eyesCheckWindow('Login Page');
    cy.eyesClose();
  });
});
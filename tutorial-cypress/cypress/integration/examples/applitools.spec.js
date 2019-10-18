describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    cy.visit('https://applitools.com/helloworld?diff1');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is Applitools!',
      testName: 'My first Cypress Test',
      browser: { width: 800, height: 600 },
    });
    cy.eyesCheckWindow('Login Page');
    cy.eyesClose();
  });
});

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    cy.visit('https://applitools.com/helloworld')
    cy.eyesOpen({
      appName: 'Demo App Walmart',
      testName: 'Demo Hello World'
    });
    //cy.contains('Click me!').click();
    cy.contains('?diff2').click();
    cy.eyesCheckWindow('Hello');
    cy.eyesClose();

  });
});

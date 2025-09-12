Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    cy.visit('https://demo.applitools.com/loginBefore.html')
    cy.eyesOpen({
      appName: 'Optum',
      testName: 'Login'
    });
    //cy.contains('?diff1').click();
    //cy.contains('Click me!').click();
    cy.eyesCheckWindow();
    cy.eyesClose();
  });
});

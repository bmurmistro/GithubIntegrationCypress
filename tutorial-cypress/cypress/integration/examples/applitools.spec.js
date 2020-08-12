Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    cy.visit('https://applitools.com/helloworld');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is Applitools!',
      testName: 'Hello World'
    });
    cy.contains('Click me!').click()
    cy.eyesCheckWindow('Hello');
    cy.eyesClose();
  });
});

/*
describe('Hello Cypress, This is AutoDesk Help', () => {
  it('displays', () => {
    cy.visit('https://knowledge.autodesk.com/contact-support');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is AutoDesk help!',
      testName: 'Question Mark'
    });
    cy.wait(10000);
    cy.contains('No, thanks').click();
    cy.wait(10000);

    cy.eyesCheckWindow('Hello');

    cy.eyesClose();
  });
});
*/

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
/*describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    cy.visit('https://applitools.com/helloworld');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is Applitools!',
      testName: 'Hello World'
    });
    cy.eyesCheckWindow('Hello');
    //cy.contains('Click me!').click()
    cy.eyesClose();
  });
});*/

describe('Hello Cypress, This is AutoDesk Help', () => {
  it('displays', () => {
    cy.visit('https://app.digital-help-prd.autodesk.com/universal-help/current/index.html?uhmParentUrl=https%3A%2F%2Fknowledge.autodesk.com%2Fcontact-support&amp;uhmParentDomain=https%3A%2F%2Fknowledge.autodesk.com&amp;uhmParentReferrer=&amp;language=en_US&amp;product=generic&amp;pageTitle=Contact%20Support%20%7C%20Autodesk%20Knowledge%20Network&amp;showFullPage=true&amp;containerId=uhm-widget&amp;analyticsLogging=false');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is AutoDesk help!',
      testName: 'Question Mark'
    });

    cy.eyesCheckWindow('Hello');

    cy.eyesClose();
  });
});

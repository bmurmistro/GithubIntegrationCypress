describe('Hello Cypress, This is Applitools', () => {
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
});

describe('Hello Cypress, This is AutoDesk Help', () => {
  it('displays', () => {
    cy.visit('https://www.autodesk.com/');
    cy.eyesOpen({
      appName: 'Hello Cypress, This is AutoDesk help!',
      testName: 'Question Mark'
    });
    cy.get('.uh-fab');
    cy.eyesCheckWindow({
      target: 'region',
      selector: '.uh-fab'
    });
    cy.eyesClose();
  });
});

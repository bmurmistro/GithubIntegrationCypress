describe('Hello Cypress, This is Applitools', () => {
  it('works', () => {
    try {
      cy.visit('https://applitools.com/helloworld');
      cy.eyesOpen({
        appName: 'Hello Cypress, This is Applitools!',
        testName: 'Hello World'
      });
      cy.eyesCheckWindow('Hello');
      //cy.contains('Click me!').click()
      cy.eyesClose();
    }
    catch(e) {
      console.log(e);
    }
  });
});

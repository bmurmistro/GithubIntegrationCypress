Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
describe('Hello Cypress, This is Applitools', () => {
it('Cypress: Quickstart', () => {
        cy.visit('https://fairfieldsubarusoa.cms.us-west-2.web-np.dealer.com/subaru-love-promise.htm');
    cy.document().then((doc) => {
        cy.eyesOpen({
            appName: 'DDC',
            testName: 'DDC',
            browser: [
                // Add browsers with different viewports
                {width: 1700, height: 886, name: 'chrome'},
                {width: 1920, height: 1080, name: 'chrome'},
            ]
        });
        cy.get('#ca-consent-root > div > div > div > div > div.ca-button-wrap > div.ca-button-wrap-inner > button.ca-button.ca-primary-button.ca-button-opt-in').click();
        cy.get('#love-promise1-app-root > div > div.row.mb-4 > div.col-sm-8 > div.lp-badges > div.lp-badge-container.px-sm-4 > button:nth-child(5)').click();
        cy.eyesCheckWindow({
          tag: 'lazy fully',
          fully: true,
          layoutBreakPoints: true,
          //waitBeforeCapture: 10000,
          lazyLoad:{}
        });

        cy.eyesClose();
      });
    })
});

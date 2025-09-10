describe('test',  () => {
    it(`bank`, () => {
        cy.viewport(1440, 900);
        cy.initializeAutoheal('3a8a31368677');
        cy.visit('https://sandbox.applitools.com/bank');
        cy.getAI('#username').type(`brandon.murray@applitools.com`);
        cy.getAI('#password').type(`tes`);
        cy.getAI('[type="button"]').click();
        cy.autoheal();
    })
});
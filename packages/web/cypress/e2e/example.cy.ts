describe("Website", () => {
  specify("displays without errors", () => {
    cy.visit("/");
    cy.contains("Accept").click();
    cy.contains("We are happy to have you").should("exist");
  });
});

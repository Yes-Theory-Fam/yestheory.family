describe("Website", () => {
  specify("displays without errors", () => {
    cy.visit("/");
    cy.get('[role="alertdialog"]').contains("Accept").click();
    cy.contains("Scroll for more").click();
  });
});

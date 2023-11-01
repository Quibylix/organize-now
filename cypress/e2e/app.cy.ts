describe("general app test", () => {
  it("renders the title 'Organize Now'", () => {
    cy.visit("/");

    cy.title().should("include", "Organize Now");
  });
});

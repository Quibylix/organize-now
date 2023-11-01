describe("general app test", () => {
  it("renders the title 'Organize Now'", () => {
    cy.visit("/");

    cy.title().should("include", "Organize Now");
  });

  it("renders a heading and a description of the app", () => {
    cy.visit("/");

    cy.get("h1").contains("Organize Now!");
    cy.get("p").contains(
      "Organize your life with this simple app. Create a list of things to do, check them off as you go, and get things done!",
    );
  });

  it("renders a call to action link", () => {
    cy.visit("/");

    cy.get("a").contains("Get Started");
  });
});

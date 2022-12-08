beforeEach("Should visit the page before each test", () => {
  cy.visit("/");
});
describe("Testing movieApp.ts", () => {
  it("Should show form", () => {
    cy.get("form").should("have.id", "searchForm");
  });

  it("Should show input", () => {
    cy.get("input").should("have.id", "searchText");
  });

  it("Should show button", () => {
    cy.get("button").should("have.id", "search");
  });

  it("Should get input", () => {
    cy.get("input").type("Batman").should("have.value", "Batman");
  });

  it("Should search with value", () => {
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("button").click();
  });

  it("Should search for movie and create divs", () => {
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("#search").click();
    cy.get(".movie").should("have.length", 10);
    cy.get("h3").should("have.length", 10);
    cy.get(".movie:first").contains("Batman Begins");
  });

  it("Should clear the all movies and search for new ones", () => {
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("#search").click();

    cy.get("input").clear().type("Star Wars").should("have.value", "Star Wars");
    cy.get("#search").click();
    cy.get(".movie").should("have.length", 10);
    cy.get("h3").should("have.length", 10);
    cy.get(".movie:first").contains("Star Wars: Episode IV - A New Hope");
  });

  it("Should not search for a movie and show noMessage", () => {
    cy.get("input").type(" ").should("have.value", " ");
    cy.get("button").click();
    cy.get("p").contains("sökresultat");
  });
});

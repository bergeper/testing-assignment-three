describe("Testing movieApp with mockdata", () => {
  beforeEach("Should visit the page before each test", () => {
    cy.visit("index.html");
  });

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
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "moviesMock" }).as(
      "movieAppSearch"
    );
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("button").click();
    cy.wait("@movieAppSearch").its("request.url").should("contain", "Batman");
  });

  it("Should search for movie and create DIVS", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "moviesMock" }).as(
      "movieAppSearch"
    );
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("#search").click();
    cy.wait("@movieAppSearch").its("request.url").should("contain", "Batman");
    //Got 9 movies in my object in fixtures.
    cy.get(".movie").should("have.length", 9);
  });

  it("Should not search for a movie and show noMessage", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      fixture: "emptyMoviesMock",
    }).as("movieAppSearch");

    cy.get("input").type("Lord").should("have.value", "Lord");
    cy.get("button").click();

    cy.wait("@movieAppSearch").its("request.url").should("contain", "Lord");
    cy.get("p").contains("sökresultat");
  });
});

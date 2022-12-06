describe("Testing movieApp.ts", () => {
  it("Should show form", () => {
    cy.visit("http://localhost:1234");
    cy.get("form").should("have.id", "searchForm");
  });

  it("Should get input", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Batman").should("have.value", "Batman");
  });

  it("Should search with value", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("button").click();
  });

  it("Should search for movie and create divs", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("Batman").should("have.value", "Batman");
    cy.get("#search").click();
    cy.get(".movie").should("have.length", 10);
  });

  it("Should not search for a movie and show noMessage", () => {
    cy.visit("http://localhost:1234");
    cy.get("input").type("ö").should("have.value", "ö");
    cy.get("button").click();
    cy.get("p").contains("sökresultat");
  });
});

describe("Testing movieApp with mockdata", () => {
  it("Should search with value", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movies" }).as(
      "movieAppSearch"
    );
    cy.visit("http://localhost:1234");

    cy.get("input").type("Batman").should("have.value", "Batman");

    cy.get("button").click();

    cy.wait("@movieAppSearch").its("request.url").should("contain", "Batman");
  });

  it("Should search for movie and create DIVS", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "movies" }).as(
      "movieAppSearch"
    );
    cy.visit("http://localhost:1234");

    cy.get("input").type("Batman").should("have.value", "Batman");

    cy.get("#search").click();

    cy.wait("@movieAppSearch").its("request.url").should("contain", "Batman");
    //Got 9 movies in my object in fixtures.
    cy.get(".movie").should("have.length", 9);
  });

  it("Should not search for a movie and show noMessage", () => {
    cy.intercept("GET", "http://omdbapi.com/*", { fixture: "emptyMovies" }).as(
      "movieAppSearch"
    );

    cy.visit("http://localhost:1234");

    cy.get("input").type("Lörd").should("have.value", "Lörd");

    cy.get("button").click();

    cy.get("p").contains("sökresultat");
  });
});

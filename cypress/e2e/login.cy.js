describe("Ninja Login Page Tests", () => {
  const loginUrl = "https://app.ninjarmm.com/auth/#/login";

  beforeEach(() => {
    cy.visit(loginUrl);
  });

  it("TC01 - Loads login page successfully", () => {
    cy.url().should("include", "/login");
  });

  it("TC02 - Email and password fields are visible", () => {
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("TC04 - Login button is clickable", () => {
    cy.get('button[type="submit"]').should("be.visible").and("not.be.disabled");
  });

  it("TC07 - Valid login should redirect (adjust credentials)", () => {
    cy.get('input[name="email"]').type("validuser@example.com");
    cy.get('input[name="password"]').type("validpassword");
    cy.get('button[type="submit"]').click();

    // Wait and check for redirection or dashboard content
    cy.url().should("not.include", "/login"); // Adjust this based on redirect
  });

  it("TC08 - Invalid password shows error", () => {
    cy.get('input[name="email"]').type("validuser@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();

    cy.contains(/invalid/i).should("be.visible");
  });

  it("TC10 - Empty fields block login", () => {
    cy.get('button[type="submit"]').click();
    cy.contains(/required/i).should("exist");
  });

  it("TC14 - Toggle password visibility", () => {
    cy.get('input[name="password"]').type("testpassword");
    cy.get('[aria-label*="toggle password visibility"]').click(); // Adjust selector if needed
    cy.get('input[name="password"]').should("have.attr", "type", "text");
  });

  it("TC16 - Invalid email format shows validation", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("somepass");
    cy.get('button[type="submit"]').click();
    cy.contains(/invalid email/i).should("be.visible");
  });
});

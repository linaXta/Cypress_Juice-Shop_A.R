
describe('Juce-Shop', () =>{
    beforeEach(() =>{
       cy.visit("/");
       cy.get(".cc-btn").click();
       cy.get('[aria-label="Close Welcome Banner"]').click();
        // click account
       cy.get("#navbarAccount").click();
       cy.get("#navbarLoginButton").click();
       cy.get("#email").type("demo");
       cy.get("#password").type("demo");
       cy.get("#loginButton").click();
    });

    it("Search Lemon", () => {
       // Type Lemon in search bar , click enter
       cy.get(".mat-search_icon-search").click();
       cy.get("#mat-input-0").type("Lemon Juice {enter}");
       // Validate that we can see box with Lemon Juice (500ml)
       cy.get(".item-name").should("have.text", " Lemon Juice (500ml) "); 
    });


    it("Search 500ml", () => {
       // Type 500lm in search bar , click enter
       cy.get(".mat-search_icon-search").click();
       cy.get("#mat-input-0").type("500ml {enter}");
       // Validate that we can see folowing boxes:
       // 1. Eggfruit Juice (500ml)
       // 2. Lemon Juice (500ml)
       // 3. Strawberry Juice (500ml)
       cy.get(".item-name").should("have.text", " Eggfruit Juice (500ml)  Lemon Juice (500ml)  Strawberry Juice (500ml) ");    
    });

    it("Items per page scenario", () => {
        // select 12 items per page
        cy.get(".mat-select-value").click();
        cy.get(".mat-option-text").contains("12").click({ force: true });
        // validate that we see 12 boxes
        cy.get(".product").should('have.length', 12);
        // select 24 items per page
        cy.get(".mat-select-value").click();
        cy.get(".mat-option-text").contains("24").click({ force: true });
        // validate that we see 24 boxes
        cy.get(".product").should('have.length', 24);
        // select 36 items per page
        cy.get(".mat-select-value").click();
        cy.get(".mat-option-text").contains("36").click({ force: true });
        // validate that we see 36 boxes
        cy.get(".product").should('have.length', 35);
    });
});

describe("Juice-Shop without login", () => {
    beforeEach(() =>{
        cy.visit("/");
        cy.get(".cc-btn").click();
        cy.get('[aria-label="Close Welcome Banner"]').click();
    });

    it.only('Register a new user', () => {
        // Click aaccount
        cy.get("#navbarAccount").click();
        // Clic login
        cy.get("#navbarLoginButton").click();
        // Click Not yet a customer?
        cy.get("#newCustomerLink").click();  
        // Input email
        cy.get("#emailControl").type("demo2@gmail.com");
        // Inmput password
        cy.get("#passwordControl").type("demo1");
        // Input repeat password
        cy.get("#repeatPasswordControl").type("demo1");
        // Input Security Question
        cy.get("[name='securityQuestion']").click();
        cy.get(".mat-option-text").contains("Your favorite movie?").click();
        // Input answer to security question
        cy.get("#securityAnswerControl").type("demo1");
        // Click register
        cy.get("#registerButton").click();
        // validate that we on login page
        cy.get("#email").should("be.visible");
    });
    
});

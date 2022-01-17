describe('Check reachability of all pages', () => {
  it('Visits the home page', () => {
    cy.visit('/')
    cy.contains('Welcome')
    cy.contains('Documentation')
    cy.contains('Donate')
  })

  it('Visits the overview page', () => {
    cy.visit('/overview')
    cy.contains('Ring participants')
    cy.contains('Download Visual')
  })

  it('Visits the visual page', () => {
    cy.visit('/visual')
    cy.contains('Node connections')
    cy.contains('Ring order')
    cy.contains('Persist channel order')
  })

  it('Visits the settings page', () => {
    cy.visit('/settings')
    cy.contains('Parse capacity')
    cy.contains('Manual add')
    cy.contains('Saved Rings')
  })
})

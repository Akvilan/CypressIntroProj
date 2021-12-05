
let keyTo ="k_3ab04L0uLuxBcnIPXfxA3RsdCIb6gJbOrXv5c"
let linkFromMail;
describe('My First Test', () => {

  it('Check first search result', () => {
    cy.visit('https://www.google.com')
    let searchInput = cy.get('input[name="q"]')
        searchInput.type('hello world')
    searchInput.type('{enter}')


  })

  it('Check first search result', () => {
    let firstResult = cy.get('#rso > div:nth-child(1) > div > div > div:nth-child(1) > div > div > div > div> a>h3')
    firstResult.should('have.text', 'Hello, world! - Википедия')
  })



  it('send API request, get link,check response , visit it ', () => {
    let email = `qa+testcyRequest111111111@mailsac.com`
    cy.request({
      url: `https://mailsac.com/api/addresses/${email}/messages`,
      headers: {   "Host": "mailsac.com",
                  "Mailsac-Key": `${keyTo}`,
      },


    }).then((response) => {

      cy.log(JSON.stringify(response.body))
      cy.log(JSON.stringify(response.body[0].links[0]))
      linkFromMail = response.body[0].links[1]
      cy.log(typeof linkFromMail)
      expect(response).property('status').to.equal(200)
      cy.visit(linkFromMail)
        })
  })
})

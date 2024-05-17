'use strict'
const helper = require('../src/utils/helpers')

module.exports = (expect) => {
  describe('Helpers', () => {
    it('should generate random number', () => {
      const length = 6
      const randomNumber = parseInt(helper.generateRandomNumber(length))

      expect(randomNumber).is.to.be.a('Number')
      expect(randomNumber.toString()).to.have.lengthOf(length)
    })

    it('should hash and validate password', async() => {
      const password = 'azmikasep'

      // hash password
      const hash = await helper.hashPassword(password)
      const isValid = await helper.isPasswordValid(password, hash)

      expect(hash).is.to.be.a('String')
      expect(isValid).is.true
    })
  })
}
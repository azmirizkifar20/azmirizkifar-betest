'use strict'

module.exports = (request, lookupData, expect, baseUrl) => {
  /*
    ===========================================================================================
    Method: GET
    URL Path: /v1/accounts/:account_id
    ===========================================================================================
  */
  describe('API Get User Account Info', () => {
    it('should get spesific user by accountId', async() => {
      const accessToken = lookupData.token
      const accountId = lookupData.accountId

      const result = await request(baseUrl)
        .get(`/v1/accounts/${accountId}`)
        .set('Authorization', `Bearer ${accessToken}`)

      // check response data
      expect(result.statusCode).equal(200)
      expect(result.body.data).to.not.equal(null)
      expect(result.body.data).to.be.an('object')
      expect(result.body.message).equal('Successfully get user account!')

      expect(result.body.data).haveOwnProperty('account')
      expect(result.body.data.account).haveOwnProperty('user')
      expect(result.body.data.account).haveOwnProperty('userName')
      expect(result.body.data.account).haveOwnProperty('lastLoginDateTime')
      expect(result.body.data.account).haveOwnProperty('createdAt')
      expect(result.body.data.account).haveOwnProperty('accountId')
      expect(result.body.data.account.user).haveOwnProperty('fullName')
      expect(result.body.data.account.user).haveOwnProperty('emailAddress')
      expect(result.body.data.account.user).haveOwnProperty('accountNumber')
      expect(result.body.data.account.user).haveOwnProperty('registrationNumber')
      expect(result.body.data.account.user).haveOwnProperty('createdAt')
      expect(result.body.data.account.user).haveOwnProperty('updatedAt')
      expect(result.body.data.account.user).haveOwnProperty('userId')
    })
  })

  /*
    ===========================================================================================
    Method: GET
    URL Path: /v1/accounts/:registration_number/register-number
    ===========================================================================================
  */
  describe('API Get User By Register Number', () => {
    it('should get data user by registrationNumber', async() => {
      const accessToken = lookupData.token
      const registrationNumber = lookupData.registrationNumber

      const result = await request(baseUrl)
        .get(`/v1/accounts/${registrationNumber}/register-number`)
        .set('Authorization', `Bearer ${accessToken}`)

      // check response data
      expect(result.statusCode).equal(200)
      expect(result.body.data).to.not.equal(null)
      expect(result.body.data).to.be.an('object')
      expect(result.body.message).equal('Successfully get user!')

      expect(result.body.data).haveOwnProperty('fullName')
      expect(result.body.data).haveOwnProperty('emailAddress')
      expect(result.body.data).haveOwnProperty('accountNumber')
      expect(result.body.data).haveOwnProperty('registrationNumber')
      expect(result.body.data).haveOwnProperty('createdAt')
      expect(result.body.data).haveOwnProperty('updatedAt')
      expect(result.body.data).haveOwnProperty('userId')
    })
  })

  /*
    ===========================================================================================
    Method: GET
    URL Path: /v1/accounts/:account_number/account-number
    ===========================================================================================
  */
  describe('API Get User By Account Number', () => {
    it('should get data user by accountNumber', async() => {
      const accessToken = lookupData.token
      const accountNumber = lookupData.accountNumber

      const result = await request(baseUrl)
        .get(`/v1/accounts/${accountNumber}/account-number`)
        .set('Authorization', `Bearer ${accessToken}`)

      // check response data
      expect(result.statusCode).equal(200)
      expect(result.body.data).to.not.equal(null)
      expect(result.body.data).to.be.an('object')
      expect(result.body.message).equal('Successfully get user!')

      expect(result.body.data).haveOwnProperty('fullName')
      expect(result.body.data).haveOwnProperty('emailAddress')
      expect(result.body.data).haveOwnProperty('accountNumber')
      expect(result.body.data).haveOwnProperty('registrationNumber')
      expect(result.body.data).haveOwnProperty('createdAt')
      expect(result.body.data).haveOwnProperty('updatedAt')
      expect(result.body.data).haveOwnProperty('userId')
    })
  })

  /*
    ===========================================================================================
    Method: GET
    URL Path: /v1/accounts/:total_day/last-login
    ===========================================================================================
  */
  describe('Get Login Data In n Days Ago', () => {
    it('should get data login in a few days ago', async() => {
      const totalDay = 3
      const accessToken = lookupData.token

      const result = await request(baseUrl)
        .get(`/v1/accounts/${totalDay}/last-login`)
        .set('Authorization', `Bearer ${accessToken}`)

      // check response data
      expect(result.statusCode).equal(200)
      expect(result.body.data).to.not.equal(null)
      expect(result.body.data).to.be.an('array')
      expect(result.body.message).equal('Successfully get users!')

      if (result.body.data.length > 0) {
        console.log('total data =>', result.body.data.length);

        expect(result.body.data[0]).haveOwnProperty('user')
        expect(result.body.data[0]).haveOwnProperty('userName')
        expect(result.body.data[0]).haveOwnProperty('lastLoginDateTime')
        expect(result.body.data[0]).haveOwnProperty('createdAt')
        expect(result.body.data[0]).haveOwnProperty('accountId')
        expect(result.body.data[0].user).haveOwnProperty('fullName')
        expect(result.body.data[0].user).haveOwnProperty('emailAddress')
        expect(result.body.data[0].user).haveOwnProperty('accountNumber')
        expect(result.body.data[0].user).haveOwnProperty('registrationNumber')
        expect(result.body.data[0].user).haveOwnProperty('createdAt')
        expect(result.body.data[0].user).haveOwnProperty('updatedAt')
        expect(result.body.data[0].user).haveOwnProperty('userId')
      } else {
        console.log('total data =>', 0);
      }
    })
  })


  /*
    ===========================================================================================
    Method: PUT
    URL Path: /v1/accounts/:account_id
    ===========================================================================================
  */
  describe('API Update User Account', () => {
    it('should update selected user', async() => {
      const accessToken = lookupData.token
      const accountId = lookupData.accountId
      const updateData = {
        fullName: "Muhamad Azmi Rizkifar Edit",
        emailAddress: "azmirizkifar20@gmail.com"
      }

      const result = await request(baseUrl)
        .put(`/v1/accounts/${accountId}`)
        .send(updateData)
        .set('Authorization', `Bearer ${accessToken}`)

      // check response data
      expect(result.statusCode).equal(200)
      expect(result.body.data).to.not.equal(null)
      expect(result.body.data).to.be.an('object')
      expect(result.body.message).equal('Successfully update user!')

      expect(result.body.data).haveOwnProperty('user')
      expect(result.body.data).haveOwnProperty('userName')
      expect(result.body.data).haveOwnProperty('lastLoginDateTime')
      expect(result.body.data).haveOwnProperty('createdAt')
      expect(result.body.data).haveOwnProperty('accountId')
      expect(result.body.data.user).haveOwnProperty('fullName')
      expect(result.body.data.user).haveOwnProperty('emailAddress')
      expect(result.body.data.user).haveOwnProperty('accountNumber')
      expect(result.body.data.user).haveOwnProperty('registrationNumber')
      expect(result.body.data.user).haveOwnProperty('createdAt')
      expect(result.body.data.user).haveOwnProperty('updatedAt')
      expect(result.body.data.user).haveOwnProperty('userId')
    })
  })

  /*
    ===========================================================================================
    Method: DELETE
    URL Path: /v1/accounts/:account_id
    ===========================================================================================
  */
  describe('API Delete User Account', () => {
    it('should delete a user', async() => {
      const accessToken = lookupData.token
      const accountId = lookupData.accountId

      const result = await request(baseUrl)
        .delete(`/v1/accounts/${accountId}`)
        .set('Authorization', `Bearer ${accessToken}`)

      // check response data
      expect(result.statusCode).equal(200)
      expect(result.body.data).equal(null)
      expect(result.body.message).equal('Successfully delete user!')
    })

    after(() => {
      // stop the process
      process.exit(0)
    })
  })
}
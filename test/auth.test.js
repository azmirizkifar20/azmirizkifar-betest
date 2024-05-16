require('dotenv').config()
const request = require('supertest')
const expect = require('chai').expect
const baseUrl = process.env.BASE_URL
let lookupData = {
  accountId: null,
  accountNumber: null,
  registrationNumber: null,
  token: null
}

/*
  ===========================================================================================
  Method: POST
  URL Path: /v1/auth/register
  ===========================================================================================
*/
describe('API Register', () => {
  it('should register a new account', async() => {
    const registerData = {
      userName: "azmrzkrf",
      password: "azmikasep",
      password_confirm: "azmikasep",
      fullName: "Muhamad Azmi Rizkifar",
      emailAddress: "m.azmirizkifar20@gmail.com"
    }

    const result = await request(baseUrl)
      .post('/v1/auth/register')
      .send(registerData)

    // check response data
    expect(result.statusCode).equal(201)
    expect(result.body.data).to.not.equal(null)
    expect(result.body.data).to.be.an('object')
    expect(result.body.message).equal('Successfully create user!')

    expect(result.body.data).haveOwnProperty('user')
    expect(result.body.data.userName).equal(registerData.userName)
    expect(result.body.data.user.fullName).equal(registerData.fullName)
    expect(result.body.data.user.emailAddress).equal(registerData.emailAddress)

    // fill lookup data
    lookupData.accountId = result.body.data.accountId
    lookupData.accountNumber = result.body.data.user.accountNumber
    lookupData.registrationNumber = result.body.data.user.registrationNumber
  })
})

/*
  ===========================================================================================
  Method: POST
  URL Path: /v1/auth/login
  ===========================================================================================
*/
describe('API Login', () => {
  it('should login to an account', async() => {
    const loginData = {
      userName: "azmrzkrf",
      password: "azmikasep"
    }

    const result = await request(baseUrl)
      .post('/v1/auth/login')
      .send(loginData)

    // check response data
    expect(result.statusCode).equal(200)
    expect(result.body.data).to.not.equal(null)
    expect(result.body.data).to.be.an('object')
    expect(result.body.message).equal('Successfully login!')

    // check token
    expect(result.body.data).haveOwnProperty('accessToken')
    expect(result.body.data.accessToken).to.not.equal(null)

    // check account data
    expect(result.body.data).haveOwnProperty('account')
    expect(result.body.data.account).haveOwnProperty('user')
    expect(result.body.data.account).haveOwnProperty('userName')
    expect(result.body.data.account).haveOwnProperty('lastLoginDateTime')
    expect(result.body.data.account).haveOwnProperty('createdAt')
    expect(result.body.data.account).haveOwnProperty('accountId')
    expect(result.body.data.account.userName).equal(loginData.userName)
    expect(result.body.data.account.user).haveOwnProperty('fullName')
    expect(result.body.data.account.user).haveOwnProperty('emailAddress')
    expect(result.body.data.account.user).haveOwnProperty('accountNumber')
    expect(result.body.data.account.user).haveOwnProperty('registrationNumber')
    expect(result.body.data.account.user).haveOwnProperty('createdAt')
    expect(result.body.data.account.user).haveOwnProperty('updatedAt')
    expect(result.body.data.account.user).haveOwnProperty('userId')

    // set access token
    lookupData.token = result.body.data.accessToken
  })
})

/*
  ===========================================================================================
  Method: POST
  URL Path: /v1/auth/refresh-token
  ===========================================================================================
*/
describe('API Refresh Token', () => {
  it('should generate a new token', async() => {
    const data = {
      accountId: lookupData.accountId,
    }

    const result = await request(baseUrl)
      .post('/v1/auth/refresh-token')
      .send(data)

    // check response data
    expect(result.statusCode).equal(200)
    expect(result.body.data).to.be.a('string')
    expect(result.body.data).to.not.equal(null)
    expect(result.body.message).equal('Successfully refresh token!')
  })
})


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
})
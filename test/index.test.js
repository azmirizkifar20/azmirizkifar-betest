'use strict'
require('../src')

// setup variables
const request = require('supertest')
const expect = require('chai').expect
const baseUrl = process.env.BASE_URL
let lookupData = {
  token: null,
  accountId: null,
  accountNumber: null,
  registrationNumber: null
}

// execute first test
require('./auth.test')(request, lookupData, expect, baseUrl)
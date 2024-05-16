'use strict'

module.exports = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: '1h',
}
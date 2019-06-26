'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API:'""',
  BASE_URL:'"http://caifulian.mc8866.net"'
})

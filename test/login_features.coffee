should = require 'should'
request = require 'request'
config = require '../config.json'
Browser = require 'zombie'

root_url = config.domain


browser = new Browser()

describe 'Signing in / up', ->
  before (done) ->
    done()

  after (done) ->
    done()

  describe 'A new user signs up with facebook', ->
    it 'should create an account', (done) ->
      browser.visit root_url, (e, browser)  ->
        browser.pressButton "Sign in with Facebook", ->

          done()


const request = require('supertest-as-promised');
const {expect} = require('chai');
const app = require('../app');
const chai = require('chai');
chai.use(require('chai-dom'));
const jsdom = require('mocha-jsdom');

describe('the foundCloud app search bar', () => {
  let $;

  before(() => {
    $ = require('jquery');
    jsdom();
  })

  it('has an input to add text', () => {
    request(app)
    .get(`/`)
    .then(() => {
      document.getElementById('search-bar').should.have.attr('input');
      expect(document.querySelector('input')).to.have.attribute('type', 'text')
    })
  })

  it('has a section with a search-results class to display results', () => {
    request(app)
      .get(`/`)
      .then(() => {
        document.querySelector('.search-results').should.have.attr('div');
        expect(document.querySelector('div')).to.have.attribute('class', 'search-results')
      })
  })

  it('has an aside with a tags class to display GIFs', () => {
    request(app)
      .get(`/`)
      .then(() => {
        document.querySelector('.tags').should.have.attr('aside');
        expect(document.querySelector('aside')).to.have.attribute('class', 'tags')
      })
  })

})

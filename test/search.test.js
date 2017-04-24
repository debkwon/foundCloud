const request = require('supertest-as-promised');
const {expect} = require('chai');
const sinon = require('sinon');
const app = require('../app');

describe('/ Root route', () => {

  before(() => {
    this.spy = sinon.spy(app, 'render');
  });

  after(() => {
    this.spy.restore();
  });

  it('successfully makes a GET "/" request', () =>
    request(app)
      .get(`/`)
      .expect(200)
  )

  it('renders the index template', () =>
     request(app)
      .get('/')
      .then(()=> {
        expect(this.spy.getCall(0).args[0]).to.be.eql('index');
      })
  )

})

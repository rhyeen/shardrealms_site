const basepath = '';
const request = require('supertest');
const app = require('../../app');

/* istanbul ignore next */
describe('healthcheck/* unit tests:', () => {
  it('GET: should return a 200 status ok', (done) => {
    let expectedResult = '{"status":"ok"}';
    request(app)
      .get(basepath + '/healthcheck')
      .expect(200, expectedResult, done);
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import { Done } from 'mocha';

import server from './../server';
chai.use(chaiHttp);

const should = chai.should();

const API_BASE_URL = '/api';

describe('TEST ROUTES', () => {
  context('/api/test/one', () => {
    it('should return successful response', (done: Done): void => {
      chai
        .request(server)
        .get(`${API_BASE_URL}/test/one`)
        .end((err, res) => {
          return done();
        });
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import topicRoutes from '../src/routes/topic.route';
const { expect } = chai;
var jwt = require('jsonwebtoken');
import 'dotenv/config'
import { config } from 'dotenv';
var request = require('supertest');

chai.use(chaiHttp);
chai.should();

describe('/GET Topic', () => {
    it('it should GET all topics', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        chai.request(app)
            .get('/api/topic')
            .set('Authorization', 'Bearer ' + token)
            .end((err, response) => {
                response.body.should.be.a('array')
                done();
            });
    });
});
describe('/GET Topic', () => {
    it('should not be able to consume the route /topic since no token was sent', function (done) {
        request(app)
            .get('/api/topic')
            .expect(401, done);
    });
});
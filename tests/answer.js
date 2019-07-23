import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import answerRoutes from '../src/routes/answer.route';
const { expect } = chai;
var jwt = require('jsonwebtoken');
import { config } from 'dotenv';
var request = require('supertest');
import Answer from '../src/models/answer';

chai.use(chaiHttp);
chai.should();

describe('/POST ANSWER', () => {
    it('it should not be able to post answer since no token was sent', (done) => {
        let answer = {
            answer: "npm install",
            question: '5d31172ca34070092c7400a3',
            user: '5d3109c6ad16b904e331ccfa'
        }
        request(app)
            .post('/api/answer')
            .send(answer)
            .expect(401, done);
    });

});

describe('/POST ANSWER', () => {
    it('it should be able to post answer since token was sent', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        let answer = {
            answer: "npm install",
            question: '5d31172ca34070092c7400a3',
            user: '5d3109c6ad16b904e331ccfa'
        }
        request(app)
            .post('/api/answer')
            .set('Authorization', 'Bearer ' + token)
            .send(answer)
            .end((err, response) => {
                response.body.should.be.a('object')
                expect(response.body).to.have.property('answer');
                expect(response.body).to.have.property('question');
                expect(response.body).to.have.property('user');
                done();
            });
    });

});

describe('/GET ANSWER', () => {
    it('should not be able to get answers since no token was passed', function (done) {
        request(app)
            .get('/api/answer')
            .expect(401, done);
    });
});
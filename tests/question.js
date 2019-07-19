import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import questionRoutes from '../src/routes/question.route';
const { expect } = chai;
var jwt = require('jsonwebtoken');
import { config } from 'dotenv';
var request = require('supertest');
import Question from '../src/models/question';

chai.use(chaiHttp);
chai.should();

describe('/POST QUESTION', () => {
    it('it should not be able to post question since no token was sent', (done) => {
        let question = {
            question: "how to install the sockets npm package",
            topic: '5d31172ca34070092c7400a3',
            user: '5d3109c6ad16b904e331ccfa'
        }
        request(app)
            .post('/api/question')
            .send(question)
            .expect(401, done);
    });

});

describe('/GET QUESTION', () => {
    it('should not be able to get questions since no token was passed', function (done) {
        request(app)
            .get('/api/question')
            .expect(401, done);
    });
});

describe('/POST QUESTION', () => {
    it('it should post question since token was sent', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

        let question = {
            question: "how to install the sockets npm package",
            topic: '5d31172ca34070092c7400a3',
            user: '5d3109c6ad16b904e331ccfa'
        }
        request(app)
            .post('/api/question')
            .set('Authorization', 'Bearer ' + token)
            .send(question)
            .end((err, response) => {
                response.body.should.be.a('object')
                done();
            });
    });

});

describe('/PATCH/:id QUESTION', () => {
    it('it should not UPDATE a question given the id as token not passed', (done) => {
        let question = new Question({ question: "how to install the sockets npm package", topic: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        question.save((err, question) => {
            request(app)
                .patch('/api/question/' + question.id)
                .send({ question: "how to install the socket npm package", topic: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
                .expect(401, done);
        });
    });
});
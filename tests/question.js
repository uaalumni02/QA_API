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

describe('/POST QUESTION', () => {
    it('it should post question since token was sent', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

        let question = {
            question: "how to install the sockets npm package",
            description: "will not save as dev dependency",
            topic: '5d31172ca34070092c7400a3',
            user: '5d3109c6ad16b904e331ccfa'
        }
        request(app)
            .post('/api/question')
            .set('Authorization', 'Bearer ' + token)
            .send(question)
            .end((err, response) => {
                response.body.should.be.a('object')
                expect(response.body).to.have.property('question');
                expect(response.body).to.have.property('description');
                expect(response.body).to.have.property('topic');
                expect(response.body).to.have.property('user');
                done();
            });
    });

});

describe('/GET QUESTION', () => {
    it('should not be able to get questions since no token was passed', function (done) {
        request(app)
            .get('/api/question')
            .expect(401, done);
    });
});

describe('/GET QUESTION', () => {
    it('it should GET all questions', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        chai.request(app)
            .get('/api/question')
            .set('Authorization', 'Bearer ' + token)
            .end((err, response) => {
                expect(response.body[0]).to.have.property('question');
                done();
            });
    });
});

describe('/PATCH/:id QUESTION', () => {
    it('it should not UPDATE a question given the id as token not passed', (done) => {
        let question = new Question({ question: "how to install the sockets npm package", description: "will not save as dev dependency", topic: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        question.save((err, question) => {
            request(app)
                .patch('/api/question/' + question.id)
                .send({ question: "how to install the socket npm package", description: "will not save as dev dependency", topic: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
                .expect(401, done);
        });
    });
});

describe('/PATCH/:id QUESTION', () => {
    it('it should save and update a version of the question given the id as token was passed', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });

        let question = new Question({ question: "how to install the sockets npm package", description: "will not save as dev dependency", topic: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        question.save((err, question) => {
            request(app)
                .patch('/api/question/' + 'question._id')
                .set('Authorization', 'Bearer ' + token)
                .send({ question: "how to install the socket npm package", description: "will not save as dev dependency", topic: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
                .expect(200, done);
            expect(question).to.have.property('question');
            expect(question).to.have.property('description');
            expect(question).to.have.property('topic');
            expect(question).to.have.property('user');
        });
    });
});
describe('/GET/:id question', () => {
    it('it should GET a question by the topic id', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        let question = new Question({ question: "how to close socket", description: "socket stays open", topic: "5d32565659d1a60d1e18e57d", user: '5d324415483fa507cf52343b' });
        question.save((err, question) => {
            const topic = question.topic
            request(app)
                .get('/api/' + topic)
                .set('Authorization', 'Bearer ' + token)
                .send(question)
                .end((err, response) => {
                    response.body.should.be.a('array')
                    expect(response.body[0]).to.have.property('question');
                    expect(response.body[0]).to.have.property('description');
                    expect(response.body[0]).to.have.property('topic');
                    expect(response.body[0]).to.have.property('user');
                    done();
                });

        });

    });
});

describe('/GET/:id question', () => {
    it('it should not GET a question by the topic id as token not passed', (done) => {
        let question = new Question({ question: "how to close socket", description: "socket stays open", topic: "5d32565659d1a60d1e18e57d", user: '5d324415483fa507cf52343b' });
        question.save((err, question) => {
            const topic = question.topic
            request(app)
                .get('/api/question/' + topic)
                .send(question)
                .expect(401)
            done()
        });

    });
});

describe('/DELETE/:id question', () => {
    it('it should DELETE a question by the topic id', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        let question = new Question({ question: "how to close socket", description: "socket stays open", topic: "5d32565659d1a60d1e18e57d", user: '5d324415483fa507cf52343b' });
        question.save((err, question) => {
            const topic = question.topic
            request(app)
                .delete('/api/question/' + topic)
                .set('Authorization', 'Bearer ' + token)
                .end((err, response) => {
                    response.should.have.status(200);
                    expect(response.body).to.be.null;
                    done();
                });

        });

    });
});

describe('/DELETE/:id question', () => {
    it('it should not DELETE a question by the topic id as token not passed', (done) => {
        let question = new Question({ question: "how to close socket", description: "socket stays open", topic: "5d32565659d1a60d1e18e57d", user: '5d324415483fa507cf52343b' });
        question.save((err, question) => {
            const topic = question.topic
            request(app)
                .delete('/api/question/' + topic)
                .expect(401)
            done()
        });

    });
});


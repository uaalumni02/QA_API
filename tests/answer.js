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



describe('/PATCH/:id ANSWER', () => {
    it('it should not UPDATE a answer given the id as token not passed', (done) => {
        let answer = new Answer({ answer: "npm install", question: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        answer.save((err, answer) => {
            request(app)
                .patch('/api/answer/' + answer.id)
                .send({ answer: "google it", question: 'd31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
                .expect(401);
            done();
        });
    });
});

describe('/PATCH/:id ANSWER', () => {
    it('it should UPDATE a answer given the id as token was passed', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        let answer = new Answer({ answer: "npm install", question: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        answer.save((err, answer) => {
            request(app)
                .patch('/api/answer/' + 'answer.id')
                .set('Authorization', 'Bearer ' + token)
                .send({ answer: "google it", question: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
                .expect(200, done);
            answer.should.be.a('object')
            expect(answer).to.have.property('answer');
            expect(answer).to.have.property('question');
            expect(answer).to.have.property('user');

        });
    });
});

describe('/DELETE/:id ANSWER', () => {
    it('it should not DELETE a answer by  id as token not passed', (done) => {
        let answer = new Answer({ answer: "google it", question: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        answer.save((err, answer) => {
            request(app)
                .delete('/api/answer/' + 'answer.id')
                .expect(401)
            done()
        });

    });
});

describe('/DELETE/:id ANSWER', () => {
    it('it should DELETE a answer by id as token is passed', (done) => {
        var token = jwt.sign({
            id: 1,
        }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
        let answer = new Answer({ answer: "google it", question: '5d31172ca34070092c7400a3', user: '5d3109c6ad16b904e331ccfa' })
        answer.save((err, answer) => {
            const id = answer.id
            request(app)
                .delete('/api/answer' + id)
                .set('Authorization', 'Bearer ' + token)
                .end((err, response) => {
                    response.body.should.be.a('object').that.is.empty;
                    done();
                });
        });

    });
});
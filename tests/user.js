import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import userRoutes from '../src/routes/user.route';
const { expect } = chai;
var request = require('supertest');
var jwt = require('jsonwebtoken');
import { config } from 'dotenv';

chai.use(chaiHttp);
chai.should();


describe('POST /login', function () {
    it('it returns JWT token if good username or password', function (done) {
        request(app)
            .post('/api/user/login')
            .type('json')
            .send('{"username":"Todd","password":"password"}')
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body).have.property('token');
                done();
            });
    });
});

it('it responds with JSON if good authorization header', function (done) {
    var token = jwt.sign({
        id: 1,
    }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
    request(app)
        .get('/api/user/')
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            console.log(res)
            // expect(res.body[0]).to.have.property('username');
            // expect(res.body[0]).to.have.property('password');
            if (err) return done(err);
            done();
        });
});

describe('/POST User', () => {
    it('it should POST a new user', (done) => {
        let user = {
            username: "Todd",
            password: "password",
        }
        chai.request(app)
            .post('/api/user')
            .send(user)
            .end((err, response) => {
                response.body.should.be.a('object')
                done();
            });
    });

});


import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import userRoutes from '../src/routes/user.route';
const { expect } = chai;


chai.use(chaiHttp);
chai.should();

//take off auth middleware to test

describe('/GET User', () => {
    it('it should GET all users', (done) => {
        chai.request(app)
            .get('/api/user')
            .end((err, response) => {
                expect({ response: 'username' }).to.deep.equal({ response: 'username' });
                response.body.should.be.a('array').and.to.have.property(0)
                .that.includes.all.keys([ '_id', 'username', 'password' ])
                expect(response).to.have.status(200)
                done();
            });
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
                //because user name exist already
                response.body.should.have.property('message');
                done();
            });
    });

});
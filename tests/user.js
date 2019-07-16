import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
const { expect } = chai;


chai.use(chaiHttp);
chai.should();

describe('/GET User', () => {
    it('it should GET all users', (done) => {
      chai.request(app)
          .get('localhost:3000/api/user')
          .end((err, response) => {
            expect(response.body).to.deep.equal({});
            expect(response).to.have.status(404);
            done();
          });
    });
  });

  describe('/POST User', () => {
    it('it should not POST a new user', (done) => {
        let newUser = {
            username: "John",
            password: "password",
        }
      chai.request(app)
          .post('localhost:3000/api/user')
          .send(newUser)
          .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
            done();
          });
    });
  
  });
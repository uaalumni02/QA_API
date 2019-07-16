import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
const { expect } = chai;


chai.use(chaiHttp);
chai.should();


describe('/GET Topic', () => {
  it('it should GET all topics', (done) => {
    chai.request(app)
        .get('localhost:3000/api/topic')
        .end((err, response) => {
          expect(response.body).to.deep.equal({});
          expect(response).to.have.status(404);
          done();
        });
  });
});
describe('/POST Topic', () => {
  it('it should not POST a new topic', (done) => {
      let newTopic = {
          topic: "Sockets",
      }
    chai.request(app)
        .post('localhost:3000/api/topic')
        .send(newTopic)
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              expect(newTopic).to.have.property('topic', 'Sockets');
          done();
        });
  });

});
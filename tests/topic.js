import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import topicRoutes from '../src/routes/topic.route';
const { expect } = chai;


chai.use(chaiHttp);
chai.should();

//take off auth middleware to test

// describe('/GET Topic', () => {
//     it('it should GET all topics', (done) => {
//         chai.request(app)
//             .get('/api/topic')
//             .end((err, response) => {
//                 response.body.should.be.a('array')
//                 done();
//             });
//     });
// });
// describe('/POST Topic', () => {
//   it('it should not POST a new topic', (done) => {
//       let newTopic = {
//           topic: "Sockets",
//       }
//     chai.request(app)
//         .post('localhost:3000/api/topic')
//         .send(newTopic)
//         .end((err, res) => {
//               res.should.have.status(404);
//               res.body.should.be.a('object');
//               expect(newTopic).to.have.property('topic', 'Sockets');
//           done();
//         });
//   });

// });
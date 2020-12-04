import User from '../src/api/user/user.model';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

const should = chai.should();
const BASE_API = '/api/users';
chai.use(chaiHttp);

describe('User', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        })
    });
    /** TEST GET API USER */
    describe('/GET User', () => {
        it('it should GET all the Users', (done) => {
            chai.request(server)
                .get(BASE_API)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
            
        });
    });
    describe('/POST User (/api/users/register)', () => {
        it('it should not succeed when POST a user without nim field', (done) => {
            let userData = {
                password: "123466",
                name: "Bambank Sinaga",
                class: "X MIPA 7"
            };

            chai.request(server)
                .post(BASE_API+'/register')
                .send(userData)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.message.should.have.property('errors');
                    res.body.message.errors.should.have.property('nim');
                    res.body.message.errors.nim.should.have.property('message');
                    done();
                })
        });
        it('it should succeed when POST a user with full data', (done) => {
            let userData = {
                nim: "123456999",
                password: "123455",
                name: "Anjre Papaya California",
                class: "XI MIPA 1"
            };

            chai.request(server)
                .post(BASE_API+'/register')
                .send(userData)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success');
                    res.body.success.should.have.property('_id');
                    res.body.success.should.have.property('nim');
                    res.body.success.should.have.property('password');
                    res.body.success.should.have.property('class');
                    res.body.success.should.have.property('salt');
                    res.body.success.should.have.property('created');
                    done()
                });
        })
    })
});
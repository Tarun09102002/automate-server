let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js')
chai.should()
chai.use(chaiHttp)

const userid = '63727cd2a6286a821e3f9dce'

describe('User API', () => {
    describe('Register Test', () => {
        describe('Test 1: Valid Username', () => {
            it('Should return success', (done) => {
                chai.request(server)
                    .post('/users/register')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        username: 'test12345678',
                        email: 'test@test.com',
                        password: 'Tfadfdlad12343@@@@'
                    })
                    .end((err, res) => {
                        res.should.have.status('200')
                        done()
                    })
            })
        })
        describe('Test 2: Invalid Username', () => {
            it('Should return error', (done) => {
                chai.request(server)
                    .post('/users/register')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        username: 'test123',
                        email: 'test@test.com',
                        password: 'test'
                    })
                    .end((err, res) => {
                        res.should.have.status('401')
                        done()
                    })
            })
        })
        describe('Test 3: Password Strength', () => {
            it('Should return error', (done) => {
                chai.request(server)
                    .post('/users/register')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        username: 'test1',
                        email: 'test@test.com',
                        password: '123456'
                    })
                    .end((err, res) => {
                        res.should.have.status('401')
                        done()
                    })
            })
        })
    })
    describe('Login Test', () => {
        describe('Test 1: Valid Username', () => {
            it('Should return success', (done) => {
                chai.request(server)
                    .post('/users/login')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        username: 'Tarun123',
                        password: 'TARUNagarwal@123'
                    })
                    .end((err, res) => {
                        res.should.have.status('200')
                        done()
                    })
            })
        })
        describe('Test 2: Invalid Username', () => {
            it('Should return error', (done) => {
                chai.request(server)
                    .post('/users/login')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        username: 'testdafaafda',
                        password: 'test'
                    })
                    .end((err, res) => {
                        res.should.have.status('401')
                        done()
                    })
            })
        })
        describe('Test 3: Invalid Password', () => {
            it('Should return error', (done) => {
                chai.request(server)
                    .post('/users/login')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        username: 'Tarun123',
                        password: '12345678'
                    })
                    .end((err, res) => {
                        res.should.have.status('401')
                        done()
                    })
            })
        })
    })
})
describe('Route API', () => {
    describe('Update User Location', () => {
        describe('Test 1: Valid User', () => {
            it('Should return success', (done) => {
                chai.request(server)
                    .post('/user/locations')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        userid: userid,
                        startObject: {
                            coordinates: ['72.836284', '19.123198'],
                            address: 'Sardar Patel Institute Of Technology, Bhavans college, Mumbai, Maharashtra, India'
                        },
                        endObject: {
                            coordinates: ['72.828284', '19.132694'],
                            address: 'Andheri West, Mumbai, Mumbai Suburban, Maharashtra, India'
                        }
                    })
                    .end((err, res) => {
                        res.should.have.status('200')
                        done()
                    })
            })
        })
        describe('Test 2: Invalid User', () => {
            it('Should return error', (done) => {
                chai.request(server)
                    .post('/user/locations')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send({
                        userid: '637278dd89dca87ebbb1899d',
                        startObject: {
                            coordinates: ['72.836284', '19.123198'],
                            address: 'Sardar Patel Institute Of Technology, Bhavans college, Mumbai, Maharashtra, India'
                        },
                        endObject: {
                            coordinates: ['72.828284', '19.132694'],
                            address: 'Andheri West, Mumbai, Mumbai Suburban, Maharashtra, India'
                        }
                    })
                    .end((err, res) => {
                        res.should.have.status('401')
                        done()
                    })
            })
        })
    })
    describe('Test 3: Has Nearby Users', () => {
        it('Should return success', (done) => {
            chai.request(server)
                .get(`/user/nearby/${userid}`)
                .end((err, res) => {
                    res.should.have.status('200')
                    done()
                })
        })
    })
})

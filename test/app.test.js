const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /app response',()=>{
    it('returns response as expected',()=>{
        supertest(app)
        .get('/apps')
        .expect(200)
        .then(res=>{
            expect(res.body).to.be.an('array')
        })
    })
    it('returns an error response if the sort is not Rating or App',()=>{
        supertest(app)
        .get('/apps')
        .query({sort: 'dog'})
        .expect(400,'sort must include rating or app')
    })
    it('sorts the results correctly',()=>{
        supertest(app)
        .get('/apps')
        .query({'sort':'Rating'})
        .expect(200)
        .then(res=>{
            expect(res.body).to.be.an('array');
            let sorted = true;
            let i = 0;
            while (i < res.body.length -1) {
                const resultAtI = res.body[i];
                const resultAtIPlusI = res.body[i+1];
                if(resultAtI.Rating > resultAtIPlusI.Rating ){
                    sorted = false;
                    break;
                }
                i++;
            }
        expect(sorted).to.be.true;
        });
    });
})
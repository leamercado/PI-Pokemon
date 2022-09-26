/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, Type, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));


  describe('GET /pokemons', () => {
    it('should get 200', (done) =>{

      agent.get('/pokemons').expect(200);
      done();
    });
  });
  
  
  describe("GET /pokemons?name=bulbasaur", () => {
    it ("GET responde con status 200 si encuentra al pokemon", (done)=> {
      agent.get("/pokemons?name=bulbasaur").expect(200);
      done();
    })
  })
});



const { Pokemon, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("Arroja error si name es null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("Debe completar el campo nombre ")))
          .catch(() => done());
      });
      it("Debe continuar cuando se ingresa un nombre", () => {
        Pokemon.create({ name: "Pikachu" });
      });
      it("Arroja error si se repite un pokemon", (done) => {
        Pokemon.create({ name: "lolo" });
        Pokemon.create({ name: "lolo" })
          .then(() => done())
          .catch(() => done(new Error("Requiere un nombre no repetido")));
      });
    });
  });
});

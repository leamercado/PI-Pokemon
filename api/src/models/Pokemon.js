const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      // allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {   
      type: DataTypes.STRING,
    },
    attack: {
      type: DataTypes.STRING,
    },
    defense: {
      type: DataTypes.STRING,
    },
    speed: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.STRING,
    },
    weight: {
      type: DataTypes.STRING,
    },
    image:{  // no obligatorio
      type: DataTypes.STRING

    },
    createdInDb: {
      type:DataTypes.BOOLEAN,
      // allowNull:false,
      defaultValue: true,
    }
  }, 
  {timestamps: false});
};

// tabla con los datos del pokemon, ésto lo relaciono con la tabla Type (donde voy a guardar todos los tipos traidos desde la API). 
// A cada Pokemon creado le voy a poder asignarle tipo/s
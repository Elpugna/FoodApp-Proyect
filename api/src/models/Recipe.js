const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    healthScore:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validator:{
        min:0,
        max: 100,
      }
    },
    score:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validator:{
        min:0,
        max:100,
      }
    },
    summary:{
      //'tiny': 255 chars, TEXT:65535 chars, 'medium':6,777,215 chars and 'long':up to 4Gb of characters
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions:{
      type: DataTypes.JSONB,
      validate:{

      }
    },
    ingredients:{
      type: DataTypes.ARRAY(DataTypes.STRING(25)),

    }
    // TODO: IMAGE UPLOAD (Bynary)
    // image:{
    //   type: DataTypes.STRING,
    //   validator:{
    //     isUrl: true:
    //   }
    // }
  });
};

const validTypes = ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est déjà utilisé !'
        },
        validate: {
          notEmpty: { msg: 'Le nom ne peut être vide.'},
          notNull: { msg: 'Le nom ne peut être nul.'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min : {
            args: [0],
            msg: 'Les points de vie doivent être supérieur ou égal à 0'
          },
           max : {
             args: [100],
             msg : 'Les points de vie ne peuvent être supérieur à 100'
           },
          isInt:{ msg: 'Utilisez uniquement des nombres entiers pour les points de vie.'},
          notNull: {msg: 'Les points de vie sont une propriété requise.'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min : {
            args: [1],
            msg: 'Les points de dégats doivent être supérieur ou égal à 1'
          },
           max : {
             args: [99],
             msg : 'Les points de dégats ne peuvent être supérieur à 99'
           },
          isInt: {msg:'Utilisez uniquement des nombres entiers pour les points de dégats.'},
          notNull: {msg:'Les points de dégats ne peuvent être vide.'}
        }

      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        isURL: {msg:'Respectez le type URL de l\'image.'},
        notNull: {msg:'Respectez le type URL de l\'image.'},
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
            return this.getDataValue('types').split(',')
        },
        set(types){
            this.setDataValue('types', types.join())
        },
        validate: {
          isTypeValid(value){

            if(!value){
              throw new Error('Un pokemon doit au moins avoir un type !')
            }

            if(value.split(',').lengh > 3){
              throw new Error('Un pokemon ne peux pas avoir plus de trois types !')
            }

            value.split(',').forEach(type => {
               if(!validTypes.includes(type)) {
                throw new Error('Le type d\'un pokemon doit appartenir à la liste suivante : ${validTypes}')
              }
            });
            
          }
        }
      }
      
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
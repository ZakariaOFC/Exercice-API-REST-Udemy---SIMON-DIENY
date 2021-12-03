const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemons')
  
let sequelize
if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize('cufs4qcz31ly0umz', 'mtdc1xciugdmfr4t', 'sdvdz1gx5q2j5qs5', { 
        host : 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        logging: true
    }) 
} else {
    sequelize = new Sequelize('nodejs_pokemons_api', 'root', '', { 
        host : 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        logging: false
    }) 
}

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
  
const initDb = () => {
  return sequelize.sync().then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
    })

    bcrypt.hash('mdp123',10)
    .then(hash => User.create({ username: 'Zakaria', password: hash}))
    .then(user => console.log(user.toJSON()))
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}
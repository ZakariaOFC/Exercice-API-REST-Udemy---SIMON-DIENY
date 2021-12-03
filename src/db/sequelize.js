const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemons')
  
const sequelize = new Sequelize('nodejs_pokemons_api', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
  
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
      .catch(error =>{
        const message = "Pokemons Loaded"
        res.status(500).json({message, data: error})
      })
    })

    bcrypt.hash('mdp123',10)
    .then(hash => User.create({ username: 'Zakaria', password: hash}))
    .then(user => console.log(user.toJSON()))
    .catch(error =>{
      const message = "Hash Loaded"
      res.status(500).json({message, data: error})
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, Pokemon, User
}
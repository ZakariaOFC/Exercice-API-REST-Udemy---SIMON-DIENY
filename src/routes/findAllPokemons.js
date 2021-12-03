const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.get('/api/pokemons',auth, (req, res) => {
    if (req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit)
      console.log(name)
      console.log(limit)
      
      return Pokemon.findAndCountAll({
          where :{
            name : {                      // 'name' est la propriété du modèle pokémon
              [Op.like]: '%'+ name +'%'   // 'name' est le critère de recherche
            }
          },
          order: ['name'],
          limit: limit
      })

    .then(({count, rows}) => {
      if(name.length < 2 ){
        const message = ('Il faut un minimum de 2 caractères dans le filtre limite')
        res.status(400).json(message)
      }else{
        const message = ('Il y a ' + count + ' pokemon(s) qui correspond(ent) au terme(s) de recherche : ' + name)
        res.json({ message, data: rows })
      }
    })
  }else{  
      Pokemon.findAll({ order: ['name'] })
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error =>{
        const message = "La liste des pokémons n'a pas pu être récupérée. Réessayez plus tard."
        res.status(500).json({message, data: error})
      })
    }
  })
}
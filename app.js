const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const config = require('./assets/config.json')


const app = express()


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

app.use((res) =>{
    const message = 'Impossible de trouver la ressource demandé ! Essayer une autre URL'
    res.status(404).json(message)
})

app.listen(config.port, ()=> console.log('@@@ http://localhost:'+ config.port)) 
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const config = require('./assets/config.json')
const port = 8080 || process.env.PORT

const app = express()

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Heroku test 😂')
})

console.log(process.env.PORT)

require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

app.use((res) =>{
    const message = 'Impossible de trouver la ressource demandé ! Essayer une autre URL'
    res.status(404).json(message)
})

app.listen(port, ()=> console.log('@@@ http://localhost:'+ port)) 
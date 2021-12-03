const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const port = process.env.PORT

const app = express()

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    return res.json(console.log('Hello 🙃'))
})

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

console.log(process.env.PORT)
app.listen(port, ()=> console.log('Connected : ✔️')) 
const express = require('express')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const port = 8080 || process.env.PORT

let sequelize 

if (process.env.NODE_ENV === 'production') {
    const sequelize = new sequelize('cufs4qcz31ly0umz', 'mtdc1xciugdmfr4t', 'vqgqdk1r80hytgtf', { 
        host : 'uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        logging: true
    }) 
} else {
    const sequelize = new sequelize('nodejs_pokemons_api', 'root', '', { 
        host : 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: "Etc/GMT-2"
        },
        logging: false
    }) 
}

const app = express()

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Heroku test 😂')
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
app.listen(port, ()=> console.log('@@@ http://localhost:'+ port)) 
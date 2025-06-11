import express from 'express'
import cookieParser from 'cookie-parser'

import database from './db/database.js'
import routes from './routes.js'
import './models/Associations.js'
import User from './models/User.js'

database.sync()

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(routes)

app.listen(3000, () => {
    console.log('Servidor na porta 3000')
})

// User.create({ name: 'Gustavo Varela', email: 'gustavo_20@mail.com', password: '225566' })
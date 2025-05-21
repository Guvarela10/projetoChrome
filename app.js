import express from 'express'

import database from './db.js'
import routes from './routes.js'
import './models/Associations.js'

database.sync()

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3000, ()=>{
    console.log('Servidor na porta 3000')
})
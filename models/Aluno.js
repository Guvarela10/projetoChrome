import { Sequelize } from 'sequelize'

import database from '../db/database.js'

const Aluno = database.define('alunos', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.STRING,
        allowNull: false    
    }
})

export default Aluno
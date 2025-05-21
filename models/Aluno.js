import { Sequelize } from 'sequelize'

import database from '../db.js'

const Aluno = database.define('alunos', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Aluno
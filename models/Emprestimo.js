import { Sequelize } from 'sequelize'

import database from '../db.js'

const Emprestimo = database.define('emprestimos', {
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Emprestimo
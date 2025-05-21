import { Sequelize } from 'sequelize'

import database from '../db.js'

const Chrome = database.define('chromes', {
    serialNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Chrome
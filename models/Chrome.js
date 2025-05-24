import { Sequelize } from 'sequelize'

import database from '../db/database.js'

const Chrome = database.define('chromes', {
    serialNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

export default Chrome
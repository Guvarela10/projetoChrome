import { Sequelize } from 'sequelize'

import database from '../db/database.js'

const User = database.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false    
    }
})

export default User
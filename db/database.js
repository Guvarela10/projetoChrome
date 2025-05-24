import { Sequelize } from 'sequelize'
import config from './config.js'

// CRIANDO BANCO DE DADOS
const database = new Sequelize(config.production)

// TRY CATCH PARA INICIAR O BANCO DE DADOS
try {
    await database.authenticate()

    console.log("Banco de Dados inicializado com sucesso!")
} catch (error) {
    console.log("Erro ao inicializar o banco: ", error)
}

// EXPORTANDO DATABASE PARA OUTROS ARQUIVOS
export default database
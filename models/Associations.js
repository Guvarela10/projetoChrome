import Aluno from './Aluno.js'
import Chrome from './Chrome.js'
import Emprestimo from './Emprestimo.js'

Emprestimo.belongsTo(Aluno, { foreignKey: 'alunoId' })
Aluno.hasMany(Emprestimo, { foreignKey: 'alunoId' })

Emprestimo.belongsTo(Chrome, { foreignKey: 'chromeId' })
Chrome.hasMany(Emprestimo, { foreignKey: 'chromeId' })


import Chrome from '../models/Chrome.js'
import Aluno from '../models/Aluno.js'
import Emprestimo from '../models/Emprestimo.js'

// CRIANDO EMPRESTIMO
async function createEmprestimo(req, res) {
    const { chromeId } = req.params
    const { status, alunoId } = req.body

    const emprestimo = await Emprestimo.create({ status, alunoId, chromeId })

    if (emprestimo) {
        res.status(201).json('Emprestimo criado!')
    } else {
        res.status(500).json('Não foi possível criar o emprestimo!')
    }

}

// AQUI ESTÁ TRAZENDO EMPRESTIMO DE UM ALUNO SÓ
async function getEmprestimoByAlunoId(req, res) {
    const { alunoId } = req.params

    const aluno = await Aluno.findByPk(alunoId, { include: 'emprestimos' })
    const emprestimos = aluno.emprestimos

    if (emprestimos) {
        res.json(emprestimos.map(emprestimo => emprestimo.toJSON()))
    } else {
        res.status(500).json('Não foi possível buscar os emprestimos')
    }
}

// AQUI ESTA TRAZENDO TODOS OS EMPRESTIMOS FILTRANDO POR STATUS
async function getAllEmprestimosWhereStatus(req, res) {
    const { status } = req.params

    const emprestimos = await Emprestimo.findAll({
        where: {
            status
        }
    })

    if (emprestimos) {
        res.json(emprestimos.map(emprestimo => emprestimo.toJSON()))
    } else {
        res.status(500).json({ message: 'Não foi possível buscar alunos!' })
    }
}

// AQUI ESTÁ ATUALIZANDO O EMPRESTIMO PEGANDO DIRETAMENTE PELO ID
async function updateEmprestimoById(req, res) {
    const { emprestimoId } = req.params
    const { status } = req.body

    const emprestimo = await Emprestimo.findByPk(emprestimoId)

    if (!emprestimo) {
        return res.status(400).json('Emprestimo não encontrado!')
    }

    if (status) emprestimo.status = status

    try {
        await emprestimo.validate()
    } catch (error) {
        return res.status(400).json('Informações do emprestimo inválidas: ' + error.message)
    }

    try {
        await emprestimo.save()
        res.status(200).json('Emprestimo atualizado com sucesso!')
    } catch (error) {
        res.status(500).json('Erro ao atualizar emprestimo: ' + error.message)
    }
}


// AQUI ESTA APAGANDO O EMPRESTIMO PELO ID DO USUARIO
async function deleteEmprestimoByAlunoId(req, res) {
    const { alunoId } = req.params

    const emprestimo = await Emprestimo.destroy({
        where: {
            alunoId
        }
    })

    if (emprestimo) {
        res.status(200).json('Emprestimo exluido com sucesso')
    } else {
        res.status(500).json('Não foi possivel excluir emprestimo')
    }
}

export default { createEmprestimo, getEmprestimoByAlunoId, updateEmprestimoById, getAllEmprestimosWhereStatus, deleteEmprestimoByAlunoId }
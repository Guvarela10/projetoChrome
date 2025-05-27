// IMPORTANDO A MODEL DE ALUNOS PARA ACESSARMOS O BANCO
import Aluno from '../models/Aluno.js'
import Emprestimo from '../models/Emprestimo.js'

// FUNÇÃO PARA CRIAR ALUNOS, PEGA O QUE A GENTE COLOCAR NO BODY DA REQUISIÇÃO E USA O .CREATE() PARA CRIAR
async function createAluno(req, res) {
    const { name, matricula } = req.body
    const aluno = await Aluno.create({ name, matricula })

    if (aluno) {
        res.status(201).json(aluno.toJSON())
    } else {
        res.status(500).json({ message: 'Não foi possível criar o aluno!' })
    }
}

// FUNÇÃO PARA PEGAR TODOS OS ALUNOS DO BANCO, SOMENTE USANDO UM .FINDALL() QUE TRÁS PARA A GENTE UM ARRAY 
async function getAllAlunos(_req, res) {
    const alunos = await Aluno.findAll()

    if (alunos) {
        res.json(alunos.map(aluno => aluno.toJSON()))
    } else {
        res.status(500).json({ message: 'Não foi possível buscar alunos!' })
    }
}

// AQUI ESTA TRAZENDO TODOS OS ALUNOS FILTRANDO POR STATUS
// async function getAllAlunosWhereStatus(req, res) {
//     const { status } = req.params

//     const alunos = await Aluno.findAll({
//         where: {
//             status: status
//         }
//     })

//     if (alunos) {
//         res.json(alunos.map(aluno => aluno.toJSON()))
//     } else {
//         res.status(500).json({ message: 'Não foi possível buscar alunos!' })
//     }
// }

// FUNÇÃO PARA PEGAR SOMENTE UM ALUNO, PASSANDO COMO PARÂMETRO O ID DO ALUNO, QUE A GENTE PEGA NA REQUISIÇÃO, USANDO O REQ.PARAMS
async function getAlunoById(req, res) {
    const { alunoId } = req.params

    const aluno = await Aluno.findByPk(alunoId)

    if (aluno) {
        res.status(200).json(aluno.toJSON())
    } else {
        res.status(500).json({ message: 'Não foi possível buscar o aluno!' })
    }
}

// FUNÇÃO PARA ATUALIZAR UM ALUNO, PUXANDO PELO ID TAMBÉM, MESMO ESQUEMA DO GET, PASSA COMO PARÂMETRO O ID DO ALUNO
// UM IF PARA VERIFICAR SE O ALUNO QUE FOI PASSADO REALMENTE EXISTE OU É VALIDO
// DEPOIS USAMOS OUTRO IF PARA VER SE PASSARMOS O NOME, MATRICULA E STATUS NO BODY
// DEPOIS PASSAMOS PELA VALIDADE, E POR ULTIMO, O SAVE PARA SALVARMOS A ALTERAÇÃO NO BANCO
async function updateAlunoById(req, res) {
    const { alunoId } = req.params
    const { name, matricula } = req.body

    const aluno = await Aluno.findByPk(alunoId)

    if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado!' })
    }

    if (name) aluno.name = name
    if (matricula) aluno.matricula = matricula

    try {
        await aluno.validate()
    } catch (error) {
        return res.status(400).json({ error: 'Informações do aluno inválidas: ' + error.message })
    }

    try {
        await aluno.save()
        res.status(200).json('Aluno atualizado com sucesso!')
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar aluno: ' + error.message })
    }
}

// AQUI ESTA APAGANDO O ALUNO POR ID
async function deleteAlunoById(req, res) {
    const { alunoId } = req.params
    const emprestimo = await Emprestimo.destroy({
        where: {
            alunoId: alunoId
        }
    })
    const aluno = await Aluno.destroy({
        where: {
            id: alunoId
        }
    })

    if (aluno || emprestimo) {
        res.status(201).json('Aluno excluido com sucesso!')
    } else {
        res.status(500).json({ message: 'Não foi possível excluir o aluno!' })
    }
}

// EXPORTANDO AS FUNÇÕES PARA O ROUTES PODER TRABALHAR
export default { createAluno, getAllAlunos, getAlunoById, updateAlunoById, deleteAlunoById }
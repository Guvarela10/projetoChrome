// IMPORTANDO A MODEL DE CHROME PARA ACESSARMOS O BANCO
import Chrome from '../models/Chrome.js'
import Emprestimo from '../models/Emprestimo.js'

// FUNÇÃO PARA CRIAR CHROME, PEGA O QUE A GENTE COLOCAR NO BODY DA REQUISIÇÃO E USA O .CREATE() PARA CRIAR
async function createChrome(req, res) {
    const { serialNumber } = req.body
    const chrome = await Chrome.create({ serialNumber })

    if (chrome) {
        res.status(201).json(chrome.toJSON())
    } else {
        res.status(500).json({ message: 'Não foi possível criar o Chromebook!' })
    }
}

// FUNÇÃO PARA PEGAR TODOS OS CHROMES DO BANCO, E VERIFICAR SE O CHROMEBOOK ESTÁ COM UM EMPRESTIMO, POR MEIO DO ISBORROWED SOMENTE USANDO UM .FINDALL() QUE TRÁS PARA A GENTE UM ARRAY
async function getAllChromes(_req, res) {
    try {
        const chromes = await Chrome.findAll()

        const emprestimosAtivos = await Emprestimo.findAll({
            where: { status: 'ativo' }
        })

        // Mapeia os chromes e adiciona isBorrowed = true se tiver empréstimo ativo para aquele chrome
        const resultado = chromes.map(chrome => {
            const emprestimoAtivo = emprestimosAtivos.some(e => e.chromeId === chrome.id)
            return {
                ...chrome.toJSON(),
                isBorrowed: emprestimoAtivo
            }
        })

        res.json(resultado)
    } catch (error) {
        res.status(500).json({ message: 'Não foi possível buscar Chromebooks!' })
    }
}

// FUNÇÃO PARA PEGAR SOMENTE UM CHROME, PASSANDO COMO PARÂMETRO O ID DO CHROME, QUE A GENTE PEGA NA REQUISIÇÃO, USANDO O REQ.PARAMS
async function getChromeById(req, res) {
    const { chromeId } = req.params
    const chrome = await Chrome.findByPk(chromeId)

    if (chrome) {
        res.status(200).json(chrome.toJSON())
    } else {
        res.status(500).json({ message: 'Não foi possível buscar o Chromebook' })
    }
}

// FUNÇÃO PARA ATUALIZAR UM CHROME, PUXANDO PELO ID TAMBÉM, MESMO ESQUEMA DO GET, PASSA COMO PARÂMETRO O ID DO CHROME
// UM IF PARA VERIFICAR SE O CHROME QUE FOI PASSADO REALMENTE EXISTE OU É VALIDO
// DEPOIS USAMOS OUTRO IF PARA VER SE PASSAMOS O SERIAL NUMBER NO BODY
// DEPOIS PASSAMOS PELA VALIDADE, E POR ULTIMO, O SAVE PARA SALVARMOS A ALTERAÇÃO NO BANCO
async function updateChromeByPk(req, res) {
    const { chromeId } = req.params
    const { serialNumber } = req.body

    const chrome = await Chrome.findByPk(chromeId)

    if (!chrome) {
        return res.status(400).json({ message: 'Chromebook não encontrado!' })
    }

    if (serialNumber) chrome.serialNumber = serialNumber

    try {
        await chrome.validate()
    } catch (error) {
        return res.status(400).json({ message: 'Informações do Chromebook inválidas: ' + error.message })
    }

    try {
        await chrome.save()
        res.status(200).json('Chromebook atualizado com sucesso!')
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar Chromebook: ' + error.message })
    }
}

// AQUI ESTA APAGANDO O CHROME POR ID
async function deleteChromeById(req, res) {
    const { chromeId } = req.params
    const chrome = await Chrome.destroy({
        where: {
            id: chromeId
        }
    })
    const emprestimo = await Emprestimo.destroy({
        where: {
            chromeId
        }
    })

    if (chrome || emprestimo) {
        res.status(200).json('Chromebook excluido com sucesso!')
    } else {
        res.status(500).json({ message: 'Não foi possível excluir o Chromebook!' })
    }
}

// EXPORTANDO AS FUNÇÕES PARA O ROUTES PODER TRABALHAR
export default { createChrome, getAllChromes, getChromeById, updateChromeByPk, deleteChromeById }
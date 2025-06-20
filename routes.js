import { Router } from 'express'

import AlunosController from './controllers/AlunosController.js'
import ChromesController from './controllers/ChromesController.js'
import EmprestimosController from './controllers/EmprestimosController.js'
import UserController from './controllers/UserController.js'

const router = Router()

//ROTAS PARA TABELA ALUNOS
router.post('/alunos', AlunosController.createAluno)
router.get('/alunos', AlunosController.getAllAlunos)
router.get('/alunos/:alunoId', AlunosController.getAlunoById)
router.put('/alunos/:alunoId', AlunosController.updateAlunoById)
router.delete('/alunos/delete/:alunoId', AlunosController.deleteAlunoById)

//ROTAS PARA TABELA CHROME
router.post('/chromes', ChromesController.createChrome)
router.get('/chromes', ChromesController.getAllChromes)
router.get('/chromes/:chromeId', ChromesController.getChromeById)
router.put('/chromes/:chromeId', ChromesController.updateChromeByPk)
router.delete('/chromes/delete/:chromeId', ChromesController.deleteChromeById)

//ROTAS PARA TABELA EMPRESTIMO
router.post('/chromes/:chromeId/emprestimos', EmprestimosController.createEmprestimo)
router.get('/emprestimos/status/:status', EmprestimosController.getAllEmprestimosWhereStatus)
router.get('/emprestimos/:alunoId', EmprestimosController.getEmprestimoByAlunoId)
router.put('/emprestimos/:emprestimoId', EmprestimosController.updateEmprestimoById)
router.delete('/emprestimos/delete/:emprestimoId', EmprestimosController.deleteEmprestimoByAlunoId)

//ROTAS PARA TABELA USER
router.post('/users/login', UserController.login)

export default router
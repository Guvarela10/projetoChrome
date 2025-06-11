import { Router } from "express";
import jwt from 'jsonwebtoken';

import User from '../models/User.js'

const SECRET_KEY = 'chave-privada'

async function login (req, res)  {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
        return res.status(404).send('Usuário não encontrado')
    }

    if (user.password !== password) {
        return res.status(401).send('Email ou senha incorreto!')
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 600 })

    res.cookie('Authentication', token, { httpOnly: true })
    res.send('Usuário logado com sucesso')

    console.log (token)
}

export default { login }
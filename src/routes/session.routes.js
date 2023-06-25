import { Router } from "express";
import passport from "passport";
import { JWT_COOKIE_NAME } from '../utils.js'

const router = Router()

//Vista para registrar usuarios
router.get('/login-register', (req, res) => {
    res.render('login.register')
})

// API para crear usuarios en la DB
router.post('/login-register', passport.authenticate('login-register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login')
})
router.get('/failregister', (req, res) => {
    console.log('Fail Strategy');
    res.send({ error: "Failed" })
})

// Vista de Login
router.get('/login', (req, res) => {
    res.render('login')
})

// API para login
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentiales" })
    }
    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products')
})

router.get('/faillogin', (req, res) => {
    res.send({error: "Fail Login"})
})

// Cerrar Session
router.get('/logout', (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME).redirect('/session/login')
})



export default router
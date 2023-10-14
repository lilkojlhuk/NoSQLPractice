import { Router } from 'express'
import { register, login, current, getUserRole } from '../controllers/userController.js'
import { checkAuth } from '../middleware/checkAuth.js'

const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.get('/current', checkAuth, current)
router.get('/role', checkAuth, getUserRole)

export default router
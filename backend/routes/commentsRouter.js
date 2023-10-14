import { Router } from 'express'
import { checkAuth } from '../middleware/checkAuth.js'
import { createComments, getAllComments } from '../controllers/commentsController.js'

const router = new Router()

router.post('/addcomm', checkAuth, createComments)
router.get('/allcomm', checkAuth, getAllComments)

export default router
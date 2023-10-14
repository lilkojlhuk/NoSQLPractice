import { Router } from 'express'
import userRouter from './userRouter.js'
import commentsRouter from './commentsRouter.js'
import recordRouter from './recordRouter.js'

const router = new Router

router.use('/user', userRouter)
router.use('/comments', commentsRouter)
router.use('/record', recordRouter)

export default router
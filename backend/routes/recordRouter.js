import { Router } from 'express'
import { checkAuth } from '../middleware/checkAuth.js'
import { createRecords, getAllRecords, getOneRecord, updateRecordAnswer, deleteRecordById } from '../controllers/recordsController.js'

const router = new Router()

router.post('/add', checkAuth, createRecords)
router.get('/all', checkAuth, getAllRecords)
router.get('/all/:id', checkAuth, getOneRecord)
router.put('/edit/:id', checkAuth, updateRecordAnswer)
router.delete('/remove/:id', checkAuth, deleteRecordById)

export default router
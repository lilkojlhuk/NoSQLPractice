import { createRecord, getAllRecord, getRecordById, updateRecord, deleteRecord } from '../dao/recordsDao.js'
import User from '../models/User.js'

export const createRecords = async (req, res) => {
    try {
        const { title, text } = req.body
        const userId = req.userId

        if (!title || !text || !userId) {
            return res.json({ message: 'Заповніть обов`язкові поля' })
        }

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ message: 'Користувача не знайдено' })
        }

        const newRecordData = { title, text, author: userId }
        const newRecord = await createRecord(newRecordData)

        user.posts.push(newRecord._id)
        await user.save()

        res.json(newRecord)
    } catch (error) {
        res.json({ message: 'Невідома помилка при створенні посту' })
    }
}

export const getAllRecords = async (req, res) => {
    try {
        const userId = req.userId
        const role = req.user.role

        const records = await getAllRecord(userId, role)

        res.json(records)
    } catch (error) {
        res.json({ message: 'Помилка при отриманні коментарів' })
    }
}

export const getOneRecord = async (req, res) => {
    try {
        const recordId = req.params.id

        const record = await getRecordById(recordId)

        if (!record) {
            return res.json({ message: 'Запись не найдена' })
        }

        res.json(record)
    } catch (error) {
        res.json({ message: 'Помилка при отриманні записи' })
    }
}

export const updateRecordAnswer = async (req, res) => {
    try {
        const recordId = req.params.id
        const newAnswer = req.body.answer

        const updatedRecord = await updateRecord(recordId, newAnswer)

        if (!updatedRecord) {
            return res.json({ message: 'Запись не найдена' })
        }

        return res.json(updatedRecord)
    } catch (error) {
        return res.json({ message: 'Помилка при оновленні запису' })
    }
}

export const deleteRecordById = async (req, res) => {
    try {
        const recordId = req.params.id

        const deletedRecord = await deleteRecord(recordId)

        return res.json({ message: 'Запис успішно видалено' })
    } catch (error) {
        return res.json({ message: 'Запис не знайдено або сталася помилка під час видалення' })
    }
}
import Records from '../models/Records.js'

export const createRecord = async (recordData) => {
    try {
        const record = new Records(recordData)

        return await record.save()
    } catch (error) {
        throw error
    }
}

export const getAllRecord = async (userId, role) => {
    try {
        if (role === "ADMIN") {
            const records = await Records.find()
            return records
        } else {
            const records = await Records.find({ author: userId })
            return records
        }
    } catch (error) {
        throw error
    }
}

export const getRecordById = async (recordId) => {
    try {
        const record = await Records.findById(recordId)

        return record
    } catch (error) {
        throw error
    }
}

export const updateRecord = async (recordId, newAnswer) => {
    try {
        const updatedRecord = await Records.findByIdAndUpdate(
            recordId,
            { $set: { answer: newAnswer } },
            { new: true }
        )

        return updatedRecord
    } catch (error) {
        throw error
    }
}

export const deleteRecord = async (recordId) => {
    try {
        const deletedRecord = await Records.findByIdAndRemove(recordId)

        if (!deletedRecord) {
            throw new Error('Запис не знайдено')
        }

        return deletedRecord
    } catch (error) {
        throw error
    }
}
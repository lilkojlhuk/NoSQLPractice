import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeRecord } from '../../redux/features/record/recordSlice'
import { checkRole } from '../../redux/features/auth/authSlice'
import './Record.scss'

const Record = () => {
    const [record, setRecord] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()
    const router = useNavigate()
    const userRole = useSelector(checkRole)

    const fetchRecord = useCallback(async () => {
        const { data } = await axios.get(`/record/all/${params.id}`)
        setRecord(data)
    }, [params.id])

    useEffect(() => {
        fetchRecord()
    }, [fetchRecord])

    if (!record) {
        return null
    }

    const removeRecordHandler = async () => {
        try {
            const response = await axios.delete(`/record/remove/${params.id}`)
            if (response.data.message === 'Запис успішно видалено') {
                dispatch(removeRecord(params.id))
                router('/all')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='record'>
            <div className="container">
                {record && (
                    <div className="record__content">
                        <span className='record__content-title'>Назва:</span>
                        <p className='record__content-descr'>{record.title}</p>
                        <span className='record__content-title'>Опис:</span>
                        <p className='record__content-date'>{record.text}</p>
                        <span className='record__content-title'>Відповідь:</span>
                        <h1 className='record__content-status'>{record.answer}</h1>
                        {userRole === "ADMIN"
                            ?
                            <div className='record__content-buttons'>
                                <button className='record__content-btn' onClick={removeRecordHandler}>Видалити</button>
                                <button className='record__content-btn' onClick={() => router(`/edit/${params.id}`)}>Відповісти</button>
                            </div>
                            :
                            <div className='record__content-buttons'>
                                <button className='record__content-btn' onClick={removeRecordHandler}>Видалити</button>
                            </div>
                        }
                    </div>
                )}
            </div>
        </section>
    )
}

export default Record

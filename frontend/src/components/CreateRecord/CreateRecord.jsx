import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import { createRecord } from '../../redux/features/record/recordSlice'
import './CreateRecord.scss'

const CreateRecord = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const { status } = useSelector((state) => state.record)
    const dispatch = useDispatch()
    const router = useNavigate()

    const handleSubmit = () => {
        try {
            dispatch(createRecord({ title, text }))
            setTitle('')
            setText('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='createRecord'>
            <div className="container">
                <div className='createRecord__content'>
                    <h1 className='createRecord__form-title'>Створення запису</h1>
                    <form className='createRecord__form' onSubmit={e => e.preventDefault()}>
                        <input
                            type='text'
                            className='createRecord__form-input'
                            placeholder='Назва...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            className='createRecord__form-input'
                            placeholder='Опис...'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        {status ? <h1 className='createRecord__form-status'>{status}</h1> : ''}
                        <div className='createRecord__form-button'>
                            <button className='createRecord__form-btn' type='submit' onClick={handleSubmit}>Додати</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default CreateRecord
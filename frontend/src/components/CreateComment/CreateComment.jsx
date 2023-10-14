import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../redux/features/comment/commentSlice'

const CreateRecord = () => {
    const [comment, setComment] = useState('')
    const { status } = useSelector((state) => state.comment)
    const dispatch = useDispatch()
    const router = useNavigate()

    const handleSubmit = () => {
        try {
            dispatch(createComment({ comment }))
            setComment('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='createRecord'>
            <div className="container">
                <div className='createRecord__content'>
                    <h1 className='createRecord__form-title'>Створення коментаря</h1>
                    <form className='createRecord__form' onSubmit={e => e.preventDefault()}>
                        <textarea
                            className='createRecord__form-input'
                            placeholder='Коментар...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllComment } from '../../redux/features/comment/commentSlice'

const MyComments = () => {
    const dispatch = useDispatch()
    const { comments } = useSelector((state) => state.comment)
    const router = useNavigate()

    useEffect(() => {
        dispatch(getAllComment())
    }, [dispatch])

    if (!comments.length) {
        return (
            <h1 className='myRecords__item-null'>Коментарів не існує</h1>
        )
    }
    return (
        <section className='myRecords'>
            <div className="container">
                <div className="myRecords__content">
                    <ul className='myRecords__list'>
                        {comments?.map((i, index) => (
                            <li className='myRecords__item' key={index}>
                                <p className='myRecords__item-descr'>Коментар: {i.comment}</p>
                                <p className='myRecords__item-author'>Автор: {i.author}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default MyComments


import { Route, Routes } from "react-router-dom"
import Error from './Error/Error'
import MainPage from "../pages/MainPage"
import PostsListPage from "../pages/PostsListPage"
import CommentsListPage from "../pages/CommentsListPage"
import PostPage from "../pages/PostPage"
import EditPostPage from "../pages/EditPostPage"
import AddPostPage from "../pages/AddPostPage"
import AddCommentPage from "../pages/AddCommentPage"
import RegisterPage from "../pages/RegisterPage"
import LoginPage from "../pages/LoginPage"
import { useSelector } from "react-redux"
import { checkIsAuth } from "../redux/features/auth/authSlice"


const AppRouter = () => {
    const isAuth = useSelector(checkIsAuth)

    return (
        <div>
            {isAuth
                ?
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/all" element={<PostsListPage />} />
                    <Route path="/allcomm" element={<CommentsListPage />} />
                    <Route path="all/:id" element={<PostPage />} />
                    <Route path="/edit/:id" element={<EditPostPage />} />
                    <Route path="/remove/:id" element={<PostPage />} />
                    <Route path="/add" element={<AddPostPage />} />
                    <Route path="/addcomm" element={<AddCommentPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Error />} />
                </Routes>
                :
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            }
        </div>
    )
}

export default AppRouter
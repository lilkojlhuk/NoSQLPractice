import jwt from "jsonwebtoken"

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = decoded
            req.userId = decoded.id

            next()
        } catch (error) {
            return res.json({ message: 'Користувач не авторизований' })
        }
    } else {
        return res.json({ message: 'Невідома помилка' })
    }
}
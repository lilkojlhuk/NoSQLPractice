import { createUser, findUserByUsername, findUserById } from '../DAO/userDao.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.json({ message: 'Заповніть обов`язкові поля' })
        }

        const existingUser = await findUserByUsername(username)

        if (existingUser) {
            return res.json({ message: 'Користувач з таким username вже існує' })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await createUser({ username, password: hash })

        const token = jwt.sign({
            id: newUser._id,
            username: newUser.username,
            role: newUser.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )

        res.json({ token, message: 'Регистрация прошла успешно' })
    } catch (error) {
        res.json({ message: 'Помилка при створенні користувача' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await findUserByUsername(username)

        if (!user) {
            return res.json({ message: 'Користувач з таким email не існує' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({ message: 'Невірний пароль' })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )

        res.json({ token, message: 'Ви увійшли до системи' })
    } catch (error) {
        res.json({ message: 'Помилка авторизації' })
    }
}

export const current = async (req, res) => {
    try {
        const userId = req.userId
        const user = await findUserById(userId)

        if (!user) {
            return res.json({ message: 'Даного користувача не існує' })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role,
        },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )

        res.json({ token, message: 'Ви увійшли до системи' })
    } catch (error) {
        res.json({ message: 'Немає доступу' })
    }
}

export const getUserRole = async (req, res) => {
    try {
        const userRole = req.user.role

        return res.json({ userRole })

    } catch (error) {
        return res.json({ message: 'Невідома помилка' })
    }
}

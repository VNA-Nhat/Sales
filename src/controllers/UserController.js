const UserService = require("../service/UserService"); // goi den user service
const JwtService = require('../service/JwtService')

const createUser = async(req, res) => {
    try {
        const {name, email, password, confirmPassword, phone} =req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ // phuong thuc xac thuc email don gian
        const isCheckemail = reg.test(email) // kiem tra email dung cu phap
        if (!name || !email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }else if(!isCheckemail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ // validate email addresses
        const isCheckemail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email or password is incorrect'
            })
        }else if(!isCheckemail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Incorrect email'
            })
        }
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data) //nếu có Id thì sẽ đẩy qua userService
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async(req, res) => {
    try {
        const userId = req.params.id;
        // const token = req.headers;
        if (!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId) //nếu có Id thì sẽ đẩy qua userService
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The ids is required'
            })
        }
        const response = await UserService.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => { //nếu có Id thì sẽ đẩy qua userService
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailUser = async(req, res) => {
    try {
        const userId = req.params.id;
        if (!userId){
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.getDetailUser(userId) //nếu có Id thì sẽ đẩy qua userService
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const RefreshToken = async(req, res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        if (!token){
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.RefreshTokenService(token) //nếu có Id thì sẽ đẩy qua userService
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {createUser, loginUser, updateUser, deleteUser, deleteMany, getAllUser, getDetailUser, RefreshToken, logoutUser}
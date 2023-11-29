const UserService = require("../service/UserService") // goi den user service

const createUser = async(req, res) => {
    try {
        console.log(req.body);
        const {name, email, password, confirmPassword, phone} =req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ // phuong thuc xac thuc email don gian
        const isCheckemail = reg.test(email) // kiem tra email dung cu phap
        if (!name || !email || !password || !confirmPassword || !phone) {
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
        const {email, password, confirmPassword} =req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ // validate email addresses
        const isCheckemail = reg.test(email)
        if (!email || !password || confirmPassword) {
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
        else if(password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Incorrect password'
            })
        }
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async(req, res) => {
    try {
        const userId = req.params.id;
        console.log('userId', userId); 
        const response = await UserService.loginUser(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {createUser, loginUser, updateUser};
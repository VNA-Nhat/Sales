const UserService = require("../service/UserService")


const createUser = async(req, res) => {
    try {
        const {name, email, password, confirmPassword, phone} =req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ // phuong thuc xac thuc email don gian
        const isCheckemail = reg.test(email)
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
        const {name, email, password, confirmPassword, phone} =req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckemail = reg.test(email)
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
        // const {name, email, password, confirmPassword, phone} =req.body
        // const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        // const isCheckemail = reg.test(email)
        // if (!name || !email || !password || !confirmPassword || !phone) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is required'
        //     })
        // }else if(!isCheckemail) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is email'
        //     })
        // }else if(password !== confirmPassword) {
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The password is equal confirmPassword'
        //     })
        // }
        
        const userId = req.params.id;
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Please input User Id'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {createUser, loginUser, updateUser};
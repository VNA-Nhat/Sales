const User = require("../models/Usermodel")
const bcrypt = require("bcrypt")
const { generallAccessToken, generallRefreshToken } = require("./JwtServer")

const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            //Ma hoa mat khau
            const hash = bcrypt.hashSync(password, 10) //saltRounds: mã hóa mật khẩu: 10 ký tự
            const createUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone
            })
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser,
                })
            }
        }catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLoign) => {
    return new Promise(async(resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = userLoign
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }
            const comparePass = bcrypt.compareSync(password, checkUser.password)
           
            if (!comparePass){
                resolve({
                    status: 'OK',
                    message: 'The password of user is incorrect'
                })
            }

            const refresh_token = await generallRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            })

            const access_token = await generallAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        };
    })
}

const updateUser = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                id: id
            })
            console.log('checkUser',checkUser)
            // if(checkUser === null) {
            //     resolve({
            //         status: 'OK',
            //         message: 'The user is not defined'
            //     })
            // }
            // const comparePass = bcrypt.compareSync(password, checkUser.password)
            // // console.log('comparePass', comparePass)
           
            // if (!comparePass){
            //     resolve({
            //         status: 'OK',
            //         message: 'The password of user is incorrect'
            //     })
            // }

            // const access_token = await generallAccessToken({
            //     id: checkUser._id,
            //     isAdmin: checkUser.isAdmin
            // })

            // const refresh_token = await generallRefreshToken({
            //     id: checkUser.id,
            //     isAdmin: checkUser.isAdmin
            // }) 
            resolve({
                status: 'OK',
                message: 'SUCCESS',
            })
        } catch (e) {
            reject(e)
        };
    })
}

module.exports = {createUser, loginUser, updateUser};
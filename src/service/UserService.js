const User = require("../models/Usermodel");
const bcrypt = require("bcrypt");
const { generallAccessToken, generallRefreshToken} = require("./JwtService");

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

const loginUser = (userLogin) => {
    return new Promise(async(resolve, reject) => {
        const {email, password} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null) { //email kh ton tai
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            const comparePass = bcrypt.compareSync(password, checkUser.password)

            if (!comparePass){
                resolve({
                    status: 'ERR',
                    message: 'The password of user is incorrect'
                })
            }

            const access_token = await generallAccessToken({
                id: checkUser.id, //
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await generallRefreshToken({
                id: checkUser._id, //
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
                _id: id
            })
            if(checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data, {new: true}); // cập nhật user
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })
        } catch (e) {
            reject(e)
        };
    })
}

const deleteUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            await User.findByIdAndDelete(id); // cập nhật user
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        };
    })
}

const deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: ids })
            resolve({
                status: 'OK',
                message: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const allUser = await User.find().sort({createdAt: -1, updatedAt: -1}); // cập nhật user
            resolve({
                status: 'OK',
                message: 'Get all users success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        };
    })
}

const getDetailUser = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if(user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Finded user success',
                data: user
            })
        } catch (e) {
            reject(e)
        };
    })
}


module.exports = {createUser, loginUser, updateUser, deleteUser, getAllUser, getDetailUser, deleteManyUser};
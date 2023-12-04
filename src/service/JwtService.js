const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generallAccessToken= async(payload) => {
    const access_token = jwt.sign({...payload}, // tạo một mã thông báo JSON Web Token 
    process.env.ACCESS_TOKEN, {expiresIn: '15d'}) // xét thời gian xác thực
    return access_token
};

const generallRefreshToken= async(payload) => {
    const refresh_token = jwt.sign({...payload},
    process.env.REFRESH_TOKEN, {expiresIn: '365d'})
    return refresh_token
};

const RefreshTokenService = (token) => {
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err){
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    });
                }
                const access_token = await generallAccessToken({ // lay dc token access moi
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    });
};

module.exports = {generallAccessToken, generallRefreshToken, RefreshTokenService}
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generallAccessToken= async(payload) => { //    
    const access_token = jwt.sign({...payload}, // tạo một mã thông báo JSON Web Token 
    process.env.ACCESS_TOKEN, {expiresIn: '15d'}) // xét thời gian xác thực
    return access_token
};

const generallRefreshToken= async(payload) => { //
    const refresh_token = jwt.sign({...payload},
    process.env.REFRESH_TOKEN, {expiresIn: '365d'})
    return refresh_token
};

const RefreshTokenService = (token) => { //
    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if(err){
                    resolve({
                        status: 'ERR',
                        message: 'The authentication'
                    });
                }
            
                // const { payload } = user;
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

const authMiddleWare = (req, res, next) => { // nếu token hợp lệ thì sẽ chuyển sang admin, kh thì sẽ không bị err
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
        // if (user?.isAdmin)
        const { payload } = user
        if (payload?.isAdmin){ // ? là khi chưa truyền token cho admin thì kh thể xem được tất cả và thay đổi người dùng
            next()
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            })
        }
    });
}

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        // if (user?.isAdmin || user?.id === userId)
        const { payload } = user
        if (payload?.isAdmin || payload?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {generallAccessToken, generallRefreshToken, authMiddleWare, authUserMiddleWare, RefreshTokenService}
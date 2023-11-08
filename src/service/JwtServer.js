const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generallAccessToken= async(payload) => {
    console.log('payload', payload)
    const access_token = jwt.sign({payload}, 
    process.env.ACCESS_TOKEN, {expiresIn: '5 minute'}) // xét thời gian xác thực
    // return jwt.sign({ payload }, 'secretKey',{ expiresIn: 60 * 15 }); // 15
    return access_token
};

const generallRefreshToken= async(payload) => {
    console.log('payload', payload)
    const refresh_token = jwt.sign({payload}, 
    process.env.REFRESH_TOKEN, {expiresIn: '31d'}) // xét thời gian xác thực
    return refresh_token
};

module.exports = {generallAccessToken, generallRefreshToken}
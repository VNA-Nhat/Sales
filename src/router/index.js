const UserRouter = require('../router/UserRouter')
const ProductRouter = require('../router/ProductRouter')
const routes = (app) => {
    app.use('/user', UserRouter)
    app.use('/user',ProductRouter)
}


module.exports = routes
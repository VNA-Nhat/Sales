const UserRouter = require('../router/UserRouter')

const routes = (app) => {
    app.use('/user', UserRouter)
}

module.exports = routes
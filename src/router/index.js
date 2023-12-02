const UserRouter = require('../router/UserRouter')
const ProductRouter = require('../router/ProductRouter')
const OrderRouter = require('../router/OrderRouter')
const PaymentRouter = require('../router/PayRouter')

const routes = (app) => {
    app.use('/user', UserRouter)
    app.use('/user', ProductRouter)
    app.use('/order', OrderRouter)
    app.use('/payment', PaymentRouter)
    // app.use('/user', )
}

module.exports = routes
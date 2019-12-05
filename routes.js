const routes = module.exports = require('next-routes')()
routes.add('index', '/')
routes.add('orders', '/orders/:spot')
routes.add('create-order', '/create-order')
const productsRouter = require('express').Router();
const controller = require('../controllers/products');
const authMiddleware  =require('../middlewares/auth/auth');


module.exports= productsRouter;
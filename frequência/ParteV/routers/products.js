const productsRouter = require('express').Router();
const controller = require('../controllers/products');
const authMiddleware  =require('../middlewares/auth/auth');
productsRouter.get('/', controller.getAll); //le todos
productsRouter.get('/:id', controller.getById); //le 1 produto pelo id
productsRouter.post('/create', controller.create); //criar um novo produto
productsRouter.put('/update', controller.update); //atualizar um produto
productsRouter.delete('/delete/:id', controller.delete); //apagar um protudo pelo id


module.exports= productsRouter;
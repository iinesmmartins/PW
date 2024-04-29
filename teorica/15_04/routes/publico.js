const publicoRouter = require('express').Router();


// Define uma rota para a página HTML
publicoRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('/sites/ap2/webServiceJSON/templates/frontEnd/index.html');
  });


module.exports = publicoRouter;
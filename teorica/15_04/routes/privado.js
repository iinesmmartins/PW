const privadoRouter = require('express').Router();


// Define uma rota para a página HTML
privadoRouter.get('/gerirCarros', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('/Users/ADMIN/Desktop/inês/IPVC/2º ano - 2º semestre/PW/PW/teorica15_04/templates/backOffice/tabelaCarros.html');
  });


module.exports = privadoRouter;
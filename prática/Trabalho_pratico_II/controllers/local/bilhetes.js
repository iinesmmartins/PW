const fs = require('fs');

//devolve todos os bilhetes
exports.listarbilhetes = async (req, res) => {
   //ler o ficheiro local
   const datajson = fs.readFileSync("utils/eventos.json", "utf-8");
   //parse do json
   const data = JSON.parse(datajson);
   //devolver os bilhetes
   return res.send(data.bilhetes);

}

//devolve o evento com o id
exports.listarbilhete= async (req, res) => {
    //obter o id do evento
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("utils/eventos.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um carro com o id
    const carros = data.carros.filter(carros => carros.id == id);
    //devolve o carro
    res.send(carros);

}

//cria um carro
exports.adicionarbilhete = async (req, res) => {
    //obter o carro pelas características enviadas
    const {id, Marca, Detalhe, Foto} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("utils/eventos.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar carro à lista
    data.carros.push(req.body);
    //Criar o novo ficheiro com o carro adicionado
    fs.writeFileSync('utils/eventos.json', JSON.stringify(data));
    //devolve o novo carro
    return res.status(201).send(req.body);

}

//atualiza o carro
exports.editarbilhete = async (req, res) => {
    //obter o carro pelas características enviadas
    const {id, Marca, Detalhes, Foto} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("utils/eventos.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o carro para actualizar
    const carros = data.carros.find(carro => carro.id == id);
    //atualizar as caraterísticas
    carros.Marca = Marca;
    carros.Detalhes = Detalhes;
    carros.Foto = Foto;
    //actualizar no ficheiro json
    fs.writeFileSync('utils/eventos.json', JSON.stringify(data));
    //devolver o carro alterado
    return res.send({id, Marca, Detalhes, Foto});
}


//apaga o carro com o id
exports.apagarbilhete = async (req, res) => {
    //obter o id do carro
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("utils/eventos.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do carro a ser procurada
    const carroIndex  = data.carros.findIndex(carro => carro.id == id);
     // Verifique se o carro foi encontrado
    if (carroIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaCarro = data.carros.splice(carroIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('utils/eventos.json', JSON.stringify(data));
        // Retorne o carro excluído como resposta
        return res.status(200).send(apagaCarro);
    } else {
        // Caso o bilhete não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Bilhete não encontrado");
    }

}
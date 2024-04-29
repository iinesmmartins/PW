const fs = require('fs');

//devolve todos os carros
exports.getAll = async (req, res) => {
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //devolver os carros
    return res.send(data.carros);
}

//devolve o carro com o id
exports.getById = async (req, res) => {
    //obter o id do carro
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("data/local/data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um carro com o id
    const carros = data.carros.filter(carros => carros.id == id);
    //devolve o carro
    return res.send(carros);
}

//cria um carro
exports.create = async (req, res) => {
    //obter o carro pelas características enviadas
    const {id, Marca, Detalhe, Foto} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar carro à lista
    data.carros.push(req.body);
    //Criar o novo ficheiro com o carro adicionado
    fs.writeFileSync('data/local/data.json', JSON.stringify(data));
    //devolve o novo carro
    return res.status(201).send(req.body);

}
//atualiza o carro
exports.update = async (req, res) => {
   //obter o carro pelas características enviadas
   const {id, Marca, Detalhe, Foto} = req.body;
   //ler o ficheiro local
   const datajson = fs.readFileSync("data/local/data.json", "utf-8");
   //parse do json
   const data = JSON.parse(datajson);
   //procurar o carro para actualizar
  const carros = data.carros.find(carro => carro.id == id);
  //atualizar as caraterísticas
  carros.Marca = Marca;
  carros.Detalhe = Detalhe;
  carros.Foto = Foto;
  //actualizar no ficheiro json
  fs.writeFileSync('data/local/data.json', JSON.stringify(data));
  //devolver o carro alterado
  return res.send({id, Marca, Detalhe, Foto});
}

//apaga o carro com o id
exports.delete = async (req, res) => {
     //obter o id do carro
     const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data/local/data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do carro a ser procurada
    const carroIndex  = data.carros.findIndex(carro => carro.id == id);
     // Verifique se o carro foi encontrado
    if (carroIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaCarro = data.carros.splice(carroIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('data/local/data.json', JSON.stringify(data));
        // Retorne o carro excluído como resposta
        return res.status(200).send(apagaCarro);
    } else {
        // Caso o carro não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Carro não encontrado");
    }
}




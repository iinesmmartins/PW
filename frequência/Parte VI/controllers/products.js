const fs = require('fs');

//devolve todos os produtos
exports.getAll = async (req, res) => {
   //ler o ficheiro local
   const datajson = fs.readFileSync("data.json", "utf-8");
   //parse do json
   const data = JSON.parse(datajson);
   //devolver os produto
   return res.send(data.products);

}

//devolve o produto com o id
exports.getById = async (req, res) => {
    //obter o id do produto
    const id = req.params.id;
    //ler o ficheiro local
    const datajson = fs.readFileSync("data.json", "utf-8");
    //parse do json
    const data = JSON.parse(datajson);
    //procurar um produto com o id
    const products = data.products.filter(products => products.id == id);
    //devolve o produto
    res.send(products);

}

//cria um produto
exports.create = async (req, res) => {
    //obter o produto pelas características enviadas
    const {id, Marca, Detalhe, Foto} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //adicionar produto à lista
    data.products.push(req.body);
    //Criar o novo ficheiro com o produto adicionado
    fs.writeFileSync('data.json', JSON.stringify(data));
    //devolve o novo produto
    return res.status(201).send(req.body);

}

//atualiza o produto 
exports.update = async (req, res) => {
    //obter o produto pelas características enviadas
    const {id, Marca, Detalhes, Foto} = req.body;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o produto para actualizar
    const products = data.products.find(products => products.id == id);
    //atualizar as caraterísticas
    products.Marca = Marca;
    products.Detalhes = Detalhes;
    products.Foto = Foto;
    //actualizar no ficheiro json
    fs.writeFileSync('data.json', JSON.stringify(data));
    //devolver o produto alterado
    return res.send({id, Marca, Detalhes, Foto});
}


//apaga o produto com o id
exports.delete = async (req, res) => {
    //obter o id do produto
    const id = req.params.id;
     //ler o ficheiro local
     const datajson = fs.readFileSync("data.json", "utf-8");
     //parse do json
     const data = JSON.parse(datajson);
     //procurar o indice do produto a ser procurada
    const productsIndex  = data.products.findIndex(products => products.id == id);
     // Verifique se o produto foi encontrado
    if (productsIndex !== -1) {
        // Exclua o estudante do array de estudantes
        const apagaproducts = data.products.splice(productsIndex, 1)[0];
        // Atualize o ficheiro json
        fs.writeFileSync('data.json', JSON.stringify(data));
        // Retorne o produto excluído como resposta
        return res.status(200).send(apagaproducts);
    } else {
        // Caso o produto não seja encontrado, retorne uma resposta de erro
        return res.status(404).send("Produto não encontrado");
    }

}


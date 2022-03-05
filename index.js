const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const res = require("express/lib/response")

const api = express() //Cria a API
const PORT = 3001


api.use(cors()) //libera o acesso api
api.use(express.json()) //faz as requisições do JSON sejam reconhecido

//Função de conexão com o DB
async function connect() {


    await mongoose.connect("mongodb+srv://sa:sbdpu2001@cluster0.b6trq.mongodb.net/softList?retryWrites=true&w=majority")
    console.log("BD conectado com sucesso")
}

connect() //Executa a Função de conexão DB

const usuarioSchema = new mongoose.Schema({ // Entidade usuários
    usuario: String,
    email: String,
    senha: String

})

const usuarioModel = mongoose.model("Usuario", usuarioSchema)


const itemSchema = new mongoose.Schema({ //defina o Schema do Item
    descricao: String,
    quantidade: Number,
    valorUnitario: Number,
    valorTotal: Number,
    carrinho: Boolean
})

const itemModel = mongoose.model("Item", itemSchema) //registra o model do Item

api.get("/", (req, res) => {
    res.json({ mensagem: "API SofList" })
})


api.get("/item", async (req, res) => {
    res.json(await itemModel.find({}))
})

api.post("/item", async (req, res) => {
    let resultado
    if (req.body._id) resultado = await itemModel.updateOne({ _id: req.body._id }, req.body)

    else resultado = await itemModel.create(req.body)
    res.json({ mensagem: "Item salvo com sucesso!" })
})

api.put("/item/:id", async (req, res) => {
    const resultado = await itemModel.updateOne({ _id: req.params.id }, req.body)
    console.log(req.body)
    res.json({ mensagem: "o!" })
})

api.delete("/item/:id", async (req, res) => {
    const resultado = await itemModel.deleteOne({ _id: req.params.id })
    res.json(resultado)
})


api.get("/usuario", async (req, res) => {
    res.json(await usuarioModel.find({}))
})

api.post("/usuario", async (req, res) => {
    const resultado = await usuarioModel.create(req.body)
    res.json({ mensagem: "Usuario adicionado com sucesso!" })
})



api.listen(PORT, () => {
    console.log("PAI TA ONNNN E ROTEANDO!!!! IXXXQUECE TAMO IXXXXTORADO")
})
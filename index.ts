import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'; 

dotenv.config();
const app = express();
const db = mongoose.connection;

const db_url: any = process.env.DB_URL;

mongoose.connect(
  db_url
);

const TemperaturaSchema = new mongoose.Schema({
    temperatura: String
  });

const Temperatura = mongoose.model("Temperatura", TemperaturaSchema)

app.use(express.json());

db.on("error", () => {
  console.log("Houve um erro");
});
db.once("open", () => {
  console.log("DataBase loaded");
});

app.get("/", (req, res) => {
  res.send("Get funcionando!");
});

app.get("/getTemp", async (req,res)=>{

  const temp = await Temperatura.find().sort({_id:-1}).limit(1)

  res.send(temp)

})

app.post("/insertTemp", async (req, res) => {
  //res.send("Post funcionando!");
  const temp = req.body.temperatura;
    const addTemp = await Temperatura.create({
        temperatura: temp
    })
    if(addTemp){
        res.send("Temperatura inserida com sucesso")
    }else{
        res.send("Erro na insercao da temperatura")
    }
});

app.listen(process.env.PORT ? Number(process.env.PORT) : 3000,  () => {
  console.log("Servidor rodando na porta 3000");
});

import express from "express";
import mongoose from "mongoose";

const app = express();
const db = mongoose.connection;

const db_url: any = process.env.DB_URL;

mongoose.connect(
  "mongodb+srv://vercelUser:senhavercel@cluster0.kg0uz.mongodb.net/Temperaturas"
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

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

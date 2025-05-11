
import express from "express"

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) =>{
  return res.status(200).json({msg: "Benvenuto nella mia Api!!", code: 200});
})

app.listen(port, ()=>{ return console.log(`>> Attivazione del server locale in http://localhost:${port}`)});
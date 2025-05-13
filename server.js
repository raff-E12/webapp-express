
/**
 * WebApp Movie API:
 * @description - Creazione del server con Express.
 */

const express = require("express");
const routes = require("./routes/routes_page.js");
const { Pages_alternatives } = require("./middlewares/middlewares.js");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors({
  origin: " http://localhost:5173"
}))

app.use("/api", routes);
app.get("/", (req, res) =>{
  return res.status(200).json({msg: "Benvenuto nella mia Api!!", code: 200});
})

app.use(Pages_alternatives);

app.listen(port, ()=>{ return console.log(`>> Attivazione del server locale in http://localhost:${port}`)});
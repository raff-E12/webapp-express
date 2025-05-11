
/**
 * WebApp Movie API:
 * @description - Creazione dei seguenti controllers.
 */

const data = require("../database/database.js");
const database_use = data;
const fs = require("fs").promises;
const path = require("path");

function Movies_Lists(req, res) {
    const query = "SELECT id, title, director, genre, release_year, abstract, created_at, updated_at FROM movies";
    database_use.query(query, (error, result) =>{
        if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
        return res.status(200).json({result, code: 200});
    })
}

function Movies_Search(req, res) {
    const id_movies = String(req.params.id);
    console.log(id_movies);
    const query = "SELECT id, title, director, genre, release_year, abstract, created_at, updated_at FROM movies WHERE id = ?";
    const query_rec = "SELECT * FROM reviews WHERE movie_id = 2";

    database_use.query(query, [id_movies], (error, result) =>{
      if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
      if(result.length === 0) return res.status(404).json({msg:"Film non Trovato, Riprova.", code: 404});
      const movie_search = result;

      database_use.query(query_rec, [id_movies], (error, result) =>{
        if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
        return res.status(200).json({film: movie_search, recensioni: result, code: 200});
      })
    })
}

async function file_load(folder) {
 try {
  const dirfiles = await fs.readdir(folder);
  const path_files = dirfiles.map((element) => path.join(folder, element)); //creazione dell'array.
  return path_files;
 } catch (error) {
  console.log(error);
 }
}

function images_Add(req, res) {
    const body_req_img = String(req.body.image);
    const id = String(req.body.id);
    const path_location = "./public";
    const lists = file_load(path_location);
    let list_imgs = [];
    lists.then((data) => {
      data.forEach(files => { return list_imgs.push(files)});
      if(list_imgs.includes(body_req_img) && body_req_img.length !== 0){
        return res.status(400).json({msg: "La richiesta non valida, inserisci un immagine che supporta il jpg.", code: 400});
      }
    })

    // const path =  `./public/${body_req_img}`;
    // // console.log(path);
    // const query = "UPDATE movies SET image = ? WHERE id = ?";
    // database_use.query(query, [path, id], (error, result) =>{
    //   if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
    //   return res.status(200).json({msg: "Aggiunto con Successo!!", code: 200, result});
    // })
}

module.exports = {
    Movies_Search,
    Movies_Lists,
    images_Add
};
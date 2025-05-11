
/**
 * WebApp Movie API:
 * @description - Creazione dei seguenti controllers.
 */

const data = require("../database/database.js");
const database_use = data;

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

module.exports = {
    Movies_Search,
    Movies_Lists
};

/**
 * WebApp Movie API:
 * @description - Creazione dei seguenti controllers.
 */

const data = require("../database/database.js");
const database_use = data;
const fs = require("fs").promises; //restituzione di una promise. (in callback)

function Movies_Lists(req, res) {
    const query = "SELECT * FROM movies";
    database_use.query(query, (error, result) =>{
        if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
        return res.status(200).json({result, code: 200});
    })
}

function Movies_Search(req, res) {
    const id_movies = String(req.params.id);
    console.log(id_movies);
    const query = "SELECT * FROM movies WHERE id = ?";
    const query_rec = "SELECT * FROM reviews WHERE movie_id = ?";

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

async function Images_Add(req, res) {
   try {
     const body_req_img = String(req.body.image);
    const id = String(req.body.id);
    const path_location = "./public";

    // Controlla se il file è disponibile nella cartella public
     const dirfiles = await fs.readdir(path_location);
        if (body_req_img && !dirfiles.includes(body_req_img)) {
            return res.status(400).json({
                msg: "La richiesta non è valida, Riprova!!",
                code: 400
            });
      }

    const path =  `../../../public/${body_req_img}`;
    // console.log(path);
    const query = "UPDATE movies SET image = ? WHERE id = ?";
    database_use.query(query, [path, id], (error, result) =>{
      if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
      return res.status(200).json({msg: "Aggiunto con Successo!!", code: 200});
    })
   } catch (error) {
    console.error("Errore durante il caricamento dei file:", error);
        return res.status(500).json({
            msg: "Errore interno del server durante il caricamento dei file.",
            code: 500
        });
   }
}

function Reviews_Lists(req, res) {
    const query = `SELECT tb1.*, ROUND((SELECT AVG(tb2.vote) FROM reviews AS tb2 WHERE tb2.movie_id = tb1.movie_id)) AS average_rating FROM reviews AS tb1`;
    database_use.query(query, (error, result) =>{
        if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500});
        return res.status(200).json({result, code: 200});
    })
}

function Reviews_id(req, res) {
    const id = String(req.params.id);
    const query = "SELECT tb1.*, ROUND((SELECT AVG(tb2.vote) FROM reviews AS tb2 WHERE tb2.movie_id = tb1.movie_id)) AS average_rating FROM reviews AS tb1 WHERE tb1.movie_id = ?";
    database_use.query(query, [id], (error, result) =>{
        if (isNaN(id)) return res.status(400).json({msg:"il parametro deve essere un numero!!", code: 400}); 
        if(error) return res.status(500).json({msg:"Errore del Server, Riprova a ricaricare la sessione", code: 500}); 
        if (result.length === 0) {
           return res.status(200).json({result, code: 404});
        }
        return res.status(200).json({result, code: 200});
    })
}

function Add_Reviews(req, res) {
    const { movie_id, name, vote, text } = req.body;
    const id_movie = Number(movie_id);
    const name_user = String(name);
    const rate_vote = Number(vote);
    const description_rate = String(text);
    
    const query = `INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`;
    database_use.query(query, [id_movie, name_user, rate_vote, description_rate], (error, result) =>{
        // console.log(error);
        if(error) return res.status(400).json({msg:"Dati Errati, Riprova a ricaricare la sessione", code: 400});
        return res.status(200).json({msg: "Aggiunto Con Successo!!", code: 200});
    })
}


function Add_Movies(req, res) {
    const { title, director, genre, release_year, abstract, image } = req.body;
    const search_query =  `SELECT * FROM movies WHERE image = ?`;
    const insert_query = "INSERT INTO movies (title, director, genre, release_year, abstract, image) VALUES (?, ?, ?, ?, ?, ?)";
    database_use.query(search_query, [image], (error, resultQuery) =>{
      if(error) return res.status(400).json({msg:"Dati non Soddisfa, Riprova a ricaricare la sessione", code: 500});
        const info_query = resultQuery;
        // console.log(info_query);
        if (info_query.length !== 0) return res.status(302).json({msg: "L'immagine è già dentro", code: 302});
        database_use.query(insert_query, [title, director, genre, release_year, abstract, image], (error, result) =>{
            const error_search = error;
            if(error_search) return res.status(400).json({msg: "Dati Errati, Riprova a ricaricare la sessione", code: 400,});
            res.status(200).json({msg: "Record Aggiunto con sucesso!!", code: 200});
        })
    })
}

module.exports = {
    Movies_Search,
    Movies_Lists,
    Images_Add,
    Reviews_Lists,
    Reviews_id,
    Add_Reviews,
    Add_Movies
};
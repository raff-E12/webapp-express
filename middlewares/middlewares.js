
/**
 * WebApp Movie API:
 * @description - Creazione dei seguenti Middleware.
 */

function Pages_alternatives(req, res, next) {
    res.status(404).json({msg: "Rotta Assente, Riprova!!", code: 404});
    next()
}

module.exports = {
    Pages_alternatives
};
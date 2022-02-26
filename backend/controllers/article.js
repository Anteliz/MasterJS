'use strinct'

var validator = require('validator');
const { findByIdAndUpdate } = require('../models/article');
const article = require('../models/article');
var Article = require('../models/article')

var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Adolfo Anteliz',
            url: 'Aún pendiente',
            hola
        });
    },
    test: (req, res) => {
        return res.status(200).send({
            message:'Soy la acción test de mi controlador de artículos'
        });
    },

    save: (req, res)=>{
        // Recoger los parametros por post
        var params = req.body;

        // Validar datos con el validator
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }
        catch(err){
            return res.status(200).send({
                status: 'Error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_title && validate_content){
            //Crear objeto a guardar
            var article = new Article();

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //Guardar el artículo
            return article.save((err, articleStored)=>{
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'El artículo no se ha guardado'
                    });
                }

                return res.status(200).send({
                    status: 'Success',
                    article: articleStored
                });
            });
        }
        else{
            return res.status(200).send({
                status: 'Error',
                message: 'Los datos no son validos'
            });
        }
    },

    getArticles: (req, res) => {
        var query = Article.find({})
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }
        //Find
        return query.sort('-_id').exec((err, articles) =>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al devolver artículos'
                });
            }

            if(!articles){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay artículos para mostrar'
                });
            }

            return res.status(200).send({
                status: 'Success',
                articles
            });
        });
    },

    getArticle: (req, res) => {
        // Recoger la URL
        var articleId = req.params.id;

        // Comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'Error',
                message: 'No existe el Artículo'
            });
        }

        // Buscar el artículo
        return Article.findById(articleId, (err, article)=>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al devolver los datos'
                });
            }

            if(!article){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No existe el Artículo'
                });
            }

            //Devolver el Json
            return res.status(200).send({
                status: 'Success',
                article
            });
        });
    },

    update: (req, res) =>{
        // Recoger el id  del artículo por la URL
        var articleId = req.params.id;

        // Recoger los datos que llegan por PUT
        var params = req.body;

        // Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }
        catch(err){
            return res.status(404).send({
                status: 'Error',
                message: 'Falta datos por enviar'
            });
        }

        if(validate_title && validate_content){
            // Find and Update
            return Article.findByIdAndUpdate({_id: articleId}, params, {new : true}, (err, articleUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar'
                    });
                }
                if(!articleUpdated){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'No existe el artículo'
                    });
                }

                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    articleUpdated
                });
            });
        }
        else{
            return res.status(500).send({
                status: 'Error',
                message: 'La validación no es correcta'
            });
        }
    }, 

    delete: (req, res) =>{
        //Recoger el id de la url
        var articleId = req.params.id;

        // Find and Delete
        return Article.findByIdAndDelete({_id:articleId}, (err, articleRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al borrar'
                });
            }

            if(!articleRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se a borrado el artículo, posiblemente no existe'
                });
            }

            return res.status(200).send({
                status: 'Success',
                article: articleRemoved
            });
        });
        return res.status(500).send({
            status: 'Error',
            message: 'test de delete'
        });
    }
}

module.exports = controller
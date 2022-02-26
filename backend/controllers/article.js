'use strinct'

var validator = require('validator');
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
    }
}

module.exports = controller
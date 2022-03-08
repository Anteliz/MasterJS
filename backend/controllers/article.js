'use strinct'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
// const { findByIdAndUpdate } = require('../models/article');
// const article = require('../models/article');
var Article = require('../models/article');
const { exists } = require('../models/article');

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
            message: 'Soy la acción test de mi controlador de artículos'
        });
    },

    save: (req, res) => {
        // Recoger los parametros por post
        var params = req.body;

        // Validar datos con el validator
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }
        catch (err) {
            return res.status(200).send({
                status: 'Error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            //Crear objeto a guardar
            var article = new Article();

            //Asignar valores
            article.title = params.title;
            article.content = params.content;
            if(params.image){
                article.image = params.image;
            }
            else{
                article.image = null;
            }

            //Guardar el artículo
            return article.save((err, articleStored) => {
                if (err || !articleStored) {
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
        else {
            return res.status(200).send({
                status: 'Error',
                message: 'Los datos no son validos'
            });
        }
    },

    getArticles: (req, res) => {
        var query = Article.find({})
        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }
        //Find
        return query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al devolver artículos'
                });
            }

            if (!articles) {
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
        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'Error',
                message: 'No existe el Artículo'
            });
        }

        // Buscar el artículo
        return Article.findById(articleId, (err, article) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al devolver los datos'
                });
            }

            if (!article) {
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

    update: (req, res) => {
        // Recoger el id  del artículo por la URL
        var articleId = req.params.id;

        // Recoger los datos que llegan por PUT
        var params = req.body;

        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }
        catch (err) {
            return res.status(404).send({
                status: 'Error',
                message: 'Falta datos por enviar'
            });
        }

        if (validate_title && validate_content) {
            // Find and Update
            return Article.findByIdAndUpdate({ _id: articleId }, params, { new: true }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar'
                    });
                }
                if (!articleUpdated) {
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
        else {
            return res.status(500).send({
                status: 'Error',
                message: 'La validación no es correcta'
            });
        }
    },

    delete: (req, res) => {
        //Recoger el id de la url
        var articleId = req.params.id;

        // Find and Delete
        return Article.findByIdAndDelete({ _id: articleId }, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al borrar'
                });
            }

            if (!articleRemoved) {
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
    },

    upload: (req, res) => {
        // Configurar el módulo del connect multiparty route/article.js


        //Recoger el fichero de la petición
        var file_name = 'Imagen no disponible.';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            })
        }

        //Conseguir el nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // *Advertencia* en Linux o MAC
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        //Comprobar la extensaión, solo imagenes, si no es valida borrar el fichero
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            // Borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida'
                })
            });
        }
        else {
            //Si todo es valido, obtengo el id de la url
            var articleId = req.params.id
            if (articleId) {
                return Article.findByIdAndUpdate({ _id: articleId }, { image: file_name }, { new: true }, (err, articleUpdated) => {
                    if (err || !articleUpdated) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'Error al guardar la imagen del artículo'
                        });
                    }

                    return res.status(200).send({
                        status: 'Success',
                        article: articleUpdated
                    });
                });
            }
            else{
                return res.status(200).send({
                    status: 'Success',
                    image: file_name
                });
            }
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;
        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        }
        else {
            return res.status(404).send({
                status: 'error',
                message: 'La imagen no existe'
            });
        }
    },

    search: (req, res) => {
        //Sacar el strung a buscar
        var searchString = req.params.search;

        // Find Or
        return Article.find({
            "$or": [
                { "title": { "$regex": searchString, "$options": "i" } },
                { "content": { "$regex": searchString, "$options": "i" } }
            ]
        })
            .sort([['date', 'descending']])
            .exec((err, articles) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }
                if (!articles || articles.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay artículos que coincidan con tu busqueda'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    articles
                });
            });
    }
}

module.exports = controller
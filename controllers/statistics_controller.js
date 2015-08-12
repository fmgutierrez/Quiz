var models = require('../models/models.js');
var estadisticas = {preguntas:0,comentariosTotales:0,comentariosTotalesPublicados:0,preguntasSinComentarios:0};

exports.calcular = function(req, res) {	
	
	models.Quiz.count().then(function(result){
		estadisticas.preguntas = result;		
	}).catch(function(error){next(error)});

	models.Comment.count().then(function(result){
		estadisticas.comentariosTotales = result;		
	}).catch(function(error){next(error)});

	models.Comment.count({
		where: [ '"Comment"."publicado"' ],
	}).then(function(result){
		estadisticas.comentariosTotalesPublicados = result;		
	}).catch(function(error){next(error)});

	models.Quiz.count({
       distinct: true,
       where: [ '"Comments"."QuizId" IS NULL' ],
       include: [{
           model: models.Comment,
               required: false
       }]
     }).then(function(result){
       estadisticas.preguntasSinComentarios = result;	
       res.render('quizes/statistics', {estadisticas: estadisticas, errors: []});	
	}).catch(function(error){next(error)});


};


// Definición del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
	return sequelize.define(
		'Quiz',
		{ pregunta: {
		    type: DataTypes.STRING,
		    validate: { notEmpty: {msg: "-> Falta Pregunta"},
		                notIn: { args: [["Pregunta"]], msg: "-> Indicar Pregunta" } } // Para que no se introduzca 
		  },                                                                         // la cadena "Pregunta" 
		   respuesta: {
		   	type: DataTypes.STRING,
		   	validate: { notEmpty: {msg: "-> Falta Respuesta"},
		                notIn: { args: [["Respuesta"]], msg: "-> Indicar Respuesta" } } // Para que no se introduzca
		  }                                                                             // la cadena "Pregunta"  
		 }    	
		);
}
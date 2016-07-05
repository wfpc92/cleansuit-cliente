var ServiciosFactory = function(RecursosFactory){
	var _servicios = [];
	
	return {

		getServicios: function() {
			return _servicios;
		},

		cargar: function() {
			console.log("Enviando peticion GET a servidor para obtener servicios.")
			return RecursosFactory
			.get('/servicios', {})
			.then(function(respuesta) {
				console.log("Finaliza peticion GET a servidor para servicios.", respuesta)
				if(!respuesta.error){
					_servicios = respuesta.data;
				} else {
					//error(respuesta.error);
				}
			});
		},
	};
};

app.factory('ServiciosFactory', ServiciosFactory); 

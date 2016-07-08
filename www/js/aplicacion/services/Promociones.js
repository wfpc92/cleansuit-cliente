var PromocionesFactory = function(RecursosFactory){
	var _promociones = [] ;

	return {
		getPromociones: function() {
			return _promociones;
		},

		//carga lista de promociones desde el servidor
		cargar: function(callback) {
			return RecursosFactory
			.get('/promociones', {})
			.then(function(respuesta) {
				console.log("imprimiendo respuesta");
				console.log(respuesta);
				if(respuesta){
					_promociones = respuesta.data.promociones;
				}
			});
		}
	};
};

app.factory('PromocionesFactory', PromocionesFactory);

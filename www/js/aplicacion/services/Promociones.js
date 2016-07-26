var PromocionesFactory = function(RecursosFactory, 
								$localStorage){
	
	return {
		getPromociones: function() {
			return $localStorage.promociones;
		},

		//carga lista de promociones desde el servidor
		cargar: function(callback) {
			return RecursosFactory
			.get('/promociones', {})
			.then(function(respuesta) {
				console.log("imprimiendo respuesta");
				console.log(respuesta);
				if(respuesta){
					$localStorage.promociones = respuesta.data.promociones;
				}
			});
		},

		validarCupon: function(cupon) {
			return RecursosFactory
			.get('/promociones/validar-cupon', cupon);
		}
	};
};

app.factory('PromocionesFactory', PromocionesFactory);

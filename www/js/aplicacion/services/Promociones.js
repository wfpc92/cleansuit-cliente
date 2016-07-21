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
		}
	};
};

app.factory('PromocionesFactory', PromocionesFactory);

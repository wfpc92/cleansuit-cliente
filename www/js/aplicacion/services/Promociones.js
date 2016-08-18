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
				console.log("PromocionesFactory.cargar()", respuesta);
				if(respuesta){
					$localStorage.promociones = respuesta.data.promociones;
				}
			});
		},

		validar: function(cupon) {
			return RecursosFactory
			.get('/promociones/validar/'+cupon)
			.then(function(respuesta) {
				console.log(respuesta)
				if(respuesta.data.success) {
					console.log("PromocionesFactory.validarCupon: true")
	    			return respuesta.data;
	    		} else {
					console.log("PromocionesFactory.validarCupon: false")
	    			return false;
	    		}
			}, function() {
				console.log("PromocionesFactory.validarCupon: error")
				return false;
			});
		}
	};
};

app.factory('PromocionesFactory', PromocionesFactory);

var PromocionesFactory = function(RecursosFactory, 
								$localStorage){
	
	var setPromociones = function(promociones) {
		for (var i in $localStorage.promociones) {
			delete $localStorage.promociones[i];
		}
		
		for (var i in promociones) {
			$localStorage.promociones[i] = promociones[i];
		}
	};

	if (!$localStorage.promociones) {
		$localStorage.promociones = [];
	}

	return {
		promociones: $localStorage.promociones,

		//carga lista de promociones desde el servidor
		cargar: function() {
			return RecursosFactory
			.get('/promociones', {})
			.then(function(respuesta) {
				console.log("PromocionesFactory.cargar()", respuesta);
				if(respuesta){
					setPromociones(respuesta.data.promociones);
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

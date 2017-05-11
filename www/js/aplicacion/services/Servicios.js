var ServiciosFactory = function(RecursosFactory,
							$localStorage,
							$log){
	
	var init = function() {
		$localStorage.servicios = $localStorage.servicios || [];
	};

	var setServicios = function(servicios) {
		init();
		var n = $localStorage.servicios.length;
		$localStorage.servicios.splice(0, n - 1);

		for (var i in servicios) {
			$localStorage.servicios[i] = servicios[i];
		}
	};
	
	init();

	return {
		servicios: $localStorage.servicios,

		cargar: function() {
			return RecursosFactory
			.get('/servicios', {})
			.then(function(respuesta) {
				$log.debug("ServiciosFactory.cargar()", respuesta)
				if(respuesta){
					setServicios(respuesta.data.servicios);
				}
			});
		}
	};
};

app.factory('ServiciosFactory', ServiciosFactory); 

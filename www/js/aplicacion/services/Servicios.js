var ServiciosFactory = function(RecursosFactory,
							$localStorage){
	
	var init = function() {
		$localStorage.servicios = $localStorage.servicios || [];
	};

	var setServicios = function(servicios) {
		init();

		for (var i in $localStorage.servicios) {
			delete $localStorage.servicios[i];
		}

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
				console.log("ServiciosFactory.cargar()", respuesta)
				if(respuesta){
					setServicios(respuesta.data.servicios);
				}
			});
		}
	};
};

app.factory('ServiciosFactory', ServiciosFactory); 

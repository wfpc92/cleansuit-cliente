var ConfiguracionesFactory = function(RecursosFactory,
									$localStorage) {
	
	var getConfiguraciones = function() {
		if (!$localStorage.configuraciones) {
			$localStorage.configuraciones = {
				domicilio: 0,
				versiones: {}
			};
		}
		return $localStorage.configuraciones;
	}

	var cargar = function() {
		return RecursosFactory
		.get("/configuraciones")
		.then(function(response) {
			console.log("ConfiguracionesFactory.cargar()", response);
			if (response.data.success) {
				$localStorage.configuraciones = response.data.configuraciones;
				return response.data.configuraciones
			}
			return null;			
		});
	}

	var cargarVersiones = function() {
		return RecursosFactory
		.get("/configuraciones/versiones")
		.then(function(response) {
			console.log("ConfiguracionesFactory.cargarVersiones()", response);
			if (response.data.success) {
				var anterior = getConfiguraciones().versiones,
					nueva = response.data.versiones;

				getConfiguraciones().versiones = nueva;
				return {
					anterior: anterior,
					nueva: nueva
				};
			}
			return null;
		});	
	}

	return {
		getConfiguraciones: getConfiguraciones,
		cargar: cargar,
		cargarVersiones: cargarVersiones
	};
};

app.factory("ConfiguracionesFactory", ConfiguracionesFactory);

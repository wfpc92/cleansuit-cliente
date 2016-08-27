var ConfiguracionesFactory = function(RecursosFactory,
									$localStorage) {
	
	var getConfiguraciones = function() {
		if (!$localStorage.configuraciones) {
			$localStorage.configuraciones = {
				domicilio: 0
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

	var cargarVersionInventario = function() {
		return RecursosFactory
		.get("/configuraciones/version-inventario")
		.then(function(response) {
			console.log("ConfiguracionesFactory.cargarVersionInventario()", response);
			if (response.data.success) {
				getConfiguraciones().versionInventario = response.data.versionInventario;
				return getConfiguraciones().versionInventario;
			}
			return null;			
		});	
	}

	return {
		getConfiguraciones: getConfiguraciones,
		cargar: cargar,
		cargarVersionInventario: cargarVersionInventario
	};
};

app.factory("ConfiguracionesFactory", ConfiguracionesFactory);

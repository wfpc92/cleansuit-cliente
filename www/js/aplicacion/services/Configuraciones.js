var ConfiguracionesFactory = function(RecursosFactory) {
	var configuraciones;

	function cargar() {
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

	function cargarVersionInventario() {
		return RecursosFactory
		.get("/configuraciones/version-inventario")
		.then(function(response) {
			console.log("ConfiguracionesFactory.cargarVersionInventario()", response);
			if (response.data.success) {
				if (!$localStorage.configuraciones) {
					$localStorage.configuraciones = {};
				}
				
				$localStorage.configuraciones.versionInventario = response.data.versionInventario;
				return response.data.configuraciones
			}
			return null;			
		});	
	}

	return {
		cargar: cargar,
	};
};

app.factory("ConfiguracionesFactory", ConfiguracionesFactory);

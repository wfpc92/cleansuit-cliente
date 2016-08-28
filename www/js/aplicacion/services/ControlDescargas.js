var ControlDescargasFactory = function($q,
									ModalCargaFactory,
									PromocionesFactory, 
									ProductosFactory, 
									ServiciosFactory,
									MapasFactory,
									ConfiguracionesFactory,
									OrdenesFactory) {
	
	var deferred;

	var tmplCarga = function(carga) {
		ModalCargaFactory.mostrar("Actualizando información...", null);	
		carga();
	};

	var comprobarCarga = function(carga, n) {
		if(carga == n) {
			ModalCargaFactory.ocultar();
		}
	};

	var inventario = function() {
		var carga = 0, n = 3;
		
		PromocionesFactory
		.cargar()
		.finally(function() {
			comprobarCarga(++carga, n);
			console.log("ControlDescargasFactory.inventario(),PromocionesFactory.cargar(), finally", PromocionesFactory.promociones)
			deferred.resolve();
		});

		ProductosFactory
		.cargar()
		.finally(function() {
			comprobarCarga(++carga, n);
		});

		ServiciosFactory
		.cargar()
		.finally(function() {
			comprobarCarga(++carga, n);
		});
	};

	var ordenesEnProceso = function() {
		var carga = 0, n = 1;

		OrdenesFactory
		.cargarOrdenesEnProceso()
		.finally(function(){
			comprobarCarga(++carga, n);
		});
	};

	var configuraciones = function() {
		var carga = 0, n = 1;

		ConfiguracionesFactory
		.cargar()
		.finally(function() {
			comprobarCarga(++carga, n);
		})
	}

	var verificarVersiones = function(versiones) {
		var va, vb;

		if (!versiones) {
			deferred.resolve();
			return false;
		}

		va = versiones.anterior;
		vb = versiones.nueva;

		if (va.inventario !== vb.inventario) {
			tmplCarga(inventario);
		}
		
		if (va.configuraciones !== vb.configuraciones) {
			tmplCarga(configuraciones);
		}
	};

	var cargarVersiones = function() {
		return ConfiguracionesFactory
		.cargarVersiones()
		.then(function(versiones) {
			verificarVersiones(versiones);
			tmplCarga(ordenesEnProceso);
		});
	};

	var cargaInicial = function() {
		deferred = $q.defer();
		console.log("Cargando datos iniciales... ");

		//crear mapa de google maps
		MapasFactory
		.getMapa()
		.then(function(mapa) {
			console.log("mapa de google creado: ", mapa)
		}, function(error) {
			console.log("hubo error al crear mapa: ", error)
		});	

		cargarVersiones();

		return deferred.promise;
	};

	return { 
		cargaInicial: cargaInicial,

		cargarVersiones: cargarVersiones
	};
};

app.factory("ControlDescargasFactory", ControlDescargasFactory);

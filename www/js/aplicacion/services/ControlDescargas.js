var ControlDescargasFactory = function($q,
									ModalCargaFactory,
									PromocionesFactory, 
									ProductosFactory, 
									ServiciosFactory,
									MapasFactory,
									ConfiguracionesFactory,
									OrdenesFactory,
									$log) {
	
	var deferred,
		cb;

	var tmplCarga = function(carga) {
		ModalCargaFactory.mostrar("Actualizando información...", null);	
		carga();
	};

	var comprobarCarga = function(carga, n) { 
		if(carga == n) {
			ModalCargaFactory.ocultar();
			if(cb) {
				cb();
			}
			deferred.resolve();
		}
	};

	var inventario = function() {
		var carga = 0, n = 3;
		
		PromocionesFactory
		.cargar()
		.finally(function() {
			comprobarCarga(++carga, n);
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

	var historialOrdenes = function() {
		var carga = 0, n = 2;

		OrdenesFactory
		.cargarOrdenesEnProceso()
		.finally(function(){
			comprobarCarga(++carga, n);
		});

		OrdenesFactory
		.cargarHistorialOrdenes()
		.finally(function() {
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

		if (va.ordenes !== vb.ordenes) {
			tmplCarga(historialOrdenes);
		}
	};

	var cargarVersiones = function() {
		return ConfiguracionesFactory
		.cargarVersiones()
		.then(function(versiones) {
			cb = versiones.cb;
			verificarVersiones(versiones);
		});
	};

	var cargaInicial = function() {
		deferred = $q.defer();
		ModalCargaFactory.mostrar("Actualizando información...", null);	
		$log.debug("Cargando datos iniciales... ");

		//crear mapa de google maps
		MapasFactory
		.getMapa()
		.then(function(mapa) {
			$log.log("mapa de google creado: ", mapa)
		}, function(error) {
			$log.log("hubo error al crear mapa: ", error)
		});	

		cargarVersiones()
		.finally(function() {
			ModalCargaFactory.ocultar();
		});

		return deferred.promise;
	};

	return { 
		cargaInicial: cargaInicial,

		cargarVersiones: cargarVersiones
	};
};

app.factory("ControlDescargasFactory", ControlDescargasFactory);

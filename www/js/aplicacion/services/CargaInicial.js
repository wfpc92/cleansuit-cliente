var CargaInicialFactory = function(CargarScriptsFactory,
							ModalCargaFactory, 
							ProductosFactory, 
							ServiciosFactory,
							MapasFactory) {
	var recursos = {
		mapsScript : false,
		productos: false,
		servicios: false
	};


	return { 
		recursos : recursos,

		iniciar: function(callback) {
			console.log("Cargando datos iniciales... ");

			//crear mapa de google maps
			MapasFactory
			.getMapa()
			.then(function(mapa) {
				console.log("mapa de google creado: ", mapa)
			}, function(error) {
				console.log("hubo error al crear mapa: ", error)
			});		

			ModalCargaFactory.mostrar("Cargando productos...", null);

			ProductosFactory.cargar()
			.then( function(){
				recursos.productos = true;
			}, function (error){
				recursos.productos = false;
			})
			.finally( function(){ 
				console.log("----------------$$$$$$$$$$4----------------")
				ModalCargaFactory.setMensaje("Cargando servicios...");
				ServiciosFactory.cargar()
				.then( function(){
					recursos.servicios = true;
				}, function (error){
					recursos.servicios = false;
				})
				.finally( function(){ 
					ModalCargaFactory.ocultar();
					callback();
				});
			});		
		}
	};
};

app.factory("CargaInicialFactory", CargaInicialFactory);

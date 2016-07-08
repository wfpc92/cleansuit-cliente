var CargaInicialFactory = function(CargarScriptsFactory,
							ModalCargaFactory,
							PromocionesFactory, 
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

			ModalCargaFactory.mostrar("Cargando datos...", null);

			PromocionesFactory
			.cargar()
			.then(function(){
				recursos.promociones = true;
				ModalCargaFactory.ocultar();
				if(callback) callback();
			}, function(error) {
				recursos.promociones = false;
			});

			ProductosFactory
			.cargar()
			.then( function(){
				//ModalCargaFactory.mostrar("Cargando productos...", null);
				recursos.productos = true;
			}, function (error){
				recursos.productos = false;
			})

			ServiciosFactory
			.cargar()
			.then( function(){
				recursos.servicios = true;
			}, function (error){
				recursos.servicios = false;
			});
				
		}
	};
};

app.factory("CargaInicialFactory", CargaInicialFactory);

var CargaInicialFactory = function(CargarScriptsFactory, ModalCargaFactory, ProductosFactory, MapasFactory) {
	var recursos = {
		mapsScript : false,
		productos: false,
		categorias: false,
		servicios: false
	};


	return { 
		recursos : recursos,

		iniciar: function(callback) {
			console.log("Cargando datos iniciales... ");

			//crear mapa de google maps
			MapasFactory.getMapa().then(function(mapa) {
				console.log("mapa de google creado: ", mapa)
			}, function(error) {
				console.log("hubo error al crear mapa: ", error)
			});		

			ModalCargaFactory.mostrar(null, "Cargando productos...", null);

			ProductosFactory.cargar(function(){
				recursos.productos = true;
			}, function (error){
				recursos.productos = false;
			}, function(){ 
				ModalCargaFactory.ocultar();
				callback();
			});
		}
	};
};

app.factory("CargaInicialFactory", ['CargarScriptsFactory', 'ModalCargaFactory', 'ProductosFactory', 'MapasFactory', CargaInicialFactory]);

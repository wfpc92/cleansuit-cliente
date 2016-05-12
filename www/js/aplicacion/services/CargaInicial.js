var CargaInicialFactory = function(angularLoad, ModalCargaFactory, ProductosFactory, $rootScope) {
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

			this.cargarMapsScript();

			ModalCargaFactory.mostrar(null, "Cargando productos...", null);

			ProductosFactory.cargar(function(){
				recursos.productos = true;
			}, function (error){
				recursos.productos = false;
			}, function(){ 
				ModalCargaFactory.ocultar();
				callback();
			});
		},

		cargarMapsScript : function(callback, error) {
			var self = this;
			console.log("cargando Script google maps...")
			angularLoad.loadScript('https://maps.googleapis.com/maps/api/js').then(function () {
				//comprobarCarga(null, "Google Maps API");
				recursos.mapsScript = true;
				console.log("exito script google maps.")
				if(callback) {
						callback();
					}
				/*//cargando instancia de mapa.
				MapasFactory.cargarMapa().then(function() {
					if(callback) {
						callback();
					}
				}, function() {
					if(callback) {
						callback();
					}
				});		*/		
			}).catch(function () {
				//comprobarCarga("Error al cargar el archivo externo.", "Google Maps API");
				recursos.mapsScript = false;
				console.log("error script google maps.")
				if(error) {
					error();
				}
			});
		}
	};
};

app.factory("CargaInicialFactory", ['angularLoad', 'ModalCargaFactory', 'ProductosFactory', '$rootScope', CargaInicialFactory]);

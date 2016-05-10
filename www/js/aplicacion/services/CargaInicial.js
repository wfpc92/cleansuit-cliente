var CargaInicialFactory = function(angularLoad, ModalCargaFactory, ProductosFactory, $rootScope) {
	var recursos = {
		maps : false,
		productos: false,
		categorias: false,
		servicios: false
	};


	return { 
		recursos : recursos,

		iniciar: function(callback) {
			console.log("Cargando datos iniciales... ");

			this.cargarApiMaps();

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

		cargarApiMaps : function() {
			var self = this;
			console.log("cargando Script google maps...")
			angularLoad.loadScript('https://maps.googleapis.com/maps/api/js').then(function () {
				//comprobarCarga(null, "Google Maps API");
				recursos.maps = true;
				console.log("exito script google maps.")
			}).catch(function () {
				//comprobarCarga("Error al cargar el archivo externo.", "Google Maps API");
				recursos.maps = false;
				console.log("error script google maps.")
			});
		}
	};
};

app.factory("CargaInicialFactory", ['angularLoad', 'ModalCargaFactory', 'ProductosFactory', '$rootScope' ,CargaInicialFactory]);

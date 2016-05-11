var CargaInicialFactory = function(angularLoad, ModalCargaFactory, ProductosFactory, $rootScope) {


	return {
		iniciar: function(callback) {
			
			angularLoad.loadScript('https://maps.googleapis.com/maps/api/js').then(function () {
				//comprobarCarga(null, "Google Maps API");
			}).catch(function () {
				//comprobarCarga("Error al cargar el archivo externo.", "Google Maps API");
			});

			var $scope = $rootScope.$new();
			$scope.mensajeModal = "productos";
			ModalCargaFactory.mostrar($scope);

			ProductosFactory.cargar(function(){ 
				ModalCargaFactory.ocultar();
				callback();
			});
		}
	};
};

app.factory("CargaInicialFactory", ['angularLoad', 'ModalCargaFactory', 'ProductosFactory', '$rootScope' ,CargaInicialFactory]);

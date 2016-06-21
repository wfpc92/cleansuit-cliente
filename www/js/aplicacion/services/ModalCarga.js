var ModalCargaFactory = function($ionicLoading, $timeout, $rootScope) {

	var promise = null;
	var $scope = null;

	return {
		mostrar: function(mensaje, opciones) {
			var self = this;
			$scope = $scope || $rootScope.$new();
			mensaje = mensaje || " Cargando datos...";
			$scope.mensajeModal = $scope.mensajeModal || mensaje;
			
			$scope.hide = function() {
				console.log("hide")
				self.ocultar();
			};
			
			opciones = opciones || {
				templateUrl: 'templates/modales/carga.html',
				scope: $scope,
				noBackdrop: false,
				hideOnStateChange: true
			};			
			
			$ionicLoading.show(opciones);
			promise = $timeout( function() {
				$scope.cerrar = true; 
			}, 5000);
		},
		ocultar: function() {
			$timeout.cancel(promise);
			$ionicLoading.hide();
		},
		setMensaje: function(mensaje) {
			$scope.mensajeModal = mensaje;
		}
	};
};

app.factory("ModalCargaFactory", ['$ionicLoading', '$timeout' , '$rootScope' , ModalCargaFactory]);

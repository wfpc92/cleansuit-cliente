var ModalCargaFactory = function($ionicLoading, $timeout, $rootScope) {

	var promise = null;

	return {
		mostrar: function($scope, mensaje, opciones) {
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
			}, 6000);
		},
		ocultar: function() {
			$timeout.cancel(promise);
			$ionicLoading.hide();
		}
	};
};

app.factory("ModalCargaFactory", ['$ionicLoading', '$timeout' , '$rootScope' , ModalCargaFactory]);

var ModalCargaFactory = function($ionicLoading, $timeout, $rootScope) {

	var prom = null;

	return {
		mostrar: function($scope, opciones) {
			var self = this;
			$scope = $scope || $rootScope.$new();
			$scope.mensajeModal = $scope.mensajeModal || "datos";
			$scope.mensajeModal = "Cargando " + $scope.mensajeModal;
			
			opciones = opciones || {
				templateUrl: 'templates/modales/carga.html',
				scope: $scope,
				noBackdrop: false,
				hideOnStateChange: true
			};
			
			$scope.hide = function() {
				self.ocultar();
			};
			
			$ionicLoading.show(opciones);
			prom = $timeout( function() {
				$scope.cerrar = true; 
			}, 6000);
		},
		ocultar: function() {
			$timeout.cancel(prom);
			$ionicLoading.hide();
		}
	};
};

app.factory("ModalCargaFactory", ['$ionicLoading', '$timeout' , '$rootScope' , ModalCargaFactory]);

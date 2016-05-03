var ModalCargaFactory = function($ionicLoading) {
	
	return {
		mostrar: function($scope, opciones) {
			var self = this;
			if(typeof $scope !== 'undefined' && typeof opciones == 'undefined') {
				$scope.hide = function() {
					self.ocultarCarga();
				};
				if($scope.mensajeModal == ''){
					$scope.mensajeModal = "datos";
				}
				opciones = {
					templateUrl: 'templates/modales/carga.html',
					scope: $scope,
					noBackdrop: false,
					hideOnStateChange: true
				};
			}
			$ionicLoading.show(opciones);
		},
		ocultar: function() {
			$ionicLoading.hide();
		}
	};
};

app.factory("ModalCargaFactory", ['$ionicLoading', ModalCargaFactory]);

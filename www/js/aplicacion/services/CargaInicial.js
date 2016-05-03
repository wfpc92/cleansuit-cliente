var CargaInicialFactory = function($ionicLoading) {


	return {
		mostrarCarga: function($scope, opciones) {
			var self = this;
			if(typeof $scope !== 'undefined' && typeof opciones == 'undefined') {
				$scope.hide = function() {
					self.ocultarCarga();
				};
				opciones = {
					templateUrl: 'templates/modales/carga.html',
					scope: $scope,
					noBackdrop: false,
					hideOnStateChange: true
				};
			}
			$ionicLoading.show(opciones);
		},
		ocultarCarga: function() {
			$ionicLoading.hide();
		}
	};
};

app.factory("CargaFactory", ['$ionicLoading', CargaFactory]);

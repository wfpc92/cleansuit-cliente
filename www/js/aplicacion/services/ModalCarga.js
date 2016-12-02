var ModalCargaFactory = function($ionicLoading,
								$timeout, 
								$rootScope) {

	var promise = null;
	var $scope = null;
	var active = false;

	return {
		mostrar: function(mensaje, opciones) {
			var self = this;
			if(active) {return;}

			$scope = $scope || $rootScope.$new();
			mensaje = mensaje || " Cargando datos...";
			$scope.mensajeModal = $scope.mensajeModal || mensaje;
			
				console.log("ocultar");
			$scope.hide = function() {
				console.log("ocultar");
				self.ocultar();
			};
			
			opciones = opciones || {
				templateUrl: 'templates/modales/carga.html',
				scope: $scope,
				noBackdrop: false,
				hideOnStateChange: true
			};	

			$ionicLoading.show(opciones)
			active = true;

			promise = $timeout( function() {
				$scope.cerrar = true; 
			}, 5000);
		},
		ocultar: function() {
			console.log("ModalCargaFactory.ocultar()");
			if(promise) {
				console.log("promise");
				$timeout.cancel(promise);
			}

			if(active) {
				console.log("active")
				$ionicLoading.hide();
				active = false;
				$scope.cerrar = false; 
			}
		},
		setMensaje: function(mensaje) {
			$scope.mensajeModal = mensaje;
		}
	};
};

app.factory("ModalCargaFactory", ['$ionicLoading', '$timeout' , '$rootScope' , ModalCargaFactory]);

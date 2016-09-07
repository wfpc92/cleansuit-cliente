var ServiciosCtrl = function($scope,
							$log,
							ServiciosFactory,
							ModalCargaFactory,
							OrdenesFactory) {

	$log.debug("ServiciosCtrl");
	$scope.servicios = ServiciosFactory.servicios;

	$scope.cargarServicios = function() {
		$log.debug("ejecutando cargarServicios desde ServiciosCtrl.");
		ServiciosFactory
		.cargar()
		.then(function() { 
			$log.debug("la operacion cargarServicios ha sido terminada. ")
		});
	};

	$scope.hayServicios = function() {
		if(!$scope.servicios) {
			return false;
		}

		if($scope.servicios.length > 0) {
			return true;
		}
		
		return false;
	};
};

app.controller('ServiciosCtrl', ServiciosCtrl);

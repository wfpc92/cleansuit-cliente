var ServiciosCtrl = function($scope, 
							ServiciosFactory,
							ModalCargaFactory,
							OrdenesFactory) {

	console.log("ServiciosCtrl");
	$scope.servicios = ServiciosFactory.servicios;

	$scope.cargarServicios = function() {
		console.log("ejecutando cargarServicios desde ServiciosCtrl.");
		ServiciosFactory
		.cargar()
		.then(function() { 
			console.log("la operacion cargarServicios ha sido terminada. ")
			//$scope.servicios = ServiciosFactory.servicios;
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
	
	/*$scope.$on("$ionicView.beforeEnter", function() {
		$scope.servicios = ServiciosFactory.servicios;
	});	*/
};

app.controller('ServiciosCtrl', ServiciosCtrl);

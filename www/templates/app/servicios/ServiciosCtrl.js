var ServiciosCtrl = function($scope, 
							ServiciosFactory,
							ModalCargaFactory) {

	$scope.servicios = ServiciosFactory.getServicios();	

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.cargarServicios();
	});

	$scope.cargarServicios = function() {
		console.log("ejecutando cargarServicios desde ServiciosCtrl.");
		ServiciosFactory
		.cargar()
		.then( function() { 
			console.log("la operacion cargarServicios ha sido terminada. ")
			$scope.servicios = ServiciosFactory.getServicios();
		}, function(error) {
			console.log(error);
		});
	};
	

};

app.controller('ServiciosCtrl', ServiciosCtrl);

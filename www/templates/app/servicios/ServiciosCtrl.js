var ServiciosCtrl = function($scope, 
							ServiciosFactory,
							ModalCargaFactory,
							OrdenesFactory) {

	console.log("ServiciosCtrl");
	
	$scope.cargarServicios = function() {
		console.log("ejecutando cargarServicios desde ServiciosCtrl.");
		ServiciosFactory
		.cargar()
		.then(function() { 
			console.log("la operacion cargarServicios ha sido terminada. ")
			$scope.servicios = ServiciosFactory.servicios;
		});
	};
	
	$scope.$on("$ionicView.beforeEnter", function() {
		$scope.servicios = ServiciosFactory.servicios;
	});	
};

app.controller('ServiciosCtrl', ServiciosCtrl);

var ServiciosCtrl = function($scope, ServiciosFactory, CarritoFactory, ModalCargaFactory) {
	$scope.carrito = CarritoFactory;

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.servicios = ServiciosFactory.getServicios();	
	});

	$scope.cargarServicios = function() {
		console.log("ejecutando cargarServicios desde ServiciosCtrl.");
		ServiciosFactory.cargar(function() { 
			console.log("la operacion cargarServicios ha sido terminada. ")
			$scope.servicios = ServiciosFactory.getServicios();
		}, function(error) {
			console.log(error);
		}, function() {
			console.log("finaliza llamado cargar ServicioFactory.")
		});
	};

};

app.controller('ServiciosCtrl', ServiciosCtrl);


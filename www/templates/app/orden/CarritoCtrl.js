app.controller('CarritoCtrl', function($scope, CarritoFactory, $log, $ionicHistory, $state) {
	$scope.$on('$ionicView.leave', function(event, view){
		if(view.stateName == "app.carrito"){
			$scope.carrito.limpiar();
		}
	});

	$scope.carrito = CarritoFactory;
	
	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};

	$scope.aumentarProducto = function(producto){
		CarritoFactory.agregar(producto, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(producto){
		CarritoFactory.disminuir(producto, "PRODUCTO", 1);
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.cancelarOrden = function() {
			CarritoFactory.items = [];
			CarritoFactory.actualizarContadores();
			$state.go("app.inicio");
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			});
		};
	});
})
app.controller('CarritoCtrl', function($scope, CarritoFactory, $log) {
	/*$rootScope.$on('$ionicView.leave', function(event, view){
		console.log('left..', view.stateName);
	});*/

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
})
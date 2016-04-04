app.controller('ProductoCtrl', function($scope, $stateParams, ProductosFactory, CarritoFactory) {
	$scope.indexProducto = $stateParams.indexProducto;
	console.log($scope.indexProducto)
	console.log($stateParams)
	
	$scope.producto = ProductosFactory.productos[$scope.indexProducto];
	$scope.carrito = CarritoFactory;
	
	$scope.aumentarProducto = function(){
		CarritoFactory.agregar($scope.producto, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirProducto = function(){
		CarritoFactory.disminuir($scope.producto, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};
})
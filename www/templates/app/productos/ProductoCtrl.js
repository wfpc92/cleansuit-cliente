app.controller('ProductoCtrl', function($scope, $stateParams, ProductosFactory, CarritoFactory) {
	$scope.indexProducto = $stateParams.indexProducto;
	console.log($stateParams)
	
	$scope.producto = ProductosFactory.productos[indexProducto];
	$scope.carrito = CarritoFactory;
	
	$scope.aumentarProducto = function(){
		CarritoFactory.agregar($scope.indexProducto, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(producto){
		CarritoFactory.disminuir($scope.indexProducto, "PRODUCTO", 1);
	};
})
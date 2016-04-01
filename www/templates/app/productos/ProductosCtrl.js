app.controller('ProductosCtrl', function($scope, ProductosFactory, CarritoFactory) {
	$scope.productos = ProductosFactory.productos;
	$scope.carrito = CarritoFactory;
	
	$scope.aumentarProducto = function(index){
		CarritoFactory.agregar(index, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(index){
		CarritoFactory.disminuir(index, "PRODUCTO", 1);
	};
})
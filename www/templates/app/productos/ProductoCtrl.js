var ProductoCtrl = function($scope, 
							$stateParams, 
							ProductosFactory, 
							$ionicHistory, 
							$state) {
	
	console.log("ProductoCtrl");
	
	var indexProducto = $stateParams.indexProducto;
	$scope.producto = ProductosFactory.productos[indexProducto];

	/*$scope.$on("$ionicView.beforeEnter", function() {
		
	});	*/

	$scope.aumentarProducto = function(){
		$scope.carrito.agregar($scope.producto, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(){
		$scope.carrito.disminuir($scope.producto, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.regresarCatalogo = function() {
		$state.go("app.productos");
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
	};
	
};

app.controller('ProductoCtrl', ProductoCtrl);

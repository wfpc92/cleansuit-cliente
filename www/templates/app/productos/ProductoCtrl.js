var ProductoCtrl = function($scope, 
							$stateParams, 
							ProductosFactory, 
							$ionicHistory, 
							$state) {
	
	$scope.aumentarProducto = function(){
		$scope.carrito.agregar($scope.producto, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(){
		$scope.carrito.disminuir($scope.producto, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		var indexProducto = $stateParams.indexProducto;
		$scope.producto = ProductosFactory.getProductos()[indexProducto];
		//console.log("se ha seleccionado el producto en $index: "+ indexProducto)
		
		$scope.cantidadEnCarrito = function(indexProducto) {
			//console.log("cantidad en carrito")
			var item = $scope.carrito.items[indexProducto];
			//console.log("item del carrito con index: "+indexServicio)
			//console.log(item)
			if(typeof item !== 'undefined'){
				return item.cantidad
			}
			else {
				return 0;
			}
		};

		$scope.regresarCatalogo = function() {
			$state.go("app.productos");
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			})
		};
	});
};

app.controller('ProductoCtrl', ProductoCtrl);

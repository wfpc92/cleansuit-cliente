app.controller('ProductoCtrl', function($scope, $stateParams, ProductosFactory, CarritoFactory, $ionicHistory, $state) {
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

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.cantidadEnCarrito = function(indexProducto) {
			//console.log("cantidad en carrito")
			var item = CarritoFactory.items[indexProducto];
			//console.log("item del carrito con index: "+indexServicio)
			//console.log(item)
			if(typeof item !== 'undefined'){
				return item.cantidad
			}
			else {
				return 0;
			}
		}

		$scope.regresarCatalogo = function() {
			$state.go("app.productos");
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			})
		}
	});
})
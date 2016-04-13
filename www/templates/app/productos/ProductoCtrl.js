var ProductoCtrl = function($scope, $stateParams, ProductosFactory, CarritoFactory, $ionicHistory, $state) {
	var self = this;
	
	$scope.producto = ProductosFactory.productos[$stateParams.indexProducto];
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
		self.viewAfterEnter($scope, CarritoFactory, $state, $ionicHistory);
	});
};

ProductoCtrl.prototype.viewAfterEnter = function($scope, CarritoFactory, $state, $ionicHistory) {
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
};

app.controller('ProductoCtrl', ProductoCtrl);
var ProductosCtrl = function($scope,
							ProductosFactory) {
	
	$scope.productos = ProductosFactory.getProductos();
	
	$scope.aumentarProducto = function(index) {
		$scope.carrito.agregar(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(index) {
		$scope.carrito.disminuir(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.cargarProductos();
	});

	$scope.cargarProductos = function() {
		console.log("ejecutando cargarProductos desde ProductosCtrl.");
		ProductosFactory.cargar()
		.then( function() { 
			console.log("la operacion cargar productos ha sido terminada. ");
			$scope.productos = ProductosFactory.getProductos();
		}, function(error) {
			//error
			console.log("hubo un error al cargar productos", error);
		});
	}

	$scope.cantidadEnCarrito = function(indexProducto) {
		//console.log("ProductosCtrl.cantidadEnCarrito()", indexProducto);
		var item = $scope.carrito.items[indexProducto];
		if(typeof item !== 'undefined'){
			return item.cantidad
		}
		else {
			return 0;
		}
	}

	/*var element = document.getElementById("lstProductos");
	ionic.onGesture('swipe', function() {
		console.log("swipe event")
	},element, {});*/
};

app.controller('ProductosCtrl', ProductosCtrl);

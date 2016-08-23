var ProductosCtrl = function($scope,
							ProductosFactory,
							TutorialFactory) {
	
	$scope.productos = ProductosFactory.getProductos();
	
	$scope.aumentarProducto = function(index) {
		$scope.carrito.agregar(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(index) {
		$scope.carrito.disminuir(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.$on('$ionicView.beforeEnter', function(event) {
		$scope.cargarProductos();
	});

	$scope.cargarProductos = function() {
		console.log("ejecutando cargarProductos desde ProductosCtrl.");
		ProductosFactory
		.cargar()
		.then( function() { 
			console.log("la operacion cargar productos ha sido terminada. ");
			//$scope.productos = [];
			$scope.productos = ProductosFactory.getProductos();
		}, function(error) {
			//error
			console.log("hubo un error al cargar productos", error);
		});
	};

	$scope.tutorial = TutorialFactory;
	$scope.tipo = "PRODUCTOS";
};

app.controller('ProductosCtrl', ProductosCtrl);

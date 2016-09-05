var ProductosCtrl = function($scope,
							ProductosFactory,
							TutorialFactory,
							$timeout,
							ModalCargaFactory) {
	
	console.log("ProductosCtrl");
	$scope.productos = ProductosFactory.productos;

	$scope.aumentarProducto = function(index) {
		$scope.carrito.agregar(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirProducto = function(index) {
		$scope.carrito.disminuir(index, "PRODUCTO", 1);
		$scope.carrito.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		if ($scope.productos.length > 0) {
			$scope.timeoutTutorial = $timeout(function(){
				TutorialFactory.mostrarTutorial($scope.tipo);	
			}, 800);
		}
	});

	$scope.$on("$ionicView.beforeLeave", function() {
		$timeout.cancel($scope.timeoutTutorial);
	});

	$scope.cargarProductos = function() {
		console.log("ProductosCtrl.cargarProductos()");
		ProductosFactory
		.cargar()
		.then( function() {
			//$scope.productos = ProductosFactory.productos;
		});
	};

	$scope.hayProductos = function() {
		if(!$scope.productos) {
			return false;
		}

		if($scope.productos.length > 0) {
			return true;
		}
		
		return false;
	};

	$scope.tutorial = TutorialFactory;
	$scope.tipo = "PRODUCTOS";
	$scope.idLst = "lstProductos";
	TutorialFactory.setIdLst("#" + $scope.idLst);
};

app.controller('ProductosCtrl', ProductosCtrl);

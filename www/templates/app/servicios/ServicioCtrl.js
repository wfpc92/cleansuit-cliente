app.controller('ServicioCtrl', function($scope, $stateParams, ServiciosFactory, CarritoFactory, $ionicHistory, $state) {
	$scope.indexCategoria = $stateParams.indexCategoria;
	$scope.indexServicio = $stateParams.indexServicio;
	$scope.servicio = ServiciosFactory.categorias[$scope.indexCategoria].servicios[$scope.indexServicio]
	//$log.debug("index de categoria: "+$scope.indexCategoria+", index servicio: "+$scope.indexServicio);

	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};
	$scope.carrito = CarritoFactory;	

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.cantidadEnCarrito = function(indexServicio) {
			//console.log("cantidad en carrito")
			var item = CarritoFactory.items[indexServicio];
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
			$state.go("app.categorias");
			$ionicHistory.clearHistory();
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			})
		};
	});
})
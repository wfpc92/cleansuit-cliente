var OrdenEnProcesoCtrl = function ($scope,
								$stateParams,
								$log,
								OrdenesFactory,
								EstadosFactory,
								$ionicHistory,
								$state) {
	
	$log.debug("OrdenEnProcesoCtrl");
	
	$scope.$on("$ionicView.beforeEnter", function () {
		var indexOrden = $stateParams.indexOrden;
		$log.debug("index orden en proceso: "+indexOrden);
		
		$scope.orden = OrdenesFactory.ordenesEnProceso[indexOrden];
		var pos = EstadosFactory.posEstadoOrden($scope.orden);
		//indica que la vista que se muestra es la de ordenes en proceso.
		$scope.esOrdenEnProceso = true;
		$scope.soloProductos = $scope.carrito.soloHayProductos($scope.orden.items);
		$scope.estados = EstadosFactory.estados($scope.orden);
		$scope.estados[pos].activated = true;
		$scope.miEstado = $scope.estados[pos];
	});

	
	$scope.regresarPrincipal = function() {
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache()
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		});
		$state.go("app.inicio");	
	};
};

app.controller('OrdenEnProcesoCtrl', OrdenEnProcesoCtrl);
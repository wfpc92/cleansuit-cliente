var OrdenEnProcesoCtrl = function ($scope,
								$stateParams,
								OrdenesFactory,
								EstadosFactory,
								$ionicHistory,
								$state) {
	
	console.log("OrdenEnProcesoCtrl");
	var indexOrden = $stateParams.indexOrden;

	$scope.orden = OrdenesFactory.ordenesEnProceso[indexOrden];
	//indica que la vista que se muestra es la de ordenes en proceso.
	$scope.esOrdenEnProceso = true;

	$scope.soloProductos = $scope.carrito.soloHayProductos($scope.orden.items);

	console.log("index orden en proceso: "+indexOrden);
	console.log($scope.orden)

	$scope.estados = EstadosFactory.estados($scope.orden);
	$scope.miEstado = EstadosFactory.getEstado($scope.orden);

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
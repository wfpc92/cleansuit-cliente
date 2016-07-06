var OrdenEnProcesoCtrl = function ($scope,
								$stateParams,
								OrdenesFactory,
								EstadosFactory,
								$ionicHistory,
								$state) {
	
	var indexOrden = $stateParams.indexOrden;

	$scope.orden = OrdenesFactory.getOrdenesEnProceso()[indexOrden];
	//indica que la vista que se muestra es la de ordenes en proceso.
	$scope.esOrdenEnProceso = true;

	console.log("index orden en proceso: "+indexOrden);
	console.log($scope.orden)

	$scope.estados = EstadosFactory.estados;

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
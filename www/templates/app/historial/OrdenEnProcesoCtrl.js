var OrdenEnProcesoCtrl = function ($scope,
								$stateParams,
								HistorialOrdenFactory,
								EstadosFactory,
								$ionicHistory,
								$state) {
	
	var indexOrden = $stateParams.indexOrden;

	$scope.orden = HistorialOrdenFactory.getOrdenesEnProceso()[indexOrden];

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
var OrdenEnProcesoCtrl = function ($scope, $stateParams, HistorialOrdenFactory, EstadosFactory, $ionicHistory, $state) {
	$scope.orden = HistorialOrdenFactory.ordenesEnProceso[$stateParams.indexOrden];
	console.log("ordenes en proceso: "+$stateParams.indexOrden)
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
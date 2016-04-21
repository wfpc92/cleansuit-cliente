var RealizarOrdenCtrl = function($scope, RealizarOrdenFactory, $state, $ionicHistory, EstadosFactory) {
	var self = this;

	$scope.estados = EstadosFactory.estados;
	$scope.orden = RealizarOrdenFactory.ultimaOrden();
	console.log("ultima orden: ")
	console.log($scope.orden);

	$scope.regresarPrincipal = function() {
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache()
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		});
		$state.go("app.inicio");	
	};
};


app.controller('RealizarOrdenCtrl', RealizarOrdenCtrl);

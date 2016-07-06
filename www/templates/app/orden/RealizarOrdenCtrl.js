var RealizarOrdenCtrl = function($scope, 
								OrdenesFactory,
								$state, 
								$ionicHistory) {
	var self = this;
 
	$scope.orden = OrdenesFactory.orden;
	
	console.log("Orden: ", $scope.orden);

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

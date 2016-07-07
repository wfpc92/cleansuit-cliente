var RealizarOrdenCtrl = function($scope, 
								OrdenesFactory,
								$state, 
								$ionicHistory) {
	var self = this;
 
	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.orden = OrdenesFactory.getUltimaOrden();
		console.log("RealizarOrdenCtrl, ", $scope.orden)
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

app.controller('RealizarOrdenCtrl', RealizarOrdenCtrl);

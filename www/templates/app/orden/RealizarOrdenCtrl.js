app.controller('RealizarOrdenCtrl', function($scope, RealizarOrdenFactory, $state, $ionicHistory) {
	//actualizar los datos 
	RealizarOrdenFactory.realizarOrden();

	$scope.$on('$ionicView.leave', function(event) {

		//$state.go("app.carrito");
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache()
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		});
		$state.go("app.inicio");
	});
})

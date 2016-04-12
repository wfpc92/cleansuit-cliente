var RealizarOrdenCtrl = function($scope, RealizarOrdenFactory, $state, $ionicHistory) {
	var self = this;

	RealizarOrdenFactory.realizarOrden();

	$scope.$on('$ionicView.leave', function() {
		self.viewLeave($state, $ionicHistory);
	});
};

RealizarOrdenCtrl.prototype.viewLeave = function($state, $ionicHistory) {
	//$state.go("app.carrito");
	$ionicHistory.clearHistory();
	$ionicHistory.clearCache()
	$ionicHistory.nextViewOptions({
		disableBack:'true'
	});
	$state.go("app.inicio");
}

app.controller('RealizarOrdenCtrl', RealizarOrdenCtrl);

var CarritoCtrl = function($scope, CarritoFactory, $log, $ionicHistory, $state, $ionicPopup) {
	var self = this;

	$scope.$on('$ionicView.leave', function(event, view){
		self.viewLeave(view, $scope.carrito);
	});

	$scope.carrito = CarritoFactory;
	
	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};

	$scope.aumentarProducto = function(producto){
		CarritoFactory.agregar(producto, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(producto){
		CarritoFactory.disminuir(producto, "PRODUCTO", 1);
	};

	$scope.cancelarOrden = function() {
		var confirmPopup = $ionicPopup.confirm({
	    	title: 'Cancelar Orden?',
	    	template: '¿Está seguro que desea cancelar esta orden?'
	    });

		confirmPopup.then(function(res) {
			if(res) {
				self.cancelarOrden(CarritoFactory, $state, $ionicHistory);
			} else {
				console.log('You are not sure');
			}
		});
	};
};


CarritoCtrl.prototype.viewLeave = function(view, carrito){
	if(view.stateName == "app.carrito"){
		carrito.limpiar();
	}
};

CarritoCtrl.prototype.cancelarOrden = function(CarritoFactory, $state, $ionicHistory) {
	CarritoFactory.cancelarOrden();
	CarritoFactory.actualizarContadores();
	$state.go("app.inicio");
	$ionicHistory.clearHistory();
	$ionicHistory.nextViewOptions({
		disableBack:'true'
	});
}


app.controller('CarritoCtrl', CarritoCtrl);
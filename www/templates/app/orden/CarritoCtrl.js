var CarritoCtrl = function($scope, 
						$ionicHistory, 
						$state, 
						$ionicPopup,
						OrdenesFactory,
						$log) {
	
	console.log("CarritoCtrl");
	
	//se ejecuta al dejar la vista, limpiar carrito.
	$scope.$on('$ionicView.leave', function(event, view){
		if(view.stateName == "app.carrito"){
			$scope.carrito.limpiar();
		}
	});

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.banderas.swp=false;
		$scope.banderas.sws=false;
	});

	$scope.aumentar = function(item, tipo){
		$scope.carrito.agregar(item, tipo, 1);
	};

	$scope.disminuir = function(item, tipo){
		$scope.carrito.disminuir(item, tipo, 1);
	};

	//cancelar orden:
	$scope.cancelarOrden = function() {
		$ionicPopup
		.confirm({
	    	title: 'Cancelar Orden',
	    	template: '¿Está seguro que desea cancelar esta orden?'
	    })
		.then(function(res) {
			if(res) {
				OrdenesFactory.limpiarOrden();
				$state.go("app.inicio");
				$ionicHistory.clearHistory();
				$ionicHistory.nextViewOptions({
					disableBack:'true'
				});
			}
		});
	};
};


app.controller('CarritoCtrl', CarritoCtrl);

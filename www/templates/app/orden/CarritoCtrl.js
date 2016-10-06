var CarritoCtrl = function($scope, 
						$ionicHistory, 
						$state, 
						$ionicPopup,
						OrdenesFactory,
						$log) {
	
	$log.debug("CarritoCtrl");
	
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
	    	template: '¿Está seguro que desea cancelar esta orden?',
	    	buttons: [
		    	{
		    		text: 'Si',
		    		onTap: function(e) {
		    			OrdenesFactory.limpiarOrden();
						$ionicHistory.clearHistory();
						$ionicHistory.nextViewOptions({
							disableBack:'true'
						});
						$state.go("app.inicio");
		    		}
		    	},
		      	{
			    	text: '<b>No</b>',
			    	type: 'button-positive'
		      	}
		    ]
	    });
	};
};


app.controller('CarritoCtrl', CarritoCtrl);

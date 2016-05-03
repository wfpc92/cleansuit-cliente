var ServicioCtrl = function($scope, $stateParams, ServiciosFactory, CarritoFactory, $ionicHistory, $state) {
	var self = this;
	var i = $stateParams.indexCategoria;
	var j = $stateParams.indexServicio;
	$scope.servicio = ServiciosFactory.getServicios()[i][j];
	$scope.carrito = CarritoFactory;
	self.$scope = $scope;
	//$log.debug("index de categoria: "+$scope.indexCategoria+", index servicio: "+$scope.indexServicio);

	$scope.aumentarServicio = function(servicio){
		console.log("Agregar item de servicio al carrito desde ServicioCtrl");
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirServicio = function(servicio){
		console.log("Disminuir item de servicio del carrito desde ServicioCtrl");
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};	

	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter();
	});

	$scope.regresarCatalogo = function() {
		$state.go("app.categorias");
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
	};
};

ServicioCtrl.prototype.viewAfterEnter = function() {
	var self = this;	
	
	self.$scope.cantidadEnCarrito = function(indexServicio) {
		//console.log("cantidad en carrito")
		var item = self.$scope.carrito.items[indexServicio];
		//console.log("item del carrito con index: "+indexServicio)
		//console.log(item)
		if(typeof item !== 'undefined'){
			return item.cantidad
		}
		else {
			return 0;
		}
	};
};

app.controller('ServicioCtrl', ServicioCtrl);
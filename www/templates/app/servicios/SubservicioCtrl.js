var SubservicioCtrl = function($scope, $stateParams, ServiciosFactory, CarritoFactory, $ionicHistory, $state) {
	var self = this;
	var i = $stateParams.indexServicio;
	var j = $stateParams.indexSubservicio; 
	$scope.subservicio = ServiciosFactory.getServicios()[i][j];
	$scope.carrito = CarritoFactory;
	self.$scope = $scope;
	//$log.debug("index de categoria: "+$scope.indexCategoria+", index servicio: "+$scope.indexServicio);

	$scope.aumentarSubservicio = function(servicio){
		console.log("Agregar item de servicio al carrito desde SubservicioCtrl");
		CarritoFactory.agregar(subservicio, "SUBSERVICIO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirSubservicio = function(servicio){
		console.log("Disminuir item de servicio del carrito desde SubservicioCtrl");
		CarritoFactory.disminuir(subservicio, "SUBSERVICIO", 1);
		CarritoFactory.limpiar();
	};	

	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter();
	});

	$scope.regresarCatalogo = function() {
		$state.go("app.servicios");
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
	};
};

SubservicioCtrl.prototype.viewAfterEnter = function() {
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

app.controller('SubservicioCtrl', SubservicioCtrl);
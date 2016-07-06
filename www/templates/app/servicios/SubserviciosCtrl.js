var SubserviciosCtrl = function($scope, $stateParams, ServiciosFactory, CarritoFactory, UsuarioFactory) {
	var self = this
	self.$scope = $scope;
	$scope.indexServicio = $stateParams.indexServicio;
	$scope.servicio = ServiciosFactory.getServicios()[$scope.indexServicio];
	$scope.carrito = CarritoFactory;
	console.log($scope.servicio)
	 
	$scope.aumentarSubservicio = function(subservicio){
		console.log("Agregar item de subservicio al carrito desde SubserviciosCtrl");
		CarritoFactory.agregar(subservicio, "SUBSERVICIO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirSubservicio = function(subservicio){
		console.log("Disminuir item de servicio del carrito desde SubserviciosCtrl");
		CarritoFactory.disminuir(subservicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};
	
	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter();
	});
	
};

SubserviciosCtrl.prototype.viewAfterEnter = function(){
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
	}
}

app.controller("SubserviciosCtrl", SubserviciosCtrl);
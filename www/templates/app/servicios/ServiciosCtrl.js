var ServiciosCtrl = function($scope, $stateParams, ServiciosFactory, CarritoFactory, UsuarioFactory) {
	var self = this;
	$scope.indexCategoria = $stateParams.indexCategoria;
	$scope.categoria = ServiciosFactory.getCategorias()[$scope.indexCategoria];
	$scope.servicios = ServiciosFactory.getServicios()[$scope.indexCategoria];
	$scope.carrito = CarritoFactory;
	this.$scope = $scope;
	
	$scope.aumentarServicio = function(servicio){
		console.log("Agregar item de servicio al carrito desde ServiciosCtrl");
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirServicio = function(servicio){
		console.log("Disminuir item de servicio del carrito desde ServiciosCtrl");
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};
	
	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter($scope, CarritoFactory);
	});
	
};

ServiciosCtrl.prototype.viewAfterEnter = function(){
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

app.controller("ServiciosCtrl", ServiciosCtrl);
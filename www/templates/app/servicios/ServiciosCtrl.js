var ServiciosCtrl = function($scope, $stateParams, ServiciosFactory, CarritoFactory) {
	var self = this;
	//$log.debug("index de la categoria en el arreglo: "+$scope.indexCategoria)
	
	//obtener subservicios de la categoria solicitada
	$scope.indexCategoria = $stateParams.indexCategoria;
	$scope.servicios = ServiciosFactory.categorias[$scope.indexCategoria].servicios;
	$scope.carrito = CarritoFactory;

	$scope.aumentarServicio = function(servicio){
		console.log("aumentar servicio")
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirServicio = function(servicio){
		console.log("disminuir Servicio")
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
		CarritoFactory.limpiar();
	};
	

	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter($scope, CarritoFactory);
	});

	
};

ServiciosCtrl.prototype.viewAfterEnter = function($scope, CarritoFactory){
	$scope.cantidadEnCarrito = function(indexServicio) {
		//console.log("cantidad en carrito")
		var item = CarritoFactory.items[indexServicio];
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
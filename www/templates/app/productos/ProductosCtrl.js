var ProductosCtrl = function($scope, ProductosFactory, CarritoFactory) {
	var self = this;
	
	$scope.productos = ProductosFactory.productos;
	$scope.carrito = CarritoFactory;
	
	$scope.aumentarProducto = function(index){
		CarritoFactory.agregar(index, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirProducto = function(index){
		CarritoFactory.disminuir(index, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter($scope, CarritoFactory);
	});
};

ProductosCtrl.prototype.viewAfterEnter = function($scope, CarritoFactory){
	$scope.cantidadEnCarrito = function(indexProducto) {
		//console.log("cantidad en carrito")
		var item = CarritoFactory.items[indexProducto];
		//console.log("item del carrito con index: "+indexServicio)
		//console.log(item)
		if(typeof item !== 'undefined'){
			return item.cantidad
		}
		else {
			return 0;
		}
	}
};

app.controller('ProductosCtrl', ProductosCtrl);
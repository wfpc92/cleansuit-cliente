var ProductoCtrl = function($scope, 
	$stateParams, 
	ProductosFactory, 
	CarritoFactory, 
	$ionicHistory, 
	$state) {
	var self = this;

	this.$scope = $scope;
	this.$stateParams = $stateParams;
	this.ProductosFactory = ProductosFactory;
	this.CarritoFactory = CarritoFactory;
	this.$ionicHistory = $ionicHistory;
	this.$state = $state;

	$scope.aumentarProducto = function(){
		CarritoFactory.agregar($scope.producto, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirProducto = function(){
		CarritoFactory.disminuir($scope.producto, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter();
	});
};

ProductoCtrl.prototype.viewAfterEnter = function() {
	var self = this;
	console.log("se ha seleccionado el producto en $index: "+ self.$stateParams.indexProducto)
	self.$scope.producto = self.ProductosFactory.getProductos()[self.$stateParams.indexProducto];
	self.$scope.carrito = self.CarritoFactory;
	
	self.$scope.cantidadEnCarrito = function(indexProducto) {
		//console.log("cantidad en carrito")
		var item = self.CarritoFactory.items[indexProducto];
		//console.log("item del carrito con index: "+indexServicio)
		//console.log(item)
		if(typeof item !== 'undefined'){
			return item.cantidad
		}
		else {
			return 0;
		}
	}

	self.$scope.regresarCatalogo = function() {
		self.$state.go("app.productos");
		self.$ionicHistory.clearHistory();
		self.$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
	}
};

app.controller('ProductoCtrl', ProductoCtrl);
var ProductosCtrl = function($scope, ProductosFactory, CarritoFactory, RecursosFactory) {
	var self = this; 
	$scope.productos = ProductosFactory.getProductos();
	$scope.carrito = CarritoFactory;
	this.$scope = $scope;
	
	$scope.aumentarProducto = function(index) {
		CarritoFactory.agregar(index, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.disminuirProducto = function(index) {
		CarritoFactory.disminuir(index, "PRODUCTO", 1);
		CarritoFactory.limpiar();
	};

	$scope.$on('$ionicView.afterEnter', function(event) {
		self.viewAfterEnter();
	});

	$scope.cargarProductos = function() {
		console.log("ejecutando cargarProductos desde ProductosCtrl.");
		ProductosFactory.cargar(function() { 
			console.log("la operacion cargar productos ha sido terminada. ");
			$scope.productos = ProductosFactory.getProductos();
		}, function(error) {
			//error
			console.log("hubo un error al cargar productos", error);
		},
		function(){
			//finally
		});
	}

	var element = document.getElementById("lsẗProductos");
	ionic.onGesture('swipe', function() {
		console.log("swipe event")
	},element, {});
};

ProductosCtrl.prototype.viewAfterEnter = function(){
	var self = this;
	this.$scope.cantidadEnCarrito = function(indexProducto) {
		//console.log("cantidad en carrito")
		var item = self.$scope.carrito.items[indexProducto];
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
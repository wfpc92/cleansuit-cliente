angular.module('ClienteCleanSuit.controllers', ['ClienteCleanSuit.services'])
  
.controller('AppCtrl', function($scope, CarritoFactory, HistorialOrdenFactory) {
	$scope.carrito = CarritoFactory;
	$scope.contOrdenesEnProceso = HistorialOrdenFactory.ordenesEnProceso.length;
	//$rootScope.usuario = FabricaDatos.usuario;
	//$rootScope.carrito = FabricaDatos.carrito;
	/*$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, 1).servicios, 12), 'SERVICIO', 3);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.productos, 1), 'PRODUCTO', 1);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.productos, 2), 'PRODUCTO', 1);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, 1).servicios, 13), 'SERVICIO', 2);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.productos, 4), 'PRODUCTO', 1);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, 1).servicios, 14), 'SERVICIO', 1);
	*/
	//FabricaDatos.carrito.actualizarContadores();

})
 
.controller('AppInicioCtrl', function($scope, PromocionesFactory, CarritoFactory, $log) {
	$scope.promociones = PromocionesFactory.promociones;
	$scope.carrito = CarritoFactory;
})


.controller('CategoriasCtrl', function($scope, ServiciosFactory, CarritoFactory) {
	$scope.categorias = ServiciosFactory.categorias;
	$scope.carrito = CarritoFactory;
})

.controller('ServiciosCtrl', function($scope, $stateParams, ServiciosFactory, CarritoFactory) {
	$scope.idCategoria = $stateParams.idCategoria;
	
	//obtener subservicios de la categoria solicitada
	$scope.servicios = ServiciosFactory.getServicios($scope.idCategoria);
	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};
	$scope.carrito = CarritoFactory;
})

.controller('ServicioCtrl', function($scope, $stateParams, ServiciosFactory, CarritoFactory) {
	$scope.idCategoria = $stateParams.idCategoria;
	$scope.idServicio = $stateParams.idServicio;
	$scope.servicio = ServiciosFactory.getServicio($scope.idCategoria, $scope.idServicio);
	
	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};
	$scope.carrito = CarritoFactory;	
})

.controller('ProductosCtrl', function($scope, ProductosFactory, CarritoFactory) {
	$scope.productos = ProductosFactory.productos;
	$scope.carrito = CarritoFactory;
	
	$scope.aumentarProducto = function(producto){
		CarritoFactory.agregar(producto, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(producto){
		CarritoFactory.disminuir(producto, "PRODUCTO", 1);
	};
})

.controller('ProductoCtrl', function($scope, $stateParams, ProductosFactory, CarritoFactory) {
	var idProducto = $stateParams.idProducto;
	$scope.producto = ProductosFactory.getProducto(idProducto);
	$scope.carrito = CarritoFactory;
	
	$scope.aumentarProducto = function(producto){
		CarritoFactory.agregar(producto, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(producto){
		CarritoFactory.disminuir(producto, "PRODUCTO", 1);
	};
})

.controller('CarritoCtrl', function($scope, CarritoFactory, $log) {
	/*$rootScope.$on('$ionicView.leave', function(event, view){
		console.log('left..', view.stateName);
	});*/

	$scope.$on('$ionicView.leave', function(event, view){
		if(view.stateName == "app.carrito"){
			$scope.carrito.limpiar();
		}
	});

	$scope.carrito = CarritoFactory;
	
	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};

	$scope.aumentarProducto = function(producto){
		CarritoFactory.agregar(producto, "PRODUCTO", 1);
	};

	$scope.disminuirProducto = function(producto){
		CarritoFactory.disminuir(producto, "PRODUCTO", 1);
	};
})

.controller('InformacionOrdenCtrl', function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $ionicPopover, $ionicHistory) {
	$scope.usuario = UsuarioFactory.getUsuario;
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;
	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = CarritoFactory.soloHayProductos();
	$scope.terminosCondiciones = false; //terminos y condiciones 
	

	$scope.formaPago = function(formaPago){
		$scope.orden.formaPago = formaPago;
		$scope.closePopover();
	};

	$ionicPopover.fromTemplateUrl('templates/app/orden/popover-forma-pago.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

	$scope.openPopover = function($event) {
    	$scope.popover.show($event);
    };
    $scope.closePopover = function() {
    	$scope.popover.hide();
    };

    $ionicHistory.clearHistory();

})

.controller('CancelarOrdenCtrl', function($scope, CarritoFactory, $state) {
	CarritoFactory.items = [];
	CarritoFactory.actualizarContadores();
	$state.go('app.inicio');	
})

.controller('RealizarOrdenCtrl', function($scope, RealizarOrdenFactory) {
	//actualizar los datos 
	RealizarOrdenFactory.realizarOrden();

})



.controller('OrdenesEnProcesoCtrl', function ($scope, HistorialOrdenFactory) {
	$scope.ordenes = HistorialOrdenFactory.ordenesEnProceso;
	
})

.controller('OrdenEnProcesoCtrl', function ($scope, $stateParams, HistorialOrdenFactory, EstadosFactory) {
	var idOrden = $stateParams.idOrden;
	$scope.orden = HistorialOrdenFactory.getOrdenEnProceso(idOrden);
	$scope.estados = EstadosFactory.estados;
})



.controller('HistorialOrdenesCtrl', function ($scope, HistorialOrdenFactory) {
	HistorialOrdenFactory.obtenerHistorial(); 
	$scope.ordenes = HistorialOrdenFactory.historialOrdenes;
})

.controller('HistorialOrdenCtrl', function ($scope, $stateParams, HistorialOrdenFactory) {
	var idOrden = $stateParams.idOrden;
	$scope.ordenHistorica = HistorialOrdenFactory.getOrdenHistorica(idOrden);
})




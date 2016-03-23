angular.module('ClienteCleanSuit.controllers', ['ClienteCleanSuit.services','ngTouch'])
  
.controller('AppCtrl', function($rootScope, $scope, FabricaDatos) {
	$rootScope.usuario = FabricaDatos.usuario;
	$rootScope.carrito = FabricaDatos.carrito;

	/*$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, 1).servicios, 12), 'SERVICIO', 3);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.productos, 1), 'PRODUCTO', 1);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.productos, 2), 'PRODUCTO', 1);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, 1).servicios, 13), 'SERVICIO', 2);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.productos, 4), 'PRODUCTO', 1);
	$rootScope.carrito.agregar(FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, 1).servicios, 14), 'SERVICIO', 1);
	*/

	FabricaDatos.carrito.actualizarContadores();
	
	$rootScope.aumentarServicio = function(servicio){
		FabricaDatos.carrito.agregar(servicio, "SERVICIO", 1);
	};

	$rootScope.disminuirServicio = function(servicio){
		FabricaDatos.carrito.disminuir(servicio, "SERVICIO", 1);
	};

	$rootScope.aumentarProducto = function(producto){
		FabricaDatos.carrito.agregar(producto, "PRODUCTO", 1);
	};

	$rootScope.disminuirProducto = function(producto){
		FabricaDatos.carrito.disminuir(producto, "PRODUCTO", 1);
	};

})
 
.controller('AppInicioCtrl', function($scope, FabricaDatos, $rootScope) {
	$scope.promociones = FabricaDatos.promociones;	
})


.controller('CategoriasCtrl', function($scope, FabricaDatos) {
	$scope.categorias = FabricaDatos.categorias;
})

.controller('ServiciosCtrl', function($scope, $stateParams, FabricaDatos) {
	var idCategoria = $stateParams.idCategoria;
	$scope.idCategoria = idCategoria;
	$scope.servicios = FabricaDatos.get(FabricaDatos.categorias, idCategoria).servicios;
})

.controller('ServicioCtrl', function($scope, $stateParams, FabricaDatos) {
	var idCategoria = $stateParams.idCategoria;
	var idServicio = $stateParams.idServicio;
	$scope.idCategoria = idCategoria;
	$scope.idServicio = idServicio;
	$scope.servicio = FabricaDatos.get(FabricaDatos.get(FabricaDatos.categorias, idCategoria).servicios, idServicio);
})

.controller('ProductosCtrl', function($rootScope, $scope, FabricaDatos) {
	$scope.productos = FabricaDatos.productos;
})

.controller('ProductoCtrl', function($rootScope, $scope, FabricaDatos, $stateParams) {
	var idProducto = $stateParams.idProducto;
	$scope.producto = FabricaDatos.get(FabricaDatos.productos, idProducto);
})

.controller('CarritoCtrl', function($rootScope, $scope, FabricaDatos) {
	/*$rootScope.$on('$ionicView.leave', function(event, view){
		console.log('left..', view.stateName);
	});*/
})

.controller('InformacionOrdenCtrl', function($rootScope, $scope, FabricaDatos, $ionicPopover,$ionicHistory) {
	$scope.orden = FabricaDatos.orden;
	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = FabricaDatos.carrito.soloHayProductos();
	$scope.terminosCondiciones = false; //terminos y condiciones 
	$scope.formIncompleto = false;

	$scope.formaPago= function(formaPago){
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

.controller('CancelarOrdenCtrl', function($rootScope, $scope, FabricaDatos, $state) {
	FabricaDatos.carrito.items = [];
	FabricaDatos.carrito.actualizarContadores();
	$state.go('app.inicio');	
})

.controller('RealizarOrdenCtrl', function($rootScope, $scope, FabricaDatos) {
	//actualizar los datos 
	FabricaDatos.orden.realizarOrden();

})



.controller('OrdenesEnProcesoCtrl', function ($scope, FabricaDatos, $rootScope) {
	
	$scope.ordenes = FabricaDatos.usuario.ordenesEnProceso;
	
})

.controller('OrdenEnProcesoCtrl', function ($scope, FabricaDatos, $rootScope, $stateParams) {
	var idOrden = $stateParams.idOrden;
	$scope.orden = FabricaDatos.get(FabricaDatos.usuario.ordenesEnProceso, idOrden);
	$scope.estados = FabricaDatos.estados;
})




.controller('HistorialOrdenesCtrl', function ($scope, FabricaDatos) {
	FabricaDatos.usuario.obtenerHistorial();
	$scope.ordenes = FabricaDatos.usuario.historialOrdenes;
})

.controller('HistorialOrdenCtrl', function ($scope, $stateParams, FabricaDatos) {
	var idOrden = $stateParams.idOrden;
	$scope.ordenHistorica = FabricaDatos.get(FabricaDatos.usuario.ordenes, idOrden);
})




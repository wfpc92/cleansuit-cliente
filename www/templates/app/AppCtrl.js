app.controller('AppCtrl', function($scope, CarritoFactory, HistorialOrdenFactory) {
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
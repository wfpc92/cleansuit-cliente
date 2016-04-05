
app.controller('InformacionOrdenCtrl', function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $ionicPopover, $ionicHistory) {
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
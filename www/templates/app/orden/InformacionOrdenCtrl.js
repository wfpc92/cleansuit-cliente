
app.controller('InformacionOrdenCtrl', function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $ionicPopover, $ionicHistory, $log) {
	$scope.usuario = UsuarioFactory.getUsuario;
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;
	$scope.orden.telefono = $scope.usuario.telefono;


	

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

    $scope.$on('$ionicView.afterEnter', function(event) {
    	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
		$scope.soloProductos = CarritoFactory.soloHayProductos();
		$log.debug("solo hay productos: "+ $scope.soloProductos)
		$scope.terminosCondiciones = false; //terminos y condiciones
		$scope.formIncompleto = true;

		if($scope.soloProductos){
			$scope.$watchGroup([
				'orden.direccionEntrega.direccion',
				'orden.telefono',
				'orden.formaPago',
				'terminosCondiciones'], function(newV, oldV, scope){
					if(newV[0] && newV[1] && newV[2]){
						$scope.formIncompleto = false;
					}
				});
		} else {
			$scope.$watchGroup([
				'orden.direccionRecoleccion.direccion',
				'orden.direccionRecoleccion.hora',
				'orden.direccionEntrega.direccion',
				'orden.direccionRecoleccion.hora',
				'orden.telefono',
				'orden.formaPago',
				'terminosCondiciones'], function(newV, oldV, scope){
					if(newV[0] && newV[1] && newV[2] && newV[3] && newV[4] && newV[5]){
						$scope.formIncompleto = false;
					}
				});
		}
	});

})
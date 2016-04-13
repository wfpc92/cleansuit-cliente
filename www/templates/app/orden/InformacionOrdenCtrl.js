
var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $ionicPopover, $ionicHistory, $log) {
	var self = this;

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
    	self.viewAfterEnter($scope, CarritoFactory, $log);
	});

};

InformacionOrdenCtrl.prototype.viewAfterEnter = function($scope, CarritoFactory, $log) {
	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = CarritoFactory.soloHayProductos();
	$log.debug("solo hay productos: "+ $scope.soloProductos)
	$scope.formIncompleto = true;

	if($scope.soloProductos){
		$scope.$watchGroup([
			'orden.direccionEntrega.direccion',
			'orden.telefono',
			'orden.formaPago',
			'orden.terminosCondiciones'], function(newV, oldV, scope){
				if(newV[0] && newV[1] && newV[2] && newV[3]){
					$scope.formIncompleto = false;
				}
				else {
					$scope.formIncompleto = true;	
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
			'orden.terminosCondiciones'], function(newV, oldV, scope){
				if(newV[0] && newV[1] && newV[2] && newV[3] && newV[4] && newV[5] && newV[6]){
					$scope.formIncompleto = false;
				}
				else {
					$scope.formIncompleto = true;	
				}
			});
	}
}


app.controller('InformacionOrdenCtrl', InformacionOrdenCtrl);
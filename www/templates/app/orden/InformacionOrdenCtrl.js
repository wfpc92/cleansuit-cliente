
app.controller('InformacionOrdenCtrl', function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $ionicPopover, $ionicHistory) {
	$scope.usuario = UsuarioFactory.getUsuario;
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;
	$scope.orden.telefono = $scope.usuario.telefono;


	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = CarritoFactory.soloHayProductos();
	console.log("solo hay productos: "+ $scope.soloProductos)
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

    $scope.$on('$ionicView.afterEnter', function(event) {
		$scope.comprobarFormulario = function() {
			//$scope.formInformacionOrden.myInput.$valid
			if($scope.terminosCondiciones == false) {
				return false;
			}
			if($scope.soloProductos) {
				if($scope.orden.direccionEntrega.direccion == '') {
					return false;
				}
			} else {
				if($scope.orden.direccionRecoleccion.direccion == '') {
					return false;
				}
				if($scope.orden.direccionRecoleccion.hora == '') {
					return false;
				}
				if($scope.orden.direccionEntrega.direccion == '') {
					return false;
				}
				if($scope.orden.direccionRecoleccion.hora == '') {
					return false;
				}
				if($scope.orden.telefono == '') {
					return false;
				}
				if($scope.orden.formaPago == '') {
					return false;
				}

				
			}
		}
	});

})
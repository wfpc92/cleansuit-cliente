
var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $ionicPopover, $ionicHistory, $log, $ionicModal) {
	var self = this;

	$scope.usuario = UsuarioFactory.getUsuario;
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;
	$scope.orden.telefono = $scope.usuario.telefono;

	$scope.formaPago = function(formaPago){
		$scope.orden.formaPago = formaPago;
		$scope.closePopover();
	};

	$scope.openPopover = function(tipo, $event) {
		self.construirPopover(tipo, $event, $scope, $ionicPopover);  	
    };
    
    $scope.closePopover = function() {
    	$scope.popover.hide();
    };

    $ionicModal.fromTemplateUrl('templates/app/orden/modal-mapa.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		$scope.modal.show();
	};
	
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
	
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

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
};

InformacionOrdenCtrl.prototype.construirPopover = function(tipo, $event, $scope, $ionicPopover) {
	var tmpURL = "";
	switch(tipo) {
		case "HORARECOLECCION":
			tmpURL = 'templates/app/orden/popover-hora.html';
			$scope.idPopover = "ppHoraRecoleccion";
			$scope.horas = [
				"6:00pm a 6:59pm",
				"7:00pm a 7:59pm",
				"8:00pm a 8:59pm",
				"9:00pm a 10:00pm"
			];

			$scope.setHora = function($index){
				$scope.orden.direccionRecoleccion.hora = $scope.horas[$index];
				$scope.closePopover();
			};
			break;
		case "HORAENTREGA":
			tmpURL = 'templates/app/orden/popover-hora.html';
			$scope.idPopover = "ppHoraEntrega";
			$scope.horas = [
				"6:00pm a 6:59pm",
				"7:00pm a 7:59pm",
				"8:00pm a 8:59pm",
				"9:00pm a 10:00pm"
			];

			$scope.setHora = function($index){
				$scope.orden.direccionEntrega.hora = $scope.horas[$index];
				$scope.closePopover();
			};
			break;
		case "FORMAPAGO":
			tmpURL = 'templates/app/orden/popover-forma-pago.html';
			$scope.idPopover = "ppFormaPago";
			break;
		default:
			return;
	}

	$ionicPopover.fromTemplateUrl(tmpURL, {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
		$scope.popover.show($event);
	});
}


app.controller('InformacionOrdenCtrl', InformacionOrdenCtrl);
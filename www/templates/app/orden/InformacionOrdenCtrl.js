
var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $state, $ionicPopover, $ionicHistory, $log, $ionicModal, $ionicPopup, RealizarOrdenFactory, $state) {
	var self = this;

	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;

	//aqui se configura la direccion por defecto para las ordenes, se debe programar la ultima direccion suministrada
	$scope.orden.direccionRecoleccion.direccion = $scope.usuario.direccion.residencia;
	$scope.orden.direccionEntrega.direccion = $scope.usuario.direccion.residencia;
	$scope.orden.telefono = $scope.usuario.telefono;

	$scope.formaPago = function(formaPago){
		$scope.orden.formaPago = formaPago;
		$scope.closePopover();
	};

	$scope.openModal = function(tipo) {
		var callback = function(){
			$scope.modal.show();
		};
		self.construirModalMapa(tipo, $scope, $ionicModal, callback);
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	$scope.openPopover = function(tipo, $event) {
		self.construirPopover(tipo, $event, $scope, $ionicPopover);  	
    };
    
    $scope.closePopover = function() {
    	$scope.popover.hide();
    };
	
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
		if(typeof $scope.modal != 'undefined') {
			$scope.modal.remove();
		}
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
    	self.viewAfterEnter($scope, CarritoFactory, $log);
	});

	//cancelar orden:
	$scope.cancelarOrden = function() {
		self.mostrarPopup($ionicPopup, {
	    	title: 'Cancelar Orden?',
	    	template: '¿Está seguro que desea cancelar esta orden?'
	    }, function(){
	    	self.cancelarOrden(CarritoFactory, $state, $ionicHistory); 
	    });
	};

	$scope.realizarOrden = function(){
		self.enviarOrden(function(){
			RealizarOrdenFactory.realizarOrden();
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache()
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			});
			$state.go("app.realizar-orden");
		});
	}
};

InformacionOrdenCtrl.prototype.viewAfterEnter = function($scope, CarritoFactory, $log) {
	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = CarritoFactory.soloHayProductos(CarritoFactory.items);
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
				"6:00 P.M. a 6:59 P.M.",
				"7:00 P.M. a 7:59 P.M.",
				"8:00 P.M. a 8:59 P.M.",
				"9:00 P.M. a 10:00 P.M."
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
				"6:00 P.M. a 6:59 P.M.",
				"7:00 P.M. a 7:59 P.M.",
				"8:00 P.M. a 8:59 P.M.",
				"9:00 P.M. a 10:00 P.M."
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
};

InformacionOrdenCtrl.prototype.construirModalMapa = function(tipo, $scope, $ionicModal, callback){
	var tmpURL = "templates/app/orden/modal-mapa.html";
	switch(tipo) {
		case "DIRECCIONRECOLECCION":
			$scope.titulo = "Ubique en el mapa la dirección de recolección. ";
			$scope.idModal = "mdDireccionRecoleccion";
			break;

		case "DIRECCIONENTREGA":
			$scope.titulo = "Ubique en el mapa la dirección de entrega. ";
			$scope.idModal = "mdDireccionEntrega";
			break;

		default:
			return;
	}

	$ionicModal.fromTemplateUrl(tmpURL, {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
		callback();
	});
};

InformacionOrdenCtrl.prototype.mostrarPopup = function($ionicPopup, optionsPopup, callback) {
	$ionicPopup
		.confirm(optionsPopup)
		.then(function(res) {
			if(res) {
				callback();
			}
		});
};

InformacionOrdenCtrl.prototype.cancelarOrden = function(CarritoFactory, $state, $ionicHistory) {
	CarritoFactory.cancelarOrden();
	CarritoFactory.actualizarContadores();
	$state.go("app.inicio");
	$ionicHistory.clearHistory();
	$ionicHistory.nextViewOptions({
		disableBack:'true'
	});
};

InformacionOrdenCtrl.prototype.enviarOrden = function(callback){
	callback();
};

app.controller('InformacionOrdenCtrl', InformacionOrdenCtrl);

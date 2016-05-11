
var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $state, $ionicPopover, $ionicHistory, $ionicModal, $ionicPopup, RealizarOrdenFactory, $ionicLoading, $rootScope, MapasFactory) {
	var self = this;

	self.$scope = $scope;
	self.CarritoFactory = CarritoFactory;
	self.$ionicModal = $ionicModal;
	self.$ionicPopover = $ionicPopover;
	self.$state = $state;
	self.$ionicHistory = $ionicHistory;
	self.MapasFactory = MapasFactory;

	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;

	//aqui se configura la direccion por defecto para las ordenes, se debe programar la ultima direccion suministrada
	$scope.orden.direccionRecoleccion.direccion = $scope.usuario.direccion.residencia;
	$scope.orden.direccionEntrega.direccion = $scope.usuario.direccion.residencia;
	$scope.orden.telefono = $scope.usuario.telefono;

	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	self.$scope.soloProductos = self.CarritoFactory.soloHayProductos(self.CarritoFactory.items);
	console.log("solo hay productos: "+ self.$scope.soloProductos);
	

	//se ejecuta al dar click en el icono de ubicacion de las direcciones, muestra ventana modal
	//con un mapa para ubicar un punto, basado en su ubicacion actual. 
	$scope.openModal = function(tipo) {
		self.abrirModal(tipo);
	};

	$scope.formaPago = function(formaPago){
		$scope.orden.formaPago = formaPago;
		$scope.closePopover();
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	$scope.openPopover = function(tipo, $event) {
		self.construirPopover(tipo, $event);  	
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
    	self.viewAfterEnter();
	});

	//cancelar orden:
	$scope.cancelarOrden = function() {
		self.mostrarPopup($ionicPopup, {
	    	title: 'Cancelar Orden?',
	    	template: '¿Está seguro que desea cancelar esta orden?'
	    }, function(){
	    	self.cancelarOrden(); 
	    });
	};

	$scope.realizarOrden = function() {
		self.enviarOrden(function(){
			RealizarOrdenFactory.realizarOrden();
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache()
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			});
			$state.go("app.realizar-orden");
		});
	};

	$scope.modalMapaRecoleccion = null;
	$scope.mapaRecoleccion= null;
	$scope.modalMapaEntrega = null;
	$scope.mapaEntrega = null;

	$scope.scopeRecoleccion = $rootScope.$new();
	$scope.scopeRecoleccion.titulo = "Ubique en el mapa el punto de recolección.";
	$scope.scopeRecoleccion.idModal = "mdDireccionRecoleccion";
	$scope.scopeRecoleccion.idMapa = "id-mapa-direccion-recoleccion";
	
	$scope.scopeRecoleccion.finalizaUbicacion = function() {
		var ubicacion = $scope.mapaRecoleccion.getPosicion();
		console.log("latitud: ", ubicacion.lat());
		console.log("longitud: ",ubicacion.lng());
		$scope.modalMapaRecoleccion.hide();
	};

	$scope.scopeEntrega = $rootScope.$new();
	$scope.scopeEntrega.titulo = "Ubique en el mapa el punto de entrega.";
	$scope.scopeEntrega.idModal = "mdDireccionEntrega";
	$scope.scopeEntrega.idMapa = "id-mapa-direccion-entrega";
	
	$scope.scopeEntrega.finalizaUbicacion = function() {
		var ubicacion = $scope.mapaEntrega.getPosicion();
		console.log("latitud: ", ubicacion.lat())
		console.log("longitud: ",ubicacion.lng())
		$scope.modalMapaEntrega.hide();
	};

	var tmpURL = "templates/app/orden/modal-mapa.html";

	$ionicModal.fromTemplateUrl(tmpURL, {
		scope: $scope.scopeEntrega,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalMapaEntrega = modal;
		$scope.modalMapaEntrega
		.show()
		.then(function() {
			console.log("Mostrando modal de mapa entrega")
			MapasFactory.crearMapa($scope.scopeEntrega.idMapa).then(
				function(mapa){
					console.log("ocultando modalMapaEntrega")
					$scope.modalMapaEntrega.hide();
					$scope.mapaEntrega = mapa;

					if(!$scope.soloProductos) {
						$ionicModal.fromTemplateUrl(tmpURL, {
							scope: $scope.scopeRecoleccion,
							animation: 'slide-in-up'
						}).then(function(modal) {
							$scope.modalMapaRecoleccion = modal;
							$scope.modalMapaRecoleccion
							.show()
							.then(function() {
								console.log("Mostrando modal de mapa recoleccion")
								MapasFactory.crearMapa($scope.scopeRecoleccion.idMapa).then(
									function(mapa){
										console.log("ocultando modalMapaRecoleccion")
										$scope.modalMapaRecoleccion.hide();
										$scope.mapaRecoleccion = mapa;
									}, 
									function(error){
										console.log(error)
									}
								).finally(function() {
									console.log("finally crear mapa")
								});
							});
						});
					}


				}, 
				function(error){
					console.log(error)
				}
			).finally(function() {
				console.log("finally crear mapa")
			});
		});
	});
};

InformacionOrdenCtrl.prototype.abrirModal = function(tipo) {
	var self = this;
	console.log("abriendo ventana modal para "+tipo+"...")
	switch(tipo) {
		case "DIRECCIONRECOLECCION":
			self.$scope.modalMapaRecoleccion.show();
			break;

		case "DIRECCIONENTREGA":
			$scope.modalMapaEntrega.show();
			break;

		default:
			return;
	}
};


InformacionOrdenCtrl.prototype.viewAfterEnter = function() {
	var self = this;
	self.$scope.formIncompleto = true;

	if(self.$scope.soloProductos){
		self.$scope.$watchGroup([
			'orden.direccionEntrega.direccion',
			'orden.telefono',
			'orden.formaPago',
			'orden.terminosCondiciones'], function(newV, oldV, scope){
				if(newV[0] && newV[1] && newV[2] && newV[3]){
					self.$scope.formIncompleto = false;
				}
				else {
					self.$scope.formIncompleto = true;	
				}
			});
	} else {
		self.$scope.$watchGroup([
			'orden.direccionRecoleccion.direccion',
			'orden.direccionRecoleccion.hora',
			'orden.direccionEntrega.direccion',
			'orden.direccionRecoleccion.hora',
			'orden.telefono',
			'orden.formaPago',
			'orden.terminosCondiciones'], function(newV, oldV, scope){
				if(newV[0] && newV[1] && newV[2] && newV[3] && newV[4] && newV[5] && newV[6]){
					self.$scope.formIncompleto = false;
				}
				else {
					self.$scope.formIncompleto = true;	
				}
			});
	}
};

InformacionOrdenCtrl.prototype.construirPopover = function(tipo, $event) {
	var self = this;
	var tmpURL = "";

	switch(tipo) {
		case "HORARECOLECCION":
			tmpURL = 'templates/app/orden/popover-hora.html';
			self.$scope.idPopover = "ppHoraRecoleccion";
			self.$scope.horas = [
				"6:00 P.M. a 6:59 P.M.",
				"7:00 P.M. a 7:59 P.M.",
				"8:00 P.M. a 8:59 P.M.",
				"9:00 P.M. a 10:00 P.M."
			];
			self.$scope.setHora = function($index){
				self.$scope.orden.direccionRecoleccion.hora = self.$scope.horas[$index];
				self.$scope.closePopover();
			};
			break;

		case "HORAENTREGA":
			tmpURL = 'templates/app/orden/popover-hora.html';
			self.$scope.idPopover = "ppHoraEntrega";
			self.$scope.horas = [
				"6:00 P.M. a 6:59 P.M.",
				"7:00 P.M. a 7:59 P.M.",
				"8:00 P.M. a 8:59 P.M.",
				"9:00 P.M. a 10:00 P.M."
			];
			self.$scope.setHora = function($index){
				self.$scope.orden.direccionEntrega.hora = self.$scope.horas[$index];
				self.$scope.closePopover();
			};
			break;

		case "FORMAPAGO":
			tmpURL = 'templates/app/orden/popover-forma-pago.html';
			self.$scope.idPopover = "ppFormaPago";
			break;

		default:
			return;
	}

	self.$ionicPopover.fromTemplateUrl(tmpURL, {
		scope: self.$scope,
	}).then(function(popover) {
		self.$scope.popover = popover;
		self.$scope.popover.show($event);
	});
};

InformacionOrdenCtrl.prototype.mostrarPopup = function(optionsPopup, callback) {
	var self = this;
	self.$ionicPopup
		.confirm(optionsPopup)
		.then(function(res) {
			if(res) {
				callback();
			}
		});
};

InformacionOrdenCtrl.prototype.cancelarOrden = function() {
	var self = this;
	self.CarritoFactory.cancelarOrden();
	self.CarritoFactory.actualizarContadores();
	self.$state.go("app.inicio");
	self.$ionicHistory.clearHistory();
	self.$ionicHistory.nextViewOptions({
		disableBack:'true'
	});
};

InformacionOrdenCtrl.prototype.enviarOrden = function(callback){
	callback();
};

app.controller('InformacionOrdenCtrl', InformacionOrdenCtrl);

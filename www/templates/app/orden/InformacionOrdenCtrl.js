
var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $state, $ionicPopover, $ionicHistory, $ionicModal, $ionicPopup, RealizarOrdenFactory, $ionicLoading, $rootScope) {
	var self = this;

	self.$scope = $scope;
	self.CarritoFactory = CarritoFactory;
	self.$ionicModal = $ionicModal;
	self.$ionicPopover = $ionicPopover;
	self.$state = $state;
	self.$ionicHistory = $ionicHistory;
	self.MapaFactory = MapaFactory;

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
		console.log("creando ventana modal para "+tipo+"...")
		switch(tipo) {
			case "DIRECCIONRECOLECCION":
				$scope.modalMapaRecoleccion.show();
				break;

			case "DIRECCIONENTREGA":
				$scope.modalMapaEntrega.show();
				break;

			default:
				return;
		}
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

	self.$scope.scopeRecoleccion = $rootScope.$new();
	self.$scope.scopeEntrega = $rootScope.$new();
	self.construirModalesMapa();
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

InformacionOrdenCtrl.prototype.construirModalesMapa = function(){
	var self = this,
		tmpURL = "templates/app/orden/modal-mapa.html";

	if(!self.$scope.soloProductos) {
		self.$scope.scopeRecoleccion.titulo = "Ubique en el mapa el punto de recolección.";
		self.$scope.scopeRecoleccion.idModal = "mdDireccionRecoleccion";
		self.$scope.scopeRecoleccion.idMapa = "id-mapa-direccion-recoleccion";
		
		self.$scope.scopeRecoleccion.finalizaUbicacion = function() {
			var ubicacion = self.$scope.mapaRecoleccion.getPosicion();
			console.log("latitud: ", ubicacion.lat())
			console.log("longitud: ",ubicacion.lng())
			self.$scope.modalMapaRecoleccion.hide();
		};

		self.$ionicModal.fromTemplateUrl(tmpURL, {
			scope: self.$scope.scopeRecoleccion,
			animation: 'slide-in-up'
		}).then(function(modal) {
			self.$scope.modalMapaRecoleccion = modal;
			console.log(self.CarritoFactory);
			console.log(self.MapaFactory)

			self.$scope.mapaRecoleccion = self.MapaFactory.crearMapa(self.$scope.scopeRecoleccion.idMapa);
		});
	}

	self.$scope.scopeEntrega.titulo = "Ubique en el mapa el punto de entrega.";
	self.$scope.scopeEntrega.idModal = "mdDireccionEntrega";
	self.$scope.scopeEntrega.idMapa = "id-mapa-direccion-entrega";
	
	self.$scope.scopeEntrega.finalizaUbicacion = function() {
		var ubicacion = self.$scope.mapaEntrega.getPosicion();
		console.log("latitud: ", ubicacion.lat())
		console.log("longitud: ",ubicacion.lng())
		self.$scope.modalMapaEntrega.hide();
	};

	self.$ionicModal.fromTemplateUrl(tmpURL, {
		scope: self.$scope.scopeEntrega,
		animation: 'slide-in-up'
	}).then(function(modal) {
		self.$scope.modalMapaEntrega = modal;
		self.$scope.mapaEntrega = self.MapaFactory.crearMapa(self.$scope.scopeEntrega.idMapa);
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

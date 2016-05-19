
var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $state, $ionicPopover, $ionicHistory, $ionicModal, $ionicPopup, RealizarOrdenFactory, $ionicLoading, $rootScope, MapasFactory, ModalCargaFactory) {
	var self = this;
 
	this.$scope = $scope;
	this.CarritoFactory = CarritoFactory;
	this.$ionicModal = $ionicModal;
	this.$ionicPopover = $ionicPopover;
	this.$state = $state;
	this.$ionicHistory = $ionicHistory;
	this.$rootScope = $rootScope;
	this.MapasFactory = MapasFactory;
	this.ModalCargaFactory = ModalCargaFactory;

	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.orden = OrdenFactory.orden;

	//aqui se configura la direccion por defecto para las ordenes, se debe programar la ultima direccion suministrada
	$scope.orden.direccionRecoleccion.direccion = $scope.usuario.direccion.residencia;
	$scope.orden.direccionEntrega.direccion = $scope.usuario.direccion.residencia;
	$scope.orden.telefono = $scope.usuario.telefono;

	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = CarritoFactory.soloHayProductos(CarritoFactory.items);
	console.log("solo hay productos: "+ $scope.soloProductos);

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

	$scope.modalMapa = null;
	$scope.mapa = null;
	$scope.scopeModal = $rootScope.$new();
	$scope.scopeModal.idModal = "id-modal-mapa";
	
	$scope.scopeModal.finalizaUbicacion = function(tipo) {
		var posicion = $scope.mapa.getPosicion();
		console.log("finaliza ubicacion: ", posicion.lat(), posicion.lng() );
		
		switch(tipo) {
			case "DIRECCIONRECOLECCION":
				$scope.orden.direccionRecoleccion.posicion = posicion;
				break;

			case "DIRECCIONENTREGA":
				$scope.orden.direccionEntrega.posicion = posicion;
				break;
		}
		
		//console.log("Posicion al finalizar ubicacion: ", posicion.lat(), ", ", posicion.lng());
		$scope.modalMapa.hide();
	};

	$ionicModal.fromTemplateUrl("templates/app/orden/modal-mapa.html", {
		scope: $scope.scopeModal,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalMapa = modal;
		MapasFactory.getMapa().then(function(mapa) {
			$scope.mapa = mapa;
			console.log("mapa obtenido: ", $scope.mapa)
			$scope.modalMapa
					.modalEl //ion-modal
					.children[1] //ion-content
					.children[0] //scroll
					.children[0] //#contenedor-mapa
					.appendChild($scope.mapa.mapaDOM);
		});
	});
};


/**
 * este se ejecuta al dar click sobre los pines de ubicacion,
 * se ubica la posicion almacenada previamente en el mapa,
 * se muestra la ventana modal con el mapa configurado en su sitio.
 */
InformacionOrdenCtrl.prototype.abrirModal = function(tipo) {
	var self = this,
		$scope = self.$scope,
		MapasFactory = self.MapasFactory,
		ModalCargaFactory = self.ModalCargaFactory,
		posicion = null;

	console.log("abriendo ventana modal para "+tipo+"...")
	
	switch(tipo) {
		case "DIRECCIONRECOLECCION":
			//ubicar la posicion en el mapa almacenada
			if($scope.orden.direccionRecoleccion.posicion) {
				posicion = $scope.orden.direccionRecoleccion.posicion;
				console.log("DIRECCIONRECOLECCION: ", posicion.lat(), posicion.lng());
			} else {
				console.log("DIRECCIONRECOLECCION: null");
			}

			//mostrar la ventana modal con el mapa configurado en la posicion almacenada.
			$scope.scopeModal.titulo = "Ubique en el mapa el punto de recolección.";
			$scope.scopeModal.tipo = tipo;
			break;

		case "DIRECCIONENTREGA":
			//ubicar la posicion en el mapa almacenada
			if($scope.orden.direccionEntrega.posicion) {
				posicion = $scope.orden.direccionEntrega.posicion;
				console.log("DIRECCIONENTREGA: ", posicion.lat(), posicion.lng())
			} else {
				console.log("DIRECCIONENTREGA: null");
			}

			//mostrar la ventana modal con el mapa configurado en la posicion almacenada.
			$scope.scopeModal.titulo = "Ubique en el mapa el punto de entrega.";
			$scope.scopeModal.tipo = tipo;
			break;
	}

	if(!$scope.mapa) {
		console.log("no existe el mapa...");
		//mostrar ventana de error 
		return;
	}

	if(posicion) {
		$scope.mapa.setPosicion(posicion);
	}

	if(!$scope.mapa.verificarUbicacionGPS()) {
		ModalCargaFactory.mostrar(null, "Buscando posicion actual...", null)
		$scope.modalMapa.show().then(function() {
				$scope.mapa.obtenerUbicacionGPS(function() {
					console.log("ubicacion obtenida GPS: ", $scope.mapa.getPosicion().lat(), $scope.mapa.getPosicion().lng());
					ModalCargaFactory.ocultar();
				}); 
		});	
	} else {
		$scope.modalMapa.show();
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
	var self = this,
		$scope = this.$scope, 
		$ionicPopover = this.$ionicPopover,
		tmpURL = "";

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

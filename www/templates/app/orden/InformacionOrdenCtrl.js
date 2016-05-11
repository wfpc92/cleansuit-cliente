
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

	$scope.mapaDOMCargado = false;
	$scope.modalMapa = null;
	$scope.mapa = null;
	$scope.scopeModal = $rootScope.$new();
	$scope.scopeModal.idModal = "id-modal-mapa";
	$scope.scopeModal.idMapa = "id-mapa";
	
	$scope.scopeModal.finalizaUbicacion = function() {
		$scope.posicion = $scope.mapa.getPosicion();
		console.log("latitud: ", $scope.posicion.lat());
		console.log("longitud: ", $scope.posicion.lng());
		$scope.mapa.quitarEventos();
		$scope.modalMapa.hide();
	};

	self.crearMapaDOM();

};

/**
 * Construye el DOM para un mapa generado por API google maps, 
 * luego de que se termina de generar se crea la ventana modal 
 * que lo va a contener. 
 */
InformacionOrdenCtrl.prototype.crearMapaDOM = function() {
	var self = this, 
		$scope = this.$scope,
		MapasFactory = this.MapasFactory,
		ModalCargaFactory = this.ModalCargaFactory;


	console.log("Crear mapa para ventana modal");
	ModalCargaFactory.mostrar(null, "Creando Mapa...", null);

	MapasFactory.crearMapa($scope.scopeModal.idMapa).then(
		function(mapa){
			console.log("Mapa DOM creado");
			$scope.mapa = mapa;
			self.crearVentanaModalMapa();
		}, 
		function(error){
			console.log(error);
			//mostrar mensaje de error <--error.show()-->
			ModalCargaFactory.ocultar();
		}
	).finally(function() {
		console.log("finally crear mapa")
	});
};

/**
 * Contruye una ventana modal, muestra su DOM porque el contenedor debe
 * estar activo mediante show() para poder agregar el mapaDOM al contenedor.
 */
InformacionOrdenCtrl.prototype.crearVentanaModalMapa = function() {
	var self = this, 
		$scope = this.$scope,
		$ionicModal = this.$ionicModal,
		ModalCargaFactory = this.ModalCargaFactory,
		tmpURL = "templates/app/orden/modal-mapa.html";

	$ionicModal.fromTemplateUrl(tmpURL, {
		scope: $scope.scopeModal,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modalMapa = modal;

		//ocultar ventana modal mientras se agrega mapaDOM.
		//var elemModal = document.getElementById($scope.scopeModal.idModal);
		//elemModal.style.display = "none";
		
		$scope.modalMapa.show().then(function() {
			self.asignarMapaDOM(function() {
				$scope.modalMapa.hide().then(function() {
					ModalCargaFactory.ocultar();
				})
			});
		});		
	});	
};

InformacionOrdenCtrl.prototype.asignarMapaDOM = function(callback) {
	var $scope = this.$scope;
	if(!$scope.mapaDOMCargado) {
		console.log("mapaDOM no esta en el contenedor-mapa, agregando...")
		var elemContenedorMapa = document.getElementById("contenedor-mapa");
		elemContenedorMapa.appendChild($scope.mapa.mapaDOM);
		$scope.mapaDOMCargado = true;
	}
	callback();
};


InformacionOrdenCtrl.prototype.abrirModal = function(tipo) {
	var self = this,
		$scope = self.$scope;

	console.log("abriendo ventana modal para "+tipo+"...")
	
	switch(tipo) {
		case "DIRECCIONRECOLECCION":
			$scope.scopeModal.titulo = "Ubique en el mapa el punto de recolección.";
			//$scope.posicion = $scope.finalizaUbicacion($scope.orden.direccionRecoleccion);
			$scope.modalMapa.show().then(function() {
				if($scope.orden.direccionRecoleccion.posicion) {
					$scope.mapa.setPosicion($scope.orden.direccionRecoleccion.posicion);
				}
				$scope.mapa.asignarEventos();
			});
			break;

		case "DIRECCIONENTREGA":
			$scope.scopeModal.titulo = "Ubique en el mapa el punto de entrega.";
			//$scope.scopeModal.finalizaUbicacion = $scope.finalizaUbicacion($scope.orden.direccionEntrega);
			$scope.modalMapa.show().then(function() {
				if($scope.orden.direccionEntrega.posicion) {
					$scope.mapa.setPosicion($scope.orden.direccionEntrega.posicion);
				}
				$scope.mapa.asignarEventos();
			});
			break;

		default:
			console.log("no existe el tipo de ventana modal pedido.")
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


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
	
	$scope.scopeModal.finalizaUbicacion = function(tipo) {
		var posicion = $scope.mapa.getPosicion();
		
		switch(tipo) {
			case "DIRECCIONRECOLECCION":
				$scope.orden.direccionRecoleccion.posicion = posicion;
				break;

			case "DIRECCIONENTREGA":
				$scope.orden.direccionEntrega.posicion = posicion;
				break;
		}
		
		console.log("Posicion: ", posicion.lat(), ", ", posicion.lng());
		$scope.mapa.quitarEventos();
		$scope.modalMapa.hide();
	};

	self.verificarMapaDOM(function() {
		self.crearVentanaModalMapa();
	});
};

/**
 * Construye el DOM para un mapa generado por API google maps, 
 * luego de que se termina de generar se crea la ventana modal 
 * que lo va a contener. 
 *
InformacionOrdenCtrl.prototype.crearMapaDOM = function() {
	var self = this, 
		$scope = this.$scope,
		MapasFactory = this.MapasFactory,
		ModalCargaFactory = this.ModalCargaFactory;


	console.log("Crear mapa para ventana modal");
	ModalCargaFactory.mostrar(null, "Creando Mapa...", null);

	MapasFactory.crearMapa().then(
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
};*/

/**
 * verifica si la fabrica ya cargo el mapaDOM
 */
InformacionOrdenCtrl.prototype.verificarMapaDOM = function(callback) {
	var $scope = this.$scope,
		MapasFactory = this.MapasFactory,
		ModalCargaFactory = this.ModalCargaFactory;

	
	//si el mapa no ha sido creado, se debe crear.
	if(!MapasFactory.mapaCreado()) {
		ModalCargaFactory.mostrar(null, "Cargando mapa...", null);
		
		MapasFactory.crearMapa().then(
			function(mapa){
				console.log("Mapa DOM creado");
				$scope.mapa = mapa;
				callback();
			}, 
			function(error){
				console.log(error);
				//mostrar mensaje de error <--error.show()-->
				ModalCargaFactory.ocultar();
			}
		);
	}
};

/**
 * Contruye una ventana modal, muestra su DOM porque el contenedor debe
 * estar activo mediante show() para poder agregar el mapaDOM al contenedor.
 */
InformacionOrdenCtrl.prototype.crearVentanaModalMapa = function(callback) {
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
		
		//mostrar la ventana modal, inmediatamente despues asignar mapaDOM
		$scope.modalMapa.show().then(function() {
			self.asignarMapaDOM(function() {
				$scope.modalMapa.hide().then(function() {
					ModalCargaFactory.ocultar();
				})
			});
		});		
	});
}	

/**
 * si no se ha cargado el mapaDOM agregarlo al contenedor.
 */
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

/**
 * este se ejecuta al dar click sobre los pines de ubicacion,
 * se ubica la posicion almacenada previamente en el mapa,
 * se asignan los eventos,
 * se muestra la ventana modal con el mapa configurado en su sitio.
 */
InformacionOrdenCtrl.prototype.abrirModal = function(tipo) {
	var self = this,
		$scope = self.$scope;

	console.log("abriendo ventana modal para "+tipo+"...")
	
	switch(tipo) {
		case "DIRECCIONRECOLECCION":
			//ubicar la posicion en el mapa almacenada
			if($scope.orden.direccionRecoleccion.posicion) {
				$scope.mapa.setPosicion($scope.orden.direccionRecoleccion.posicion);
			}

			//asignar eventos al mapa para poder utilizarlos.
			$scope.mapa.asignarEventos();
			//mostrar la ventana modal con el mapa configurado en la posicion almacenada.
			$scope.scopeModal.titulo = "Ubique en el mapa el punto de recolección.";
			$scope.scopeModal.tipo = tipo;
			$scope.modalMapa.show();
			break;

		case "DIRECCIONENTREGA":
			//ubicar la posicion en el mapa almacenada
			if($scope.orden.direccionEntrega.posicion) {
				$scope.mapa.setPosicion($scope.orden.direccionEntrega.posicion);
			}

			//asignar eventos al mapa para poder utilizarlos.
			$scope.mapa.asignarEventos();
			//mostrar la ventana modal con el mapa configurado en la posicion almacenada.
			$scope.scopeModal.titulo = "Ubique en el mapa el punto de entrega.";
			$scope.scopeModal.tipo = tipo;
			$scope.modalMapa.show();
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

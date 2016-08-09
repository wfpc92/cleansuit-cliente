
var InformacionOrdenCtrl = function($scope, 
									OrdenesFactory, 
									$state, 
									$ionicPopover, 
									$ionicHistory, 
									$ionicModal, 
									$ionicPopup,   
									$rootScope, 
									MapasFactory, 
									ModalCargaFactory,
									PromocionesFactory) {
	
	console.log("InformacionOrdenCtrl");
	var self = this;

	this.$scope = $scope;
	this.$ionicModal = $ionicModal;
	this.$ionicPopup = $ionicPopup;	
	this.$ionicPopover = $ionicPopover;
	this.$state = $state;
	this.$ionicHistory = $ionicHistory;
	this.$rootScope = $rootScope;
	this.MapasFactory = MapasFactory;
	this.ModalCargaFactory = ModalCargaFactory;

	$scope.orden = OrdenesFactory.getOrden();

	//aqui se configura la direccion por defecto para las ordenes, se debe programar la ultima direccion suministrada
	$scope.orden.recoleccion.direccion = $scope.usuario.direccion;
	$scope.orden.entrega.direccion = $scope.usuario.direccion;
	$scope.orden.telefono = $scope.usuario.telefono;

	//FLAGS:
	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	$scope.soloProductos = $scope.carrito.soloHayProductos();
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

    $scope.validarCupon = function() {
    	//mostrar venana emergente, si es verdadero, su coponha sido redimido.
    	//falso: este cupon es incorrecto  o ha expirado.
    	ModalCargaFactory.mostrar("Validando cupón de descuento...", null);
    	PromocionesFactory
    	.validar($scope.orden.cupon)
    	.then(function(respuesta) {
    		if(respuesta) {
    			tmp = respuesta.mensaje;
    			$scope.carrito.aplicarPromocion(respuesta.promocion);
    		} else {
    			tmp = "No se pudo validar el cupón. Intenta de nuevo.";
    		}
    	})
    	.finally(function() {
    		ModalCargaFactory.ocultar();
    		$ionicPopup
			.alert({
		    	title: 'Cupón de descuento',
		    	template: tmp
	    	});	
    	});
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
	$scope.confirmarCancelarOrden = function() {
		$ionicPopup
		.confirm({
	    	title: 'Cancelar Orden',
	    	template: '¿Está seguro que desea cancelar esta orden?'
    	})
		.then(function(res) {
			if(res) {
				self.cancelarOrden();
			}
		});
	};

	$scope.realizarOrden = function() {
		console.log("InformacionOrdenCtrl: realizarOrden(): ");
		OrdenesFactory
		.enviarOrden()
		.then(function() {
			console.log("exito")
			$ionicHistory.clearHistory();
			$ionicHistory.clearCache()
			$ionicHistory.nextViewOptions({
				disableBack:'true'
			}); 
			$state.go("app.realizar-orden");
		}, function(err) {
			console.log(err)
		})
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
				$scope.orden.recoleccion.posicion = posicion;
				break;

			case "DIRECCIONENTREGA":
				$scope.orden.entrega.posicion = posicion;
				break;
		}

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
			if($scope.orden.recoleccion.posicion) {
				posicion = $scope.orden.recoleccion.posicion;
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
			if($scope.orden.entrega.posicion) {
				posicion = $scope.orden.entrega.posicion;
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
		ModalCargaFactory.mostrar("Buscando posicion actual...", null);
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
	self.$scope.formIncompleto = false;

	if(self.$scope.soloProductos) { 
		self.$scope.$watchGroup([
			'orden.entrega.direccion',
			'orden.entrega.fecha',
			'orden.entrega.hora',
			'orden.telefono',
			'orden.formaPago',
			'orden.terminosCondiciones'], function(newV, oldV, scope){
				console.log("productos", JSON.stringify(newV))
				if(newV[0] && newV[1] && newV[2] 
					&& newV[3] && newV[4] && newV[5]){
					self.$scope.formIncompleto = false;
				}
				else {
					self.$scope.formIncompleto = true;	
				}
			});
	} else {
		self.$scope.$watchGroup([ 
			'orden.recoleccion.direccion',
			'orden.recoleccion.fecha',
			'orden.recoleccion.hora',
			'orden.entrega.direccion',
			'orden.entrega.fecha',
			'orden.entrega.hora',
			'orden.telefono',
			'orden.formaPago',
			'orden.terminosCondiciones'], function(newV, oldV, scope){
				console.log("servicios", JSON.stringify(newV))
				if(newV[0] && newV[1] && newV[2] 
					&& newV[3] && newV[4] && newV[5] 
					&& newV[6] && newV[7] && newV[8] ){
					self.$scope.formIncompleto = false;
				}
				else {
					self.$scope.formIncompleto = true;	
				}
			});
	}
};


InformacionOrdenCtrl.prototype.horasDisponibles = function(fecha) {
	var self = this,
		$scope = this.$scope, 
		ahora = new Date(),
		result = [],
		inicio = 10, //index de horasDelDia de la hora de inicio
		fin = 22, //index de horasDelDia de la hora final
		horasDelDia = [
			"12:00 A.M. a 12:59 A.M.",
			"1:00 A.M. a 1:59 A.M.",
			"2:00 A.M. a 2:59 A.M.",
			"3:00 A.M. a 3:59 A.M.",
			"4:00 A.M. a 4:59 A.M.",
			"5:00 A.M. a 5:59 A.M.",
			"6:00 A.M. a 6:59 A.M.",
			"7:00 A.M. a 7:59 A.M.",
			"8:00 A.M. a 8:59 A.M.",
			"9:00 A.M. a 9:59 A.M.",
			"10:00 A.M. a 10:59 A.M.",
			"11:00 A.M. a 11:59 A.M.",
			"12:00 P.M. a 12:59 P.M.",
			"1:00 P.M. a 1:59 P.M.",
			"2:00 P.M. a 2:59 P.M.",
			"3:00 P.M. a 3:59 P.M.",
			"4:00 P.M. a 4:59 P.M.",
			"5:00 P.M. a 5:59 P.M.",
			"6:00 P.M. a 6:59 P.M.",
			"7:00 P.M. a 7:59 P.M.",
			"8:00 P.M. a 8:59 P.M.",
			"9:00 P.M. a 9:59 P.M.",
			"10:00 P.M. a 10:59 P.M.",
			"11:00 P.M. a 11:59 P.M.",
		];

	//si la fecha es hoy se debe comprobar las horas 
	if(fecha <= ahora) {
		console.log("es hoy");
		var inicio = ahora.getHours() + 1;
		result = horasDelDia.slice(inicio, fin);
	} else {
		result = horasDelDia.slice(inicio, fin);
	}
	return result;
};

InformacionOrdenCtrl.prototype.construirPopover = function(tipo, $event) {
	var self = this,
		$scope = this.$scope, 
		$ionicPopover = this.$ionicPopover,
		tmpURL = null;

	switch(tipo) {
		case "FECHARECOLECCION":
			var ahora = new Date(),
				minDate = new Date($scope.orden.recoleccion.fecha);

			//datePicker, fuente:https://www.npmjs.com/package/cordova-okaybmd-date-picker-plugin
			datePicker.show({
				date: $scope.orden.recoleccion.fecha,
				mode: 'date',
				minDate: minDate.getTime(),
				clearButton: true,
				windowTitle: '',
				doneButtonLabel: "Establecer",
				cancelButtonLabel: "Cancelar",
				clearButtonLabel: "Eliminar",
			}, function(fecha){
				console.log("FECHARECOLECCION", fecha);
				if(fecha !== 'CANCEL') {
					$scope.orden.recoleccion.fecha = fecha;
					$scope.$digest();
				}
			}, function(error) {
				console.log("datepicker, error", JSON.stringify(error))
				//en caso que no funcione la aplicacion con el plkgin se envia una señal
				//para que se active la seleccion de la fecha por defecto.
				document.getElementById("inputFechaRecoleccion").readOnly = false;
			});
			break;

		case "FECHAENTREGA":
			//datePicker, fuente:https://www.npmjs.com/package/cordova-okaybmd-date-picker-plugin
			datePicker.show({
				date: $scope.orden.entrega.fecha,
				mode: 'date',
				minDate: $scope.orden.recoleccion.fecha.getTime(),
				clearButton: true,
				windowTitle: '',
				doneButtonLabel: "Establecer",
				cancelButtonLabel: "Cancelar",
				clearButtonLabel: "Eliminar",
			}, function(fecha){
				console.log("construirPopover.FECHAENTREGA: ", $scope.orden.entrega.fecha, fecha);
				if(fecha !== 'CANCEL') {
					$scope.orden.entrega.fecha = fecha;
					$scope.$digest();
				}
			}, function(error) {
				console.log("datepicker, error", JSON.stringify(error))
				//en caso que no funcione la aplicacion con el plkgin se envia una señal
				//para que se active la seleccion de la fecha por defecto.
				document.getElementById("inputFechaEntrega").readOnly = false;
			});
			break;

		case "HORARECOLECCION":
			tmpURL = 'templates/app/orden/popover-hora.html';
			$scope.idPopover = "ppHoraRecoleccion";
			//seleccionar las horas validas segun la fecha que seleccione.
			$scope.horas = this.horasDisponibles($scope.orden.recoleccion.fecha);
			
			$scope.setHora = function($index){
				$scope.orden.recoleccion.hora = $scope.horas[$index];
				$scope.closePopover();
			};
			break;
		case "HORAENTREGA":
			tmpURL = 'templates/app/orden/popover-hora.html';
			$scope.idPopover = "ppHoraEntrega";
			//seleccionar las horas validas segun la fecha que seleccione.
			$scope.horas = this.horasDisponibles($scope.orden.entrega.fecha);

			$scope.setHora = function($index){
				$scope.orden.entrega.hora = $scope.horas[$index];
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

	if(tmpURL){
		$ionicPopover.fromTemplateUrl(tmpURL, {
			scope: $scope,
		}).then(function(popover) {
			$scope.popover = popover;
			$scope.popover.show($event);
		});
	}
};


InformacionOrdenCtrl.prototype.cancelarOrden = function() {
	var self = this;
	self.$scope.carrito.vaciar();
	self.$scope.carrito.actualizarContadores();
	self.$state.go("app.inicio");
	self.$ionicHistory.clearHistory();
	self.$ionicHistory.nextViewOptions({
		disableBack:'true'
	});
};

app.controller('InformacionOrdenCtrl', InformacionOrdenCtrl);


var InformacionOrdenCtrl = function($scope, UsuarioFactory, OrdenFactory, CarritoFactory, $state, $ionicPopover, $ionicHistory, $ionicModal, $ionicPopup, RealizarOrdenFactory, $cordovaGeolocation, angularLoad, $ionicLoading) {
	var self = this;

	self.$scope = $scope;
	self.CarritoFactory = CarritoFactory;
	self.$ionicModal = $ionicModal;
	self.$ionicPopover = $ionicPopover;
	self.$state = $state;
	self.$ionicHistory = $ionicHistory;
	self.$cordovaGeolocation = $cordovaGeolocation;
	self.angularLoad = angularLoad;
	self.$ionicLoading = $ionicLoading;

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
		var callback = function() {
			$scope.modal.show();
		};
		self.construirModalMapa(tipo, callback);
	};

	$scope.closeModal = function() {
		$scope.modal.hide();
	};

	$scope.finalizaUbicacion = function() {
		var ubicacion = $scope.marker.getPosition();
		console.log("latitud: ", ubicacion.lat())
		console.log("longitud: ",ubicacion.lng())
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
};

InformacionOrdenCtrl.prototype.viewAfterEnter = function() {
	var self = this;
	//si solo hay productos en el carrito de compra solo se debe mostrar la direccion de entrega
	self.$scope.soloProductos = self.CarritoFactory.soloHayProductos(self.CarritoFactory.items);
	console.log("solo hay productos: "+ self.$scope.soloProductos);
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

InformacionOrdenCtrl.prototype.construirModalMapa = function(tipo, callback){
	var self = this;
	var tmpURL = "templates/app/orden/modal-mapa.html";
	switch(tipo) {
		case "DIRECCIONRECOLECCION":
			self.$scope.titulo = "Ubique en el mapa la dirección de recolección. ";
			self.$scope.idModal = "mdDireccionRecoleccion";
			break;

		case "DIRECCIONENTREGA":
			self.$scope.titulo = "Ubique en el mapa la dirección de entrega. ";
			self.$scope.idModal = "mdDireccionEntrega";
			break;

		default:
			return;
	}

	self.angularLoad.loadScript('https://maps.googleapis.com/maps/api/js').then(function () {
		//comprobarCarga(null, "Google Maps API");
		self.configurarMapa();
	}).catch(function () {
		//comprobarCarga("Error al cargar el archivo externo.", "Google Maps API");
	});

	
	self.$ionicModal.fromTemplateUrl(tmpURL, {
		scope: self.$scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		self.$scope.modal = modal;
		callback();
	});
};

InformacionOrdenCtrl.prototype.configurarMapa = function() {
	var self = this;
	var options = {timeout: 10000, enableHighAccuracy: true};
	console.log("detectando posicion actual...");
	self.$ionicLoading.show({
		template: "Cargando Mapa..."
	});
	self.$cordovaGeolocation.getCurrentPosition(options).then(function(position){
		self.$ionicLoading.hide();

		console.log("se detecto la posicion getCurrentPosition: "+position)

		var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		var mapOptions = {
		  center: latLng,
		  zoom: 18,
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		console.log(document.getElementById("map"))
		self.$scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

		var imageNormal = {
			url: 'img/marker.png',
			// This marker is 20 pixels wide by 32 pixels high.
			size: new google.maps.Size(30, 44)
		};

		var imageWrong = {
			url: 'img/marker-rojo.png',
			// This marker is 20 pixels wide by 32 pixels high.
			size: new google.maps.Size(30, 44)
		};

		self.$scope.marker = new google.maps.Marker({
        	position: latLng,
        	icon: imageNormal,
        	map: self.$scope.map,
        	draggable: true,
        	label: 'perra',
        	title: 'Mi direccion de residencia'
        });

		var contentString = '<div>'+
			'<h1>No tenemos cobertura para este sitio</h1>'+
			'<p><b>Cleansuit</b>, no tiene cobertura de domicilio para esta ubicacion'
			'</p>'+
			'</div>';

        var infowindow = new google.maps.InfoWindow({
	    	content: contentString
	  	});

        /*var foundLocation = function(city, state, country, lat, lon){
	        //do stuff with your location! any of the first 3 args may be null
	        console.log(arguments);
	    }

	    var findResult = function(results, name){
	    	var result = results.find(function(element, index, array){
                return element.types[0] == name && element.types[1] == "political";
            })
            return result ? result.short_name : null;
        };

        //geocode es una funcion que retorna el results el nombre de la ubicacion.	
        google.maps.event.addListener(self.$scope.marker, 'dragend', function() {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
			    latLng: self.$scope.marker.getPosition()
			}, 
			function(results, status) {
				console.log(results)
				console.log(status)
					
				if (status == google.maps.GeocoderStatus.OK && results.length) {
					results = results[0].address_components;
	                var city = findResult(results, "locality");
	                var state = findResult(results, "administrative_area_level_1");
	                var country = findResult(results, "country");
	                foundLocation(city, state, country, self.$scope.marker.getPosition().lat(), self.$scope.marker.getPosition().lng());
				}
				else {
					foundLocation(null, null, null, r.coords.latitude, r.coords.longitude);
				}
			});
		});*/

		// Construct the polygon.
		var areaPermitida = new google.maps.Polygon({
			paths: [
      			new google.maps.LatLng(2.4579925872334303, -76.59548145463106),
      			new google.maps.LatLng(2.4569367687815498, -76.59446757962343),
      			new google.maps.LatLng(2.4568778144271235, -76.59610909154054)
    		],
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35
		});

		areaPermitida.setMap(self.$scope.map);

		//saber si esta dentro de un area
		google.maps.event.addListener(self.$scope.marker, 'dragend', function(e) {
			var resultColor = google.maps.geometry.poly.containsLocation(e.latLng, areaPermitida) ? 'red' : 'green';
			if(resultColor == 'red'){
				self.$scope.marker.setIcon(imageNormal);
				console.log("si esta dentor del area")
			}
			else{
				self.$scope.marker.setIcon(imageWrong);
				infowindow.open(self.$scope.map, self.$scope.marker);
				console.log("no esta dentro del area")
			}
		});

		google.maps.event.addListener(self.$scope.marker, 'dragstart', function(e) {
			infowindow.close();
		});


	}, function(error){
		console.log("Could not get location");
	});

}

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

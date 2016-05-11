var MapasFactory = function($q, $cordovaGeolocation, ModalCargaFactory, CargaInicialFactory) {
	var deferred = null;
	return {
		crearMapa: function(idMapa) {
			var self = this;
			deferred = $q.defer();

			if(!CargaInicialFactory.recursos.mapsScript) {
				CargaInicialFactory.cargarMapsScript(
					function() {
						self.crearMapaAPIGoogle(idMapa)
					}, function() {
						deferred.reject(null);
					}
				);
			} else {
				self.crearMapaAPIGoogle(idMapa);
			}

			return deferred.promise;
		},
		crearMapaAPIGoogle: function(idMapa) {
			var mapa = null,
				marker = null,
				infoWindow = null, 
				areasPoligonos = [
					[
			  			new google.maps.LatLng(2.4579925872334303, -76.59548145463106),
			  			new google.maps.LatLng(2.4569367687815498, -76.59446757962343),
			  			new google.maps.LatLng(2.4568778144271235, -76.59610909154054)
					],
					[
						new google.maps.LatLng(2.4591360832564315, -76.5965884923935),
			  			new google.maps.LatLng(2.458760919756627, -76.59667432308197),
			  			new google.maps.LatLng(2.458439350958533, -76.59652948379517),
			  			new google.maps.LatLng(2.458439350958533, -76.59623444080353),
			  			new google.maps.LatLng(2.458589416407283, -76.59584820270538),
			  			new google.maps.LatLng(2.4588841877753445, -76.59576773643494),
			  			new google.maps.LatLng(2.4590771289991644, -76.59602522850037),
			  			new google.maps.LatLng(2.459221834898719, -76.59621834754944),
					],
					[
						new google.maps.LatLng(2.4588788282965033, -76.59394383430481),
						new google.maps.LatLng(2.459173599600623, -76.59431397914886),
						new google.maps.LatLng(2.458969939433815, -76.59485578536987),
						new google.maps.LatLng(2.458487586283193, -76.59450709819794),
						new google.maps.LatLng(2.4585036647243474, -76.59403502941132) 
					],
					[
						new google.maps.LatLng(2.4562794785238347, -76.59623980522156),
						new google.maps.LatLng(2.455336208076778, -76.59637928009033),
						new google.maps.LatLng(2.455234377704592, -76.59578382968903),
						new google.maps.LatLng(2.4559686281091677, -76.59515619277954),
						new google.maps.LatLng(2.456247321587736, -76.59528493881226),
						new google.maps.LatLng(2.4563491518827103, -76.59564435482025),
						new google.maps.LatLng(2.4566224857939796, -76.59604668617249),
						new google.maps.LatLng(2.45657425040193, -76.59651339054108) 
					],
					[
						new google.maps.LatLng(2.4563973872828764, -76.59442126750946),
						new google.maps.LatLng(2.456113334345683, -76.59425497055054),
						new google.maps.LatLng(2.4564402631926754, -76.59404039382935),
						new google.maps.LatLng(2.4559900660711214, -76.59386873245239),
						new google.maps.LatLng(2.455561306766679, -76.59388482570648),
						new google.maps.LatLng(2.455352286555883, -76.59442663192749),
						new google.maps.LatLng(2.455695294064099, -76.59488260746002)
					]
				];

			ModalCargaFactory.mostrar(null, "Cargando Mapa...", null);
			console.log("detectando posicion actual...");

			$cordovaGeolocation
				.getCurrentPosition({timeout: 10000, enableHighAccuracy: true})
				.then(function(position) {
					ModalCargaFactory.ocultar();

					var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
						elemMapa = document.getElementById(idMapa),
						elemMarker = null, 
						mapOptions = {
						  center: latLng,
						  zoom: 18,
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						},
						contentString = "", //mensaje que se muestra al apuntar a una ubicacion no permitida
						poligonos = [], //areas permitidas para realizar la ubicacion.
						listenerTerminarCargar = null; //listener para deteccion inicial

					console.log(elemMapa);
					console.log("se detecto la posicion getCurrentPosition: " + latLng);

					if(!elemMapa) {
						deferred.reject("No existe contenedor para mapa... ");
						return
					}

					//crear mapa en <div id="{{idMapa}}">
					mapa = new google.maps.Map(elemMapa, mapOptions);
					
					//crear pin que se ubica en el centro de la pantalla
					elemMarker = document.createElement("div");
					elemMarker.id= "marker-"+idMapa;
					elemMarker.className = 'centerMarker';
					elemMapa.appendChild(elemMarker)	

					marker = new google.maps.Marker({
			        	position: latLng,
			        	icon: {
							//url: 'img/marker-rojo.png',
							// This marker is 20 pixels wide by 32 pixels high.
							//size: new google.maps.Size(30, 44),
							path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
							fillColor: 'green',
							fillOpacity: .0,
							strokeColor: 'white',
							strokeWeight: .0,
							scale: 10
						},
			        	map: mapa,
			        	draggable: false,
			        	title: 'Ubica el pin.'
			        });

					contentString = '<div>'+
						'<h5>No tenemos cobertura para este sitio</h5>'+
						'<p><b>Cleansuit</b>, no tiene cobertura de domicilio para esta ubicacion'
						'</p>'+
						'</div>';

			        infoWindow = new google.maps.InfoWindow({
				    	content: contentString,
				    	disableAutoPan: true
				  	});			
					
					for (var i = 0; i < areasPoligonos.length; i++) {
						poligonos[i] = new google.maps.Polygon({
							paths: areasPoligonos[i],
							strokeColor: '#FF0000',
							strokeOpacity: 0.8,
							strokeWeight: 2,
							fillColor: '#FF0000',
							fillOpacity: 0.35,
							map: mapa
						});
					}		

					/**
					 * Este evento es ejecutado cuando termina de cambiar el centro del mapa. 
					 * Si el centro del mapa se encuentra dentro de un área establecida
					 * el marker se pinta de azul, de lo contrario el marker muestra un mensaje.
					 */
					google.maps.event.addListener(mapa, 'center_changed', function() {
						infoWindow.close();
						console.log("Termino de arrastrar mapa para ubicar")
						var posCentro = mapa.getCenter(),
							puntoEnPoligono = false, 
							posicionArea = -1;
						
						for(var i = 0; i < poligonos.length; i++){
							puntoEnPoligono = google.maps.geometry.poly.containsLocation(posCentro, poligonos[i]) ? true : false;
							
							if(puntoEnPoligono) {
								posicionArea = i;
								i = poligonos.length + 1;
							}
						}
						
						//el punto se encuentra dentro del area del poligono	
						if(puntoEnPoligono){
							console.log("si esta dentor del area " + posicionArea);
							elemMarker.style.background = 'url("img/marker.png") no-repeat';
						}
						else{
							console.log("no esta dentro del area");
							elemMarker.style.background = 'url("img/marker-rojo.png") no-repeat';
							marker.setPosition(mapa.getCenter());
							infoWindow.open(mapa, marker);
						}
					});

					/**
					 * Este evento se ejecuta cuando un usuario inicia arrastre, el mensaje que se muestra
					 * se oculta.
					 */
					google.maps.event.addListener(mapa, 'dragstart', function(e) {
						infoWindow.close();
					});

					listenerTerminarCargar = google.maps.event.addListener(mapa, 'bounds_changed', function(e) {
						google.maps.event.trigger(mapa, "center_changed");
						google.maps.event.removeListener(listenerTerminarCargar);	
					});

					deferred.resolve({
						getPosicion: function(){
							return marker.getPosition();
						}
					});
				}, function(error){
					console.log("Could not get location");
					deferred.reject(error);
				});	
		}
	}
};

app.factory("MapasFactory", ['$q', '$cordovaGeolocation','ModalCargaFactory', 'CargaInicialFactory', MapasFactory]);

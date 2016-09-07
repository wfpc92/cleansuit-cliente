app.config(function($stateProvider,
					$urlRouterProvider,
					$logProvider,
					$provide,
					$compileProvider,
					$ionicConfigProvider,
					$httpProvider,
					$localStorageProvider,
					USER_ROLES) {


	//forzar a ionic que tenga las tabs arriba para todas las plataformas
	$ionicConfigProvider.tabs.position('top');
  
	$logProvider.debugEnabled(true);

	var toJSON = function(arguments) {
		var args = null;
		args = [].slice.call(arguments);
    	args[0] = ["CleanSuit", ': ', typeof args[0] == 'object' ? JSON.stringify(args[0]) : args[0]].join('');
    		
    	if(typeof args == 'object') {
    		for(var i = 1; i < args.length; i++) {
    			if(typeof args[i] == 'object') {
    				args[i] = JSON.stringify(args[i]);		
    			}
    		}
    	} else {return arguments}
		return args;
	}

    /*$provide.decorator('$log', function ($delegate) {
        //Original methods
        var origLog = $delegate.log,
        	origInfo = $delegate.info,
        	origWarn = $delegate.warn,
        	origError = $delegate.error,
        	origDebug = $delegate.debug;
        
        if ($logProvider.debugEnabled()) {
        	
        	$delegate.log = function () {
                origLog.apply(null, toJSON(arguments));
	        };
	    
	        $delegate.debug = function () {
	            origDebug.apply(null, toJSON(arguments))
	        };
        }     

        return $delegate;
    });*/


	$compileProvider.debugInfoEnabled(false);
	$ionicConfigProvider.scrolling.jsScrolling(false);
	
	var isAndroid = ionic.Platform.isAndroid();
	
	$ionicConfigProvider.backButton.text("");
	$ionicConfigProvider.backButton.previousTitleText("")
	$ionicConfigProvider.views.forwardCache(true);
	$ionicConfigProvider.views.maxCache(5);

	$httpProvider.interceptors.push(function ($rootScope, $q, $log, AUTH_EVENTS, APP_EVENTS) {
		return {
			responseError: function (response) {
				$log.log("AuthInterceptor.responseError()");
				$log.log(JSON.stringify(response));
				
				if(response.status == 0) {
					response.status = 106;
				}

				$rootScope.$broadcast({
					106: APP_EVENTS.noAccesoServidor,	
					401: AUTH_EVENTS.noAutenticado,
			    	403: AUTH_EVENTS.noAutorizado,
			    	404: APP_EVENTS.servidorNoEncontrado,
			    	500: APP_EVENTS.servidorNoEncontrado,
			    	501: APP_EVENTS.servidorNoEncontrado,
			    	502: APP_EVENTS.servidorNoEncontrado,
			    	503: APP_EVENTS.servidorNoEncontrado,
			  	}[response.status], response);
			  	return $q.reject(response);
			}
		};
	});

	$localStorageProvider.setKeyPrefix('CleanSuit-');

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	/**
	 * Rutas para autenticacion
	 */
	.state('autenticacion', {
		url: "/autenticacion",
    	abstract: true,
      	templateUrl: "templates/autenticacion/plantilla.html",
		data: {
	    	rolesAutorizados: [USER_ROLES.public]
	    }
	})

	.state('autenticacion.inicio', {
		url: '/inicio',
		views: {
        	'contenedor-app' : {
         		templateUrl: "templates/autenticacion/inicio.html",
        		controller : "AutenticacionInicioCtrl"
        	}
      	}
	})

	.state('autenticacion.registrar-manual', {
		url: '/registrar-manual',
		//cache: false,
		views: {
        	'contenedor-app' : {
        		templateUrl: 'templates/autenticacion/registrar-manual.html',
				controller: 'RegistrarManualCtrl'
			}
      	}

	})

	.state('autenticacion.ingresar-manual', {
		url: '/ingresar-manual',
		//cache: false,
		views: {
        	'contenedor-app' : {
        		templateUrl: 'templates/autenticacion/ingresar-manual.html',
				controller: 'IngresarManualCtrl'
			}
		}
	})

	.state('autenticacion.recuperar-contrasena', {
		url: '/recuperar-contrasena',
		//cache: false,
		views: {
        	'contenedor-app' : {
        		templateUrl: 'templates/autenticacion/recuperar-contrasena.html',
				controller: 'RecuperarContrasenaCtrl'
			}
		}
	})



	/**
	 * Rutas del dashboard y la aplicacion
	 */

	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/app/menu.html',//aqui estan las tabs,
		data: {
	    	rolesAutorizados: [USER_ROLES.cliente]
	    }
	})	

	.state('app.inicio', {
		url: '/inicio',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/inicio.html',//aqui estan las promociones
				controller: 'AppInicioCtrl'
			}
		}
	})

	.state('app.promociones-detalle', {
		url: '/promociones/detalle/:indexPromocion',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/promocion-detalle.html',
				controller: 'PromocionDetalleCtrl'
			}
		}
	})




	.state('app.servicios', {
		url: '/servicios',
		views: {
			'mis-servicios': {
				templateUrl: 'templates/app/servicios/servicios.html',
				controller: 'ServiciosCtrl'
			}
		}
	})
	.state('app.subservicios', {
		url: '/servicios/:indexServicio/subservicios',
		views: {
			'mis-servicios': {
				templateUrl: 'templates/app/servicios/subservicios.html',
				controller: 'SubserviciosCtrl'
			}
		}
	})
	.state('app.subservicio', {
		url: '/servicios/:indexServicio/subservicios/:indexSubservicio',
		views: {
			'mis-servicios': {
				templateUrl: 'templates/app/servicios/subservicio.html',
				controller: 'SubservicioCtrl'
			}
		}
	})
	

	.state('app.productos', {
		url: '/productos',
		views: {
			'mis-productos': {
				templateUrl: 'templates/app/productos/productos.html',
				controller: 'ProductosCtrl'
			}
		}
	})

	.state('app.producto', {
		url: '/productos/:indexProducto',
		views: {
			'mis-productos': {
				templateUrl: 'templates/app/productos/producto.html',
				controller: 'ProductoCtrl'
			}
		}
	})


	.state('app.carrito', {
		url: '/carrito',
		cache: false,
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/orden/carrito.html',
				controller: 'CarritoCtrl'
			}
		}
	})


	.state('app.informacion-orden', {
		url: '/informacion-orden',
		cache: false,
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/orden/informacion-orden.html',
				controller: 'InformacionOrdenCtrl'
			}
		}
	})

	

	.state('app.realizar-orden', {
		url: '/realizar-orden',
		cache: false,
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/orden/estado-orden.html',
				controller: 'RealizarOrdenCtrl'
			}
		}
	})



	/**
	 * Rutas de los items del menu
	 */
	
	.state('app.ordenes-en-proceso', {
		url: '/ordenes-en-proceso',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/ordenes-en-proceso.html',
				controller: 'OrdenesEnProcesoCtrl'
			}
		}
	})

	.state('app.orden-en-proceso', {
		url: '/ordenes-en-proceso/:indexOrden',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/informacion-orden.html',
				controller: 'OrdenEnProcesoCtrl'
			}
		}
	})

	.state('app.historial-ordenes', {
		url: '/historial-ordenes',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/historial-ordenes.html',
				controller: 'HistorialOrdenesCtrl'
			}
		}
	})

	.state('app.historial-orden', {
		url: '/historial-ordenes/:indexOrden',
		cache:false,
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/informacion-orden.html',
				controller: 'HistorialOrdenCtrl'
			}
		}
	})

	.state('app.perfil', {
		url: '/perfil',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/perfil.html',
				controller: 'PerfilCtrl'
			}
		}
	})

	.state('app.about', {
		url: '/about',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/principal/acerca.html',
				controller: 'AcercaCtrl'
			}
		}
	})
	
	//$urlRouterProvider.otherwise('/autenticacion/inicio');
	$urlRouterProvider.otherwise( function($injector, $location) {
    	var $state = $injector.get("$state");
    	$state.go("autenticacion.inicio");
    });

});
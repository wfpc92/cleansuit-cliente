app.config(function($stateProvider,
	$urlRouterProvider,
	$logProvider,
	$compileProvider,
	$ionicConfigProvider,
	$httpProvider) {


	//forzar a ionic que tenga las tabs arriba para todas las plataformas
	$ionicConfigProvider.tabs.position('top');
  
	//$logProvider.debugEnabled(false);
	$compileProvider.debugInfoEnabled(false);
	$ionicConfigProvider.scrolling.jsScrolling(false);
	
	var isAndroid = ionic.Platform.isAndroid();
	var txtAtras = 'Atras';
	if (isAndroid) { 
		txtAtras = '';
	}
	console.log("es android: "+isAndroid)
	$ionicConfigProvider.backButton.text(txtAtras);
	$ionicConfigProvider.views.forwardCache(true);
	$ionicConfigProvider.views.maxCache(5);

	$httpProvider.interceptors.push('AuthInterceptor');


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
      	templateUrl: "templates/autenticacion/plantilla.html"
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
		templateUrl: 'templates/app/menu.html',//aqui estan las tabs
		controller: 'AppCtrl'
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
		//cache: false,
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
		views: {
			'mi-carrito': {
				templateUrl: 'templates/app/historial/ordenes-en-proceso.html',
				controller: 'OrdenesEnProcesoCtrl'
			}
		}
	})

	.state('app.orden-en-proceso', {
		url: '/ordenes-en-proceso/:indexOrden',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/informacion-orden.html',
				controller: 'OrdenEnProcesoCtrl'
			}
		}
	})

	.state('app.historial-ordenes', {
		url: '/historial-ordenes',
		views: {
			'panel-contenido': {
				templateUrl: 'templates/app/historial/historial-ordenes.html',
				controller: 'HistorialOrdenesCtrl'
			}
		}
	})

	.state('app.historial-orden', {
		url: '/historial-ordenes/:indexOrden',
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
				templateUrl: 'templates/app/principal/about.html',
				controller: 'AcercaCtrl'
			}
		}
	})
	
	$urlRouterProvider.otherwise('/autenticacion/inicio');

});
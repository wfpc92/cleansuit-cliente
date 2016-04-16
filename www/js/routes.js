app.config(function($stateProvider, $urlRouterProvider, $logProvider, $compileProvider, $ionicConfigProvider) {


	//forzar a ionic que tenga las tabs arriba para todas las plataformas
	$ionicConfigProvider.tabs.position('top');
  
	//$logProvider.debugEnabled(false);
	$compileProvider.debugInfoEnabled(false);
	$ionicConfigProvider.scrolling.jsScrolling(false);
	
	$ionicConfigProvider.backButton.text('Atras');
	$ionicConfigProvider.views.forwardCache(true);
	$ionicConfigProvider.views.maxCache(5);

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider


	/**
	 * Rutas para autenticacion
	 */
	
	
	.state('autenticacion-inicio', {
		url: '/autenticacion-inicio',
		templateUrl: 'templates/autenticacion/inicio.html',
		controller:'AutenticacionInicioCtrl'
	})

	.state('autenticacion-registrar-manual', {
		url: '/autenticacion-registrar-manual',
		//cache: false,
		templateUrl: 'templates/autenticacion/registrar-manual.html',
		controller: 'registrarManualCtrl'
	})

	.state('autenticacion-ingresar-manual', {
		url: '/autenticacion-ingresar-manual',
		//cache: false,
		templateUrl: 'templates/autenticacion/ingresar-manual.html',
		controller: 'ingresarManualCtrl'
	})

	.state('autenticacion-recuperar-contrasena', {
		url: '/autenticacion-recuperar-contrasena',
		//cache: false,
		templateUrl: 'templates/autenticacion/recuperar-contrasena.html',
		controller: 'RecuperarContrasenaCtrl'
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
			'mis-promociones': {
				templateUrl: 'templates/app/inicio.html',
				controller: 'AppInicioCtrl'
			}
		}
	})

	.state('app.categorias', {
		url: '/categorias',
		views: {
			'mis-categorias': {
				templateUrl: 'templates/app/servicios/categorias.html',
				controller: 'CategoriasCtrl'
			}
		}
	})


	.state('app.servicios', {
		url: '/servicios/:indexCategoria',
		views: {
			'mis-categorias': {
				templateUrl: 'templates/app/servicios/servicios.html',
				controller: 'ServiciosCtrl'
			}
		}
	})


	.state('app.servicio', {
		url: '/servicios/:indexCategoria/:indexServicio',
		views: {
			'mis-categorias': {
				templateUrl: 'templates/app/servicios/servicio.html',
				controller: 'ServicioCtrl'
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
				templateUrl: 'templates/app/orden/realizar-orden.html',
				controller: 'RealizarOrdenCtrl'
			}
		}
	})



	/**
	 * Rutas de los items del menu
	 */
	/*
	.state('app.ordenes-en-proceso', {
		url: '/ordenes-en-proceso',
		views: {
			'menuContent': {
				templateUrl: 'templates/app/orden/ordenes-en-proceso.html',
				controller: 'OrdenesEnProcesoCtrl'
			}
		}
	})

	.state('app.orden-en-proceso', {
		url: '/ordenes-en-proceso/:idOrden',
		views: {
			'menuContent': {
				templateUrl: 'templates/app/orden/orden-en-proceso.html',
				controller: 'OrdenEnProcesoCtrl'
			}
		}
	})

	.state('app.historial-ordenes', {
		url: '/historial-ordenes',
		views: {
			'menuContent': {
				templateUrl: 'templates/app/orden/historial-ordenes.html',
				controller: 'HistorialOrdenesCtrl'
			}
		}
	})

	.state('app.historial-orden', {
		url: '/historial-ordenes/:idOrden',
		views: {
			'menuContent': {
				templateUrl: 'templates/app/orden/historial-informacion-orden.html',
				controller: 'HistorialOrdenCtrl'
			}
		}
	})
	*/

	$urlRouterProvider.otherwise('/autenticacion-inicio');
});
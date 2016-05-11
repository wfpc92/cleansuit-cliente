app.config(function($stateProvider, $urlRouterProvider, $logProvider, $compileProvider, $ionicConfigProvider) {


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
		templateUrl: 'templates/app/principal/tabs.html',//aqui estan las tabs
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
				templateUrl: 'templates/app/orden/estado-orden.html',
				controller: 'RealizarOrdenCtrl'
			}
		}
	})



	/**
	 * Rutas de los items del menu
	 */
	
	.state('ordenes-en-proceso', {
		url: '/ordenes-en-proceso',
		templateUrl: 'templates/app/historial/ordenes-en-proceso.html',
		controller: 'OrdenesEnProcesoCtrl'
	})

	.state('orden-en-proceso', {
		url: '/ordenes-en-proceso/:indexOrden',
		templateUrl: 'templates/app/orden/estado-orden.html',
		controller: 'OrdenEnProcesoCtrl'
	})

	.state('historial-ordenes', {
		url: '/historial-ordenes',
		templateUrl: 'templates/app/historial/historial-ordenes.html',
		controller: 'HistorialOrdenesCtrl'
	})

	.state('historial-orden', {
		url: '/historial-ordenes/:indexOrden',
		templateUrl: 'templates/app/historial/historial-informacion-orden.html',
		controller: 'HistorialOrdenCtrl'
	})

	.state('perfil', {
		url: '/perfil',
		templateUrl: 'templates/app/principal/perfil.html',
		controller: 'PerfilCtrl'
	})

	.state('about', {
		url: '/about',
		templateUrl: 'templates/app/principal/about.html',
		controller: 'AcercaCtrl'
	})
	

	$urlRouterProvider.otherwise('/autenticacion-inicio');
});
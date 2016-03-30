angular.module('ClienteCleanSuit.routes', [])

.config(function($stateProvider, $urlRouterProvider, $logProvider, $compileProvider, $ionicConfigProvider) {

  $logProvider.debugEnabled(true);
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
  .state('autenticacion', {
    url: '/autenticacion',
    abstract: true,
    templateUrl: 'templates/autenticacion/menu.html',
    //controller: 'AppCtrl'
  })
  
  .state('autenticacion.inicio', {
    url: '/inicio',
    views: {
        'menuContent': {
          templateUrl: 'templates/autenticacion/inicio.html',
          //controller: 'InicioCtrl'
        }
      }
  })

  .state('autenticacion.registrar-manual', {
    url: '/registrar-manual',
    cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/autenticacion/registrar-manual.html',
          controller: 'registrarManualCtrl'
        }
    }
  })

  .state('autenticacion.ingresar-manual', {
    url: '/ingresar-manual',
    cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/autenticacion/ingresar-manual.html',
          controller: 'ingresarManualCtrl'
        }
    }
  })

  .state('autenticacion.recuperar-contrasena', {
    url: '/recuperar-contrasena',
    cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/autenticacion/recuperar-contrasena.html',
          controller: 'recuperarContrasenaCtrl'
        }
    }
  })




  /**
   * Rutas del dashboard y la aplicacion
   */
  
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.inicio', {
    url: '/inicio',
    views: {
        'menuContent': {
          templateUrl: 'templates/app/inicio.html',
          controller: 'AppInicioCtrl'
        }
      }
  })

  .state('app.categorias', {
    url: '/categorias',
    views: {
        'menuContent': {
          templateUrl: 'templates/app/servicios/categorias.html',
          controller: 'CategoriasCtrl'
        }
      }
  })


  .state('app.servicios', {
    url: '/servicios/:idCategoria',
    views: {
        'menuContent': {
          templateUrl: 'templates/app/servicios/servicios.html',
          controller: 'ServiciosCtrl'
        }
      }
  })


  .state('app.servicio', {
    url: '/servicios/:idCategoria/:idServicio',
    views: {
        'menuContent': {
          templateUrl: 'templates/app/servicios/servicio.html',
          controller: 'ServicioCtrl'
        }
      }
  })

  .state('app.productos', {
    url: '/productos',
    views: {
        'menuContent': {
          templateUrl: 'templates/app/productos/productos.html',
          controller: 'ProductosCtrl'
        }
      }
  })

  .state('app.producto', {
    url: '/productos/:idProducto',
    views: {
        'menuContent': {
          templateUrl: 'templates/app/productos/producto.html',
          controller: 'ProductoCtrl'
        }
      }
  })


  .state('app.carrito', {
    url: '/carrito',
    //cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/app/orden/carrito.html',
          controller: 'CarritoCtrl'
        }
      }
  })


  .state('app.informacion-orden', {
    url: '/informacion-orden',
    //cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/app/orden/informacion-orden.html',
          controller: 'InformacionOrdenCtrl'
        }
      }
  })

  .state('app.cancelar-orden', {
    url: '/cancelar-orden',
    //cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/app/inicio.html',
          controller: 'CancelarOrdenCtrl'
        }
      }
  })

  .state('app.realizar-orden', {
    url: '/realizar-orden',
    //cache: false,
    views: {
        'menuContent': {
          templateUrl: 'templates/app/orden/realizar-orden.html',
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

   



$urlRouterProvider.otherwise('/autenticacion/inicio');


  

});
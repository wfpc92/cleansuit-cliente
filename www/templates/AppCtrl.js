var AppCtrl = function($scope,
					$rootScope, 
					$state, 
					$ionicHistory,
					$log,
					$cordovaInAppBrowser,
					UsuarioFactory,
					ControlDescargasFactory,
					CarritoFactory,
					OrdenesFactory,
					PopupFactory,
					AuthService,
					AUTH_EVENTS,
					APP_EVENTS,
					USER_ROLES) {

	$log.debug("AppCtrl");

	$scope.banderas = {
		swp:false,
		sws:false
	}; 
	
	//verificar si esta autenticado y autorizado.
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		//$log.debug("event:$stateChangeStart", toState, toParams, fromState, fromParams)
		var rolesAutorizados = toState.data.rolesAutorizados;
		if (!AuthService.estaAutorizado(rolesAutorizados)) {
			//$log.debug("no esta autorizado")
			// usuario no autorizado
			if (AuthService.estaAutenticado()) {
				//$log.debug("esta autenticado")
				event.preventDefault();
				if(toState.name.indexOf("autenticacion.") !== -1){
					// usuario quiere volver a autenticar?, no permitido
					$state.go('app.inicio');
				} else {
					//solicitud de estado desconocido
					AuthService.logout();
					CarritoFactory.vaciar();
					$rootScope.$broadcast("limpiarLista");
					$rootScope.$broadcast(AUTH_EVENTS.noAutorizado);
				}
				
			} else {
				//$log.debug("no esta autenticado")
				if(toState.name.indexOf("app.") !== -1){
					// usuario no esta autenticado y quiere ingresar a la app
					event.preventDefault();
					$rootScope.$broadcast(AUTH_EVENTS.noAutenticado);
				}
			}
		}
			
	});
	
	$scope.$on(AUTH_EVENTS.loginSuccess, function(event, args){
		$scope.usuario = UsuarioFactory.getUsuario();
		$state.go('app.inicio');
	});


	$scope.$on(AUTH_EVENTS.loginFailed, function(event, args){
		var alertPopup = PopupFactory.alert({
			title: 'Verifica por favor!',
			template: args.msg
		});
	});

	$scope.$on(AUTH_EVENTS.loginFBFailed, function(event, args){
		var navegador = cordova.InAppBrowser.open("http://www.cleansuit.co/", "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
		navegador.close();
		
		var alertPopup = PopupFactory.alert({
			title: 'Verifica por favor!',
			template: args.msg
		});
	});

	$scope.$on(AUTH_EVENTS.noAutorizado, function(event) {
		var alertPopup = PopupFactory.alert({
			title: 'No es posible acceder!',
			template: 'Este recurso no está disponible para ti.'
		});
	});

	$scope.$on(AUTH_EVENTS.noAutenticado, function(event) {
		AuthService.logout();
		$state.go('autenticacion.inicio');
		var alertPopup = PopupFactory.alert({
			title: 'Usuario no autenticado!',
			template: 'Debes iniciar sesion.'
		});
	});

	$scope.$on(AUTH_EVENTS.perfilActualizado, function(event, args) {
		$log.debug("event:AppCtrl.perfilActualizado");

		PopupFactory.alert({
			title: "Perfil de usuario",
			template: args.msg || "no hay mensaje"
		});
	});

	$scope.$on(APP_EVENTS.noAccesoServidor, function(event, args) {
		$log.debug("event:AppCtrl.noAccesoServidor");

		PopupFactory.alert({
			title: 'No se puede acceder',
			template: "Al parecer no tienes una conexión a internet. Por favor, intenta conectarte a una red e intenta ingresar de nuevo."
		});
	});

	$scope.$on(APP_EVENTS.servidorNoEncontrado, function(event, args) {
		$log.debug("event:AppCtrl.servidorNoEncontrado");

		PopupFactory.alert({
			title: 'No se encuentra',
			template: "Estamos experimentado problemas con nuestros servidores. Por favor, vuelve más tarde."
		});
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.usuario = UsuarioFactory.getUsuario();
		$scope.carrito = CarritoFactory;

		if($scope.usuario) {
	    	ControlDescargasFactory
			.cargarVersiones()
			.then(function() {
				$log.debug("AppCtrl.event:$ionicView.afterEnter, contOrdenesEnProceso", $scope.contOrdenesEnProceso)
				$scope.contOrdenesEnProceso = OrdenesFactory.ordenesEnProceso.length;
			});
		}
	});

	$scope.logout = function() {
		$log.debug("AppCtrl.logout():");	
		AuthService.logout();
		CarritoFactory.vaciar();
		$rootScope.$broadcast("limpiarLista");
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache();
		$state.go('autenticacion.inicio');
	};		
};

app.controller('AppCtrl', AppCtrl);

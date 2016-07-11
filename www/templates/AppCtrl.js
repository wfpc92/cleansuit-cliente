var AppCtrl = function($scope,
					$rootScope,
					$ionicHistory, 
					UsuarioFactory,
					OrdenesFactory,
					CarritoFactory,
					$state, 
					$ionicPopup,
					AuthService,
					AUTH_EVENTS,
					APP_EVENTS,
					USER_ROLES) {

	console.log("AppCtrl")

	
	//verificar si esta autenticado y autorizado.
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		//console.log("event:$stateChangeStart", toState, toParams, fromState, fromParams)
		var rolesAutorizados = toState.data.rolesAutorizados;
		if (!AuthService.estaAutorizado(rolesAutorizados)) {
			//console.log("no esta autorizado")
			// usuario no autorizado
			if (AuthService.estaAutenticado()) {
				//console.log("esta autenticado")
				event.preventDefault();
				if(toState.name.indexOf("autenticacion.") !== -1){
					// usuario quiere volver a autenticar?, no permitido
					$state.go('app.inicio');
				} else {
					//solicitud de estado desconocido
					$state.go('autenticacion.inicio');
					$rootScope.$broadcast(AUTH_EVENTS.noAutorizado);
				}
				
			} else {
				//console.log("no esta autenticado")
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
		var alertPopup = $ionicPopup.alert({
			title: 'Verifica por favor!',
			template: args.msg
		});
	});

	$scope.$on(AUTH_EVENTS.noAutorizado, function(event) {
		var alertPopup = $ionicPopup.alert({
			title: 'No es posible acceder!',
			template: 'Este recurso no está disponible para ti.'
		});
	});

	$scope.$on(AUTH_EVENTS.noAutenticado, function(event) {
		AuthService.logout();
		$state.go('autenticacion.inicio');
		var alertPopup = $ionicPopup.alert({
			title: 'Usuario no autenticado!',
			template: 'Debes iniciar sesion.'
		});
	});

	$scope.$on(AUTH_EVENTS.perfilActualizado, function(event, args) {
		console.log("event:AppCtrl.perfilActualizado");

		$ionicPopup
		.alert({
			title: "Perfil de usuario",
			template: args.msg || "no hay mensaje"
		});
	});

	$scope.$on(APP_EVENTS.noAccesoServidor, function(event, args) {
		console.log("event:AppCtrl.noAccesoServidor");

		//cambiar para que solo se ejcuute una sola vez este evento.
		$ionicPopup
		.alert({
			title: 'No se puede acceder',
			template: "Estamos experimentado problemas con nuestros servidores. Por favor, vuelve más tarde."
		});
	});

	$scope.$on(APP_EVENTS.servidorNoEncontrado, function(event, args) {
		console.log("event:AppCtrl.servidorNoEncontrado");

		//cambiar para que solo se ejcuute una sola vez este evento.
		$ionicPopup
		.alert({
			title: 'No se encuentra',
			template: "Estamos experimentado problemas con nuestros servidores. Por favor, vuelve más tarde."
		});
	});

	

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.usuario = UsuarioFactory.getUsuario();
		$scope.carrito = CarritoFactory;

		if($scope.usuario) {
	    	OrdenesFactory
			.cargarOrdenesEnProceso()
			.then(function(){
				console.log("AppCtrl.event:$ionicView.afterEnter, contOrdenesEnProceso", $scope.contOrdenesEnProceso)
				$scope.contOrdenesEnProceso = OrdenesFactory.getOrdenesEnProceso().length;
			});
		}
	});

	$scope.logout = function() {
		console.log("AppCtrl.logout():");	
		AuthService.logout();
		$state.go('autenticacion.inicio');
	};		
};

app.controller('AppCtrl', AppCtrl);

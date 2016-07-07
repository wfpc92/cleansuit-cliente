var AppCtrl = function($scope, 
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

	$scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
		var alertPopup = $ionicPopup.alert({
			title: 'No es posible acceder!',
			template: 'Este recurso no está disponible para ti.'
		});
	});

	$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
		AuthService.logout();
		$state.go('autenticacion.inicio');
		var alertPopup = $ionicPopup.alert({
			title: 'Usuario no autenticado!',
			template: 'Debes iniciar sesion.'
		});
	});

	$scope.$on(AUTH_EVENTS.perfilActualizado, function(event, args) {
		console.log("event:AppCtrl.perfilActualizado");

		AuthService.actualizarCredenciales();
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
			title: "No hay conexión con el servidor",
			template: "En este momento no hay conexión con el servidor, intenta más tarde."
		});
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.usuario = UsuarioFactory.getUsuario();
		$scope.carrito = CarritoFactory;

		if($scope.usuario.rol) {
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

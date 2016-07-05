var AppCtrl = function($scope, 
					UsuarioFactory,
					OrdenesFactory,
					$state, 
					$ionicPopup,
					AuthService,
					AUTH_EVENTS,
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
			template: 'Este recurso no esta disponible para ti.'
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
		AuthService.actualizarCredenciales();
		$ionicPopup
		.alert({
			title: "Perfil de usuario",
			template: args.msg
		});
	});

	$scope.$on('$ionicView.afterEnter', function(event) {
		$scope.usuario = UsuarioFactory.getUsuario();
		if($scope.usuario){
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

/*
		var hideSheet = $ionicActionSheet.show({
		destructiveText: 'Logout',
		titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
		cancelText: 'Cancel',
		cancel: function() {},
		buttonClicked: function(index) {
		return true;
		},
		destructiveButtonClicked: function(){
		$ionicLoading.show({
		template: 'Logging out...'
		});

		try {
		// Facebook logout
		facebookConnectPlugin.logout(function(){
		$ionicLoading.hide();
		$state.go("autenticacion.inicio");
		},
		function(fail){
		$ionicLoading.hide();
		});
		} catch (e) {
		$ionicLoading.hide();
		$state.go("autenticacion.inicio");
		}
		}
		});
		*/
var AppCtrl = function($scope, 
					UsuarioFactory, 
					$state, 
					$ionicPopup,
					AuthService,
					AUTH_EVENTS,
					USER_ROLES) {

	console.log("AppCtrl")

	$scope.usuario = null;

	$scope.setCurrentUser = function () {
		$scope.usuario = UsuarioFactory.getUsuario();
	};
	
	$scope.$on(AUTH_EVENTS.loginSuccess, function(event){
		$state.go('app.inicio');
	});


	$scope.$on(AUTH_EVENTS.loginFailed, function(event){
		var alertPopup = $ionicPopup.alert({
			title: 'Login Failed!',
			template: 'login failed'
		});
	});

	$scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
		var alertPopup = $ionicPopup.alert({
			title: 'Unauthorized!',
			template: 'You are not allowed to access this resource.'
		});
	});

	$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
		AuthService.logout();
		$state.go('autenticacion.inicio');
		var alertPopup = $ionicPopup.alert({
			title: 'usuario no autenticado!',
			template: 'debe iniciar sesion.'
		});
	});

	$scope.logout = function() {
		console.log("AppCtrl.logout():")
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
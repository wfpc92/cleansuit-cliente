var AppCtrl = function($scope, 
					UsuarioFactory, 
					CarritoFactory, 
					$state, 
					HistorialOrdenFactory,
					$ionicActionSheet,
					$ionicPopup,
					$ionicLoading,
					AuthService,
					API_ENDPOINT,
					AUTH_EVENTS,
					$http) {
	var self = this;
	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.ordenesEnProceso = HistorialOrdenFactory.ordenesEnProceso;


	$scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
		AuthService.logout();
		$state.go('autenticacion.ingresar-manual');
		var alertPopup = $ionicPopup.alert({
			title: 'Session Lost!',
			template: 'Sorry, You have to login again.'
		});
	});

	$scope.logout = function() {
		console.log("cerrar sesion")

		AuthService.logout();
		$state.go('autenticacion.ingresar-manual');
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

		
	};	
};

app.controller('AppCtrl', AppCtrl);

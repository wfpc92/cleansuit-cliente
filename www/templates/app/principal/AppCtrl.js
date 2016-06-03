var AppCtrl = function($scope, 
					UsuarioFactory, 
					CarritoFactory, 
					$state, 
					HistorialOrdenFactory,
					$ionicActionSheet,
					$ionicLoading) {
	var self = this;

	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.ordenesEnProceso = HistorialOrdenFactory.ordenesEnProceso;

	$scope.cerrarSesion = function() {
		console.log("cerrar sexion")
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

		
	};	
};

app.controller('AppCtrl', AppCtrl);

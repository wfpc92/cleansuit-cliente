var AutenticacionInicioCtrl = function($scope, 
									$ionicSideMenuDelegate, 
									$ionicLoading, 
									AuthService,
									$rootScope, AUTH_EVENTS) {
	
	$ionicSideMenuDelegate.canDragContent(false);

	$scope.ingresarFacebook = function() {
		AuthService
		.ingresarFacebook()
		.then(function(msg) {
			console.log("AutenticacionInicioCtrl.ingresarFacebook()", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {msg: msg});
		}, function(msg) {
			console.log("AutenticacionInicioCtrl: err", msg);
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: msg.statusText});
		})
		.finally(function(){
			//$ionicLoading.hide()
		})
	};
};

app.controller('AutenticacionInicioCtrl', AutenticacionInicioCtrl);
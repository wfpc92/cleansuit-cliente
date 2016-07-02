// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('ClienteCleanSuit', ['ionic', 'angularLoad', 'ngCordova', 'ngResource'])

.run(function($ionicPlatform,
			$rootScope,
			$state,
			AuthService,AUTH_EVENTS) {

	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
	
	//verificar si esta autenticado y autorizado.
	$rootScope.$on('$stateChangeStart', function (event, next) {
		//console.log("event:$stateChangeStart",next)
		var authorizedRoles = next.data.authorizedRoles;
		if (!AuthService.isAuthorized(authorizedRoles)) {
			console.log("no autorizado")
			
			if (AuthService.isAuthenticated()) {
				// user is not allowed
				event.preventDefault();
				$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
			} else {
				if(next.name.indexOf("app.") !== -1){
					// user is not logged in
					event.preventDefault();
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				}
			}
		}
	});

});

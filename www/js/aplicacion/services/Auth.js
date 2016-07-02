var AuthService = function($q, 
						$http, 
						API_ENDPOINT,
						USER_ROLES, 
						UsuarioFactory) {

	var LOCAL_CLIENT_KEY = 'CleanSuitClient';
	var isAuthenticated = false;
 
	function loadUserCredentials() {
		console.log("AuthService.loadUserCredentials()")
		var usuario = JSON.parse(window.localStorage.getItem(LOCAL_CLIENT_KEY));

		if (usuario) {
			useCredentials(usuario);
		}
	}
 
	function storeUserCredentials(usuario) {
		console.log("AuthService.storeUserCredentials()")
		window.localStorage.setItem(LOCAL_CLIENT_KEY, JSON.stringify(usuario));
		useCredentials(usuario);
	}
 
	function useCredentials(usuario) {
		console.log("AuthService.useCredentials()")
		UsuarioFactory.setUsuario(usuario);
	    isAuthenticated = true;
 
    	// Set the token as header for your requests!
    	//$http.defaults.headers.common['X-Auth-Token'] = token;
    	// Set the token as header for your requests!
		$http.defaults.headers.common.Authorization = UsuarioFactory.getUsuario().token;
	}
 
	function destroyUserCredentials() {
		console.log("AuthService.destroyUserCredentials()")
		UsuarioFactory.setUsuario(null);
		isAuthenticated = false;
		//$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$http.defaults.headers.common.Authorization = undefined;
    	window.localStorage.removeItem(LOCAL_CLIENT_KEY);
	}
 
 	//result.data = {success:boolean, usuario: {nombre:string, correo:string, role:string, token:string}}
 	var authCallback = function(resolve, reject, result) {
		if (result.data.success) {
			storeUserCredentials(result.data.usuario);
			return resolve(result.data.mensaje);
		} else {
			return reject(result.data.mensaje);
		}
 	};

 	var login = function(user) {
		console.log("AuthService.login()")
		return $q(function(resolve, reject) {
			$http
			.post(API_ENDPOINT.url + '/authenticate', user)
			.then(function(res) {
 				console.log("AuthService.login()", res)
				return authCallback(resolve, reject, res);
			});
		});
	};

	var register = function(user) {
		console.log("AuthService.register()")
		return $q(function(resolve, reject) {
			$http
			.post(API_ENDPOINT.url + '/signup', user)
			.then(function(res) {
 				console.log("AuthService.register()", res)
				return authCallback(resolve, reject, res);
			});
		});
	};
 
	var logout = function() {
		console.log("AuthService.logout()")
		destroyUserCredentials();
	};

	var isAuthorized = function(authorizedRoles) {
		console.log("AuthService.isAuthorized()")
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (isAuthenticated && authorizedRoles.indexOf(UsuarioFactory.getUsuario().rol) !== -1);
	};
 
	loadUserCredentials();
 
	return {
		login: login,
		register: register,
		logout: logout,
    	isAuthorized: isAuthorized,
		isAuthenticated: function() {return isAuthenticated;}
	};
};

app.service('AuthService', AuthService)

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
    	console.log("AuthInterceptor.responseError()")
    	$rootScope.$broadcast({
        	401: AUTH_EVENTS.notAuthenticated,
        	403: AUTH_EVENTS.notAuthorized
      	}[response.status], response);
      	return $q.reject(response);
    }
  };
})

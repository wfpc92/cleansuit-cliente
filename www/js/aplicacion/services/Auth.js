var AuthService = function($q, 
						$http, 
						API_ENDPOINT,
						USER_ROLES, 
						UsuarioFactory,
						RecursosFactory,
						FacebookSvc) {

	var estaAutenticado = false;
 
	function cargarCredenciales() {
		console.log("AuthService.cargarCredenciales()")
		
		if (UsuarioFactory.getUsuario()) {
			useCredentials();
		}
	}
 
	function guardarCredenciales(usuario) {
		console.log("AuthService.guardarCredenciales()")
		UsuarioFactory.setUsuario(usuario);
		useCredentials(usuario);
	}
 
	function useCredentials() {
		console.log("AuthService.useCredentials()")
		estaAutenticado = true;
 
    	// Set the token as header for your requests!
    	//$http.defaults.headers.common['X-Auth-Token'] = token;
    	// Set the token as header for your requests!
		$http.defaults.headers.common.Authorization = UsuarioFactory.getUsuario().token;
	}
 
	function eliminarCredenciales() {
		console.log("AuthService.eliminarCredenciales()")
		UsuarioFactory.deleteUsuario();
		estaAutenticado = false;
		//$http.defaults.headers.common['X-Auth-Token'] = undefined;
		$http.defaults.headers.common.Authorization = undefined;
    	//window.localStorage.removeItem(LOCAL_CLIENT_KEY);
	}
 
 	//result.data = {success:boolean, usuario: {nombre:string, correo:string, role:string, token:string}}
 	function authCallback(resolve, reject, result) {
		if (result.data.success) {
			guardarCredenciales(result.data.usuario);
			return resolve(result.data.mensaje);
		} else {
			return reject(result.data.mensaje);
		}
 	};

	var registrar = function(usuario) {
		return $q(function(resolve, reject) {
			RecursosFactory
			.post('/registrar', usuario)
			.then(function(res) {
 				console.log("AuthService.registrar()", res)
				return authCallback(resolve, reject, res);
			});
		});
	};

 	var ingresar = function(usuario) {
		return $q(function(resolve, reject) {
			RecursosFactory
			.post('/ingresar', usuario)
			.then(function(res) {
 				console.log("AuthService.ingresar()", res)
				return authCallback(resolve, reject, res);
			});
		});
	};

	var ingresarFacebook = function() {
		return $q(function(resolve, reject) {
			FacebookSvc
			.autenticar(resolve, reject)
			.then(function(respuesta){
				console.log("AuthService.ingresarFacebook(), ",JSON.stringify(respuesta))
				if(respuesta){
					RecursosFactory
					.post('/ingresar/fb', {
						'fb_token':respuesta.fb_token,
						'fb_uid': respuesta.fb_uid
					})
					.then(function(respuesta){
						console.log("AuthService.ingresarFacebook", respuesta)
						if(respuesta.data.success){
							//si existe=true, el fb_uid ya esta registrado en el sistema
							return authCallback(resolve, reject, respuesta); 
						} else {
							return reject(respuesta.data.mensaje);
						}
					});
				}
			})
		});
	};
 
	var logout = function() {
		console.log("AuthService.logout()")
		eliminarCredenciales();
		FacebookSvc.logout();
	};

	var estaAutorizado = function(rolesAutorizados) {
		console.log("AuthService.estaAutorizado()")
		if(!UsuarioFactory.getUsuario()){
			return false;
		}

		if (!angular.isArray(rolesAutorizados)) {
			rolesAutorizados = [rolesAutorizados];
		}
		return (estaAutenticado && rolesAutorizados.indexOf(UsuarioFactory.getUsuario().rol) !== -1);
	};
 
	cargarCredenciales();
 
	return {
		ingresar: ingresar,
    	ingresarFacebook: ingresarFacebook,
		registrar: registrar,
		logout: logout,
    	estaAutorizado: estaAutorizado,
		estaAutenticado: function(){
    		return estaAutenticado;
    	},
	};
};

app.service('AuthService', AuthService);

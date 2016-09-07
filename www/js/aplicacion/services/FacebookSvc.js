var FacebookSvc = function(ngFB,
						$q,
						$log) {
	
	ngFB.init({
		appId: "1732222377062073"
	})
	
	return {
		autenticar: function(resolve, reject) {
			$log.debug("FacebookSvc.autenticar()")
			/*return $q(function(resolve, reject, err) {
				return resolve({fb_token: "token",
				fb_uid: "id"})
			});
			*/
			return ngFB.login({
				scope: "email,public_profile"
			})
			.then(function(respuestaFacebook) {
				$log.debug(JSON.stringify(respuestaFacebook))
				if("connected" === respuestaFacebook.status){
					return ngFB.api({
						path: "/me",
						params: {
							fields: "id"
						}
					})
					.then(function(respuesta){
						return {
							fb_token: respuestaFacebook.authResponse.accessToken,
							fb_uid: respuesta.id
						}
					}, function() {
						$log.debug("error al obtener id de usuario.")
						return reject("No se ha podido obtener información de usuario");
					}); 
				} else {
					$log.debug("facebook no retorna un estado conectado");
					return reject(respuestaFacebook.status);
				}
			}, function(err) {
				//el usuario cancela, o no hay internet.
				//no hacer nada
			});
		},
		logout: function() {
			ngFB.logout()
		},
		getDatos: function(resolve, reject) {
			return ngFB.api({
				path: "/me",
				params: {
					fields: "email,name,first_name,last_name,id"
				}
			})
			.then(function(respuestaFacebook) {
				$log.debug("FacebookSvc.getDatos()", respuestaFacebook);
				return {
					fb_uid: respuestaFacebook.id,
					nombre: respuestaFacebook.name,
					correo: respuestaFacebook.email
				}
			}, function(err) {
				return reject(err);
			})
		}
	}
};

app.service("FacebookSvc", FacebookSvc);

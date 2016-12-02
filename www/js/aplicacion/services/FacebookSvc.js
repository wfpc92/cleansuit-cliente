var FacebookSvc = function(//ngFB,
						$openFB,
						$q,
						$log) {
	$openFB.init({
		appId: "1732222377062073"
	})

	return {
		autenticar: function(resolve, reject) {
			$log.debug("FacebookSvc.autenticar()")
			
			return $openFB.login({
				scope: "email,public_profile"
			})
			.then(function(respuestaFacebook) {
				$log.debug("FacebookSvc.login()", JSON.stringify(respuestaFacebook))
				if(respuestaFacebook){
					return $openFB.api({
						path: "/me",
						params: {
							fields: "id"
						}
					})
					.then(function(respuesta){
						$log.debug("FacebookSvc.logon():api", JSON.stringify(respuesta));
						return {
							fb_token: respuestaFacebook,
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
				$log.debug("Error ngFB.login", JSON.stringify(err));
				//el usuario cancela, o no hay internet.
				//no hacer nada
			});
		},
		logout: function() {
			$openFB.revokePermissions();
		}
	}
};

app.service("FacebookSvc", FacebookSvc);

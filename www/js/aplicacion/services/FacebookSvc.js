app.service("FacebookSvc", ["ngFB", function(n) {
	n.init({
		appId: "1732222377062073"
	})
	
	return {
		autenticar: function() {
			console.log("FacebookSvc.autenticar()", JSON.stringify(n))
			return n.login({
				scope: "email,public_profile",
				//location: !1
			}).then(function(respuestaFacebook) {
				console.log(respuestaFacebook)
				if("connected" === respuestaFacebook.status){
					return n.api({
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
						console.log("error al obtener id de usuario.")
					}); 
				} else {
					console.log("facebook no retorna un estado conectado")
				}
			}, function(errr) {
				throw error;
			});
		},
		logout: function() {
			n.logout()
		},
		getDatos: function(e) {
			n.api({
				path: "/me",
				params: {
					fields: "email,name,first_name,last_name,id"
				}
			}).then(function(n) {
				var i = n.name,
					o = (n.first_name, n.last_name, n.id),
					a = (n.first_name + " " + n.last_name).trim();
				a.length > i.length && (i = a), e({
					fid: o,
					nombre: i,
					email: n.email
				}, null)
			}, function(n) {
				e(null, ErrorRed("No fué posible obtener la información de la cuenta de Facebook."))
			})
		}
	}
}]);
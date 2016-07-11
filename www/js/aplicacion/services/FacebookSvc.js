app.service("FacebookSvc", ["ngFB", function(n) {
	return n.init({
		appId: "1732222377062073"
	}), {
		autenticar: function(e) {
			return n.login({
				scope: "email,public_profile",
				location: !1
			}).then(function(i) {
				console.log(i)
				if("connected" === i.status){
					return n.api({
						path: "/me",
						params: {
							fields: "id"
						}
					})
					.then(function(respuesta){
						return {
							fb_token: i.authResponse.accessToken,
							fb_uid: respuesta.id
						}
					}, function() {
						console.log("error al obtener id de usuario.")
					}); 
				}
			}, function(n) {
				console.log("no fue posible iniciar sesion con facebook", n)
			});
		},
		cerrarSesion: function() {
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
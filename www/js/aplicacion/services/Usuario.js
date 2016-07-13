var UsuarioFactory = function(RecursosFactory,
							$localStorage){
	
	return {
		actualizarPerfil: function(usuario) {
			return RecursosFactory
			.post("/cliente", usuario)
			.then(function(response) {
				console.log("UsuarioFactory.actualizarPerfil(): ", response);
				if(response.data.success) {
					$localStorage.usuario.nombre = response.data.usuario.nombre;
					$localStorage.usuario.direccion = response.data.usuario.direccion;
					$localStorage.usuario.telefono = response.data.usuario.telefono;
					$localStorage.usuario.correo = response.data.usuario.correo;
					$localStorage.usuario.url_foto = response.data.usuario.url_foto;
					return response.data.mensaje;
				}
			}, function(err) {
				console.log("UsuarioFactory.actualizarPerfil(): ", err);
			});
		},

		setUsuario: function(usuario) {
			console.log("UsuarioFactory.setUsuario():", usuario)
			$localStorage.usuario = usuario;
		},

		getUsuario: function() {
			console.log("UsuarioFactory.getUsuario():");//, _usuario)
			return ($localStorage.usuario ? $localStorage.usuario : null);
		},

		deleteUsuario: function() {
			console.log("UsuarioFactory.deleteUsuario():");//, _usuario)			
			delete $localStorage.usuario;
		}
	};
	
};

app.factory('UsuarioFactory', UsuarioFactory);

var UsuarioFactory = function(RecursosFactory){
	var _usuario = {};
	
	return {

		actualizarPerfil: function(usuario) {
			return RecursosFactory
			.post("/cliente", usuario)
			.then(function(response) {
				console.log("UsuarioFactory.actualizarPerfil(): ", response);
				if(response.data.success) {
					_usuario = response.data.usuario;
					return response.data.mensaje;
				}
			}, function(err) {
				console.log("UsuarioFactory.actualizarPerfil(): ", err);
			});
		},

		setUsuario: function(usuario) {
			console.log("UsuarioFactory.setUsuario():", usuario)
			_usuario = usuario;
		},

		getUsuario: function() {
			console.log("UsuarioFactory.getUsuario():");//, _usuario)
			return _usuario;
		}
	};
	
};

app.factory('UsuarioFactory', UsuarioFactory);

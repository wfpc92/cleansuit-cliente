var UsuarioFactory = function(RecursosFactory){
	var _usuario = {};

	var setUser = function(user_data) {
		window.localStorage.starter_facebook_user = JSON.stringify(user_data);
	};

	var getUser = function(){
		return JSON.parse(window.localStorage.starter_facebook_user || '{}');
	};


	var usuario = {
		nombre : 'Dany Alejandro',
		apellidos : 'Cabrera Bolaños',
		direccion : {
			departamento : 'Cundinamarca',
			ciudad : 'Bogotá',
			residencia: 'Carrera 9 # 18N-343 Apto 301'
		},
		telefono: '3005757050',
		email: 'danyalejandro@gmail.co',
		fotoPerfil: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8h8h9zqj1xg5bGwGMuXTBnqI_52j9i5i_XrUj2oOcvpiKPmm__REQu9o',
	};
	
	return {
		guardarInformacion : function(formData, cllbck) {
			if(formData.contrasenaModificada){
				usuario.contrasena = formData.contrasena;
			}
			cllbck();
			//resource.$post() guardar en el servidor
		},

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
			console.log("UsuarioFactory.getUsuario():", _usuario)
			return _usuario;
		}
	};
	
};

app.factory('UsuarioFactory', UsuarioFactory);

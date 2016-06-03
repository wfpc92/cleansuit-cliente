app.factory('UsuarioFactory',[function(){
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
		getUsuario: function() {
			return usuario
		},
		guardarInformacion : function(formData, cllbck) {
			if(formData.contrasenaModificada){
				usuario.contrasena = formData.contrasena;
			}
			cllbck();
			//resource.$post() guardar en el servidor
		},
		setUser : setUser,
		getUser: getUser
	};
	
}])
app.factory('UsuarioFactory',[function(){
	return {
		getUsuario: {
			nombre : 'Dany Alejandro',
			apellidos : 'Cabrera Bolaños',
			direccion : {
				departamento : 'Cundinamarca',
				ciudad : 'Bogotá',
				envio: 'Carrera 9 # 18N-343 Apto 301'
			},
			telefono: '300 5757050',
			fotoPerfil: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8h8h9zqj1xg5bGwGMuXTBnqI_52j9i5i_XrUj2oOcvpiKPmm__REQu9o',
		}
	};
	
}])
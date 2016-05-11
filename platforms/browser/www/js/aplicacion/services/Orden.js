app.factory('OrdenFactory',[function(){
	return {
		orden : {
			direccionRecoleccion: {
				direccion: '',
				hora:''
			},
			direccionEntrega : {
				direccion: '',
				hora:''
			},
			formaPago : '',
			telefono: '',
			terminosCondiciones : false
		},

		formularioCompleto : function(){
			return true;
		}
	};

}])
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
			telefono: ''
		},

		formularioCompleto : function(){
			return true;
		}
	};

}])
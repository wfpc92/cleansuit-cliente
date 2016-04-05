app.factory('OrdenFactory',[function(){
	return {
		orden : {
			direccionRecoleccion: {
				direccion: '',
				hora:''
			},
			direccionEntrega : {
				direccion:'',
				hora:''
			},
			formaPago : '',
		},

		formularioCompleto : function(){
			return true;
		}
	};

}])
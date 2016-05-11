app.factory('RealizarOrdenFactory',['HistorialOrdenFactory',
								'EstadosFactory',
								'OrdenFactory',
								'CarritoFactory',
								'UsuarioFactory',
								function(HistorialOrdenFactory, EstadosFactory, OrdenFactory, CarritoFactory, UsuarioFactory){
	return {
		realizarOrden : function(){
			//aqui se envia la informacion al servidor
			OrdenFactory.orden.usuario = UsuarioFactory.getUsuario();
			
			HistorialOrdenFactory.ordenesEnProceso.push({
				id: HistorialOrdenFactory.ordenes.length + 1,
				fecha: new Date(),
				codigo: 'A3025',
				estado: EstadosFactory.estados[0],
				orden: OrdenFactory.orden,
				items: CarritoFactory.items
			});		
			
			CarritoFactory.items = [];
			CarritoFactory.limpiar();
		},
		ultimaOrden: function(){
			return HistorialOrdenFactory.ordenesEnProceso[HistorialOrdenFactory.ordenesEnProceso.length - 1];
		}
	};
}])
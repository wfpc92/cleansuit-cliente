app.factory('RealizarOrdenFactory',['HistorialOrdenFactory',
								'EstadosFactory',
								'OrdenFactory',
								'CarritoFactory',
								function(HistorialOrdenFactory, EstadosFactory, OrdenFactory, CarritoFactory){
	return {
		realizarOrden : function(){
			//aqui se envia la informacion al servidor
			HistorialOrdenFactory.ordenesEnProceso.push({
				id:HistorialOrdenFactory.ordenes.length+1,
				fecha: new Date(),
				codigo: 'A3025',
				estado: EstadosFactory.estados[0],
				orden: OrdenFactory.orden,
				items: CarritoFactory.items
			});		
			
			CarritoFactory.items = [];
			CarritoFactory.limpiar();
		}
	};
}])
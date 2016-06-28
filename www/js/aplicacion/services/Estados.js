var EstadosFactory = function(){
	return {
		//estados de la orden: 
		//'nueva','rutaRecoleccion','recolectada', 'rutaEntrega', 'entregada', 'cancelada'
		estados : [
			{id: 'nueva', titulo:'Validando Datos'},
			{id: 'rutaRecoleccion', titulo:'En ruta de recolección'},
			{id: 'recolectada', titulo:'En Procesamiento'},
			{id: 'rutaEntrega', titulo:'En ruta de Entrega'},
			{id: 'entregada', titulo:'Entregado'},
			{id: 'cancelada', titulo:'En ruta de Entrega'},
		]
	};
};

app.factory('EstadosFactory', EstadosFactory);

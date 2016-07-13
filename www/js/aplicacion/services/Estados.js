var EstadosFactory = function(){
	return {
		//estados de la orden: 
		//'nueva','rutaRecoleccion','recolectada', 'rutaEntrega', 'entregada', 'cancelada'
		estados : [
			{id: 'nueva', titulo:'Validando datos'},
			{id: 'rutaRecoleccion', titulo:'En ruta de recolección'},
			{id: 'recolectada', titulo:'En procesamiento'},
			{id: 'rutaEntrega', titulo:'En ruta de entrega'},
			{id: 'entregada', titulo:'Entregado'},
			{id: 'cancelada', titulo:'En ruta de entrega'},
		]
	};
};

app.factory('EstadosFactory', EstadosFactory);

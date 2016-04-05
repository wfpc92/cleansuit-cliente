app.factory('EstadosFactory',[function(){
	return {
		estados : [
			{titulo:'En ruta de recolección'},
			{titulo:'En Procesamiento'},
			{titulo:'En ruta de Entrega'},
			{titulo:'Entregado'}
		]
	};
}])
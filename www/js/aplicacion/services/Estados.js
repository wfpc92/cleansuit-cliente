var EstadosFactory = function(CarritoFactory){
	
	//mejora: traer desde servidor con RecursosFactory
	var _estadosParaUsuario = [
		{id: ['nueva'], titulo:'Validando datos', titulo2: 'orden nueva'},
		{id: ['rutaRecoleccion'], titulo:'En ruta de recolección', titulo2: 'orden en recoleccion'},
		{id: ['recolectada', 'procesando'], titulo:'En procesamiento', titulo2: 'orden recolectada'},
		{id: ['rutaEntrega'], titulo:'En ruta de entrega', titulo2: 'orden en entrega'},
		{id: ['entregada'], titulo:'Entregado', titulo2: 'orden entregada'},
		{id: ['cancelada'], titulo:'Cancelada', titulo2: 'orden cancelada'},
	];
	
	return {
		//estados de la orden: 
		estados : function(orden) {
			var estados = _estadosParaUsuario.slice(0);

			if(orden.items && CarritoFactory.soloHayProductos(orden.items)) {
				estados = [_estadosParaUsuario[0],_estadosParaUsuario[3],_estadosParaUsuario[4],_estadosParaUsuario[5]];
			} 

			return estados;
		},

		posEstadoOrden: function(orden) {
			var estados = this.estados(orden);
			//orden.estado corresponde a id en estados[i].id
			for (var i in estados ){
				for (var j in estados[i].id){
					if(estados[i].id[j] == orden.estado) {
						return i;
					}
				}
			}
			return 0;
		}
	};
};

app.factory('EstadosFactory', EstadosFactory);

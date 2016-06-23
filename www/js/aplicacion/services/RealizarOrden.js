var RealizarOrdenFactory = function(HistorialOrdenFactory, 
									EstadosFactory,
									OrdenFactory,
									CarritoFactory,
									UsuarioFactory,
									RecursosFactory){
	return {
		realizarOrden : function() { 
			console.log("RealizarOrdenFactory.realizarOrden(): ")
			
			//aqui se envia la informacion al servidor
			//OrdenFactory.orden.usuario = UsuarioFactory.getUsuario();
			
			var orden = {
				cliente_id: '5769837fb99937214ac2ebe2',
				orden: OrdenFactory.orden,
				items: CarritoFactory.items
			};		
			
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				console.log("RealizarOrdenFactory.realizarOrden(): ", response);

				CarritoFactory.items = [];
				CarritoFactory.limpiar();
			}, function(err) {
				console.log("RealizarOrdenFactory.realizarOrden(): ", err);
			})
		},
		ultimaOrden: function(){
			return HistorialOrdenFactory.ordenesEnProceso[HistorialOrdenFactory.ordenesEnProceso.length - 1];
		}
	};
};

app.factory('RealizarOrdenFactory' , RealizarOrdenFactory);
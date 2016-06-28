var RealizarOrdenFactory = function(HistorialOrdenFactory, 
									EstadosFactory,
									OrdenFactory,
									CarritoFactory,
									UsuarioFactory,
									RecursosFactory){
	var _orden = null;

	return {
		realizarOrden : function() { 
			console.log("RealizarOrdenFactory.realizarOrden(): ")
			
			//aqui se envia la informacion al servidor
			//OrdenFactory.orden.usuario = UsuarioFactory.getUsuario();
			
			var orden = {
				orden: OrdenFactory.orden,
				items: CarritoFactory.items
			};		
			
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				console.log("RealizarOrdenFactory.realizarOrden(): ", response);
				_orden = response.data.orden;
				CarritoFactory.items = [];
				CarritoFactory.limpiar();
			}, function(err) {
				console.log("RealizarOrdenFactory.realizarOrden(): ", err);
			});
		},
		getOrden: function(){
			return _orden;
		}
	};
};

app.factory('RealizarOrdenFactory' , RealizarOrdenFactory);
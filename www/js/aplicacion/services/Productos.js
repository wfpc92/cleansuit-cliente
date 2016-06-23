var ProductosFactory = function(RecursosFactory){

	var _productos = [];

	return {
		getProductos : function() {
			return _productos;
		},

		//carga una lista de productos desde el servidor
		cargar: function() {
			return RecursosFactory
			.get('/productos', {})
			.then(function(respuesta) {
				console.log(respuesta)
				console.log("....................###################3.................");
				console.log("imprimiendo respuesta", JSON.stringify(respuesta));
				if(!respuesta.error){
					_productos = respuesta.data;
				} else {
					//error(respuesta.error);
				}
			});
		}
	};
};

app.factory('ProductosFactory', ProductosFactory);

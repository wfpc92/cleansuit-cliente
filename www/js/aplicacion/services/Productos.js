var ProductosFactory = function(RecursosFactory,
							$localStorage){
	
	var setProductos = function(productos) {
		for (var i in $localStorage.productos) {
			delete $localStorage.productos[i];
		}
		
		for (var i in productos) {
			$localStorage.productos[i] = productos[i];
		}
	};

	if (!$localStorage.productos) {
		$localStorage.productos = [];
	}
	
	return {
		productos : $localStorage.productos,

		//carga una lista de productos desde el servidor
		cargar: function() {
			return RecursosFactory
			.get('/productos', {})
			.then(function(respuesta) {
				console.log("ProductosFactory.cargar()", respuesta);
				if(respuesta){
					setProductos(respuesta.data.productos);
				} 
			});
		}
	};
};

app.factory('ProductosFactory', ProductosFactory);

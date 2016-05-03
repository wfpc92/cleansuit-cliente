app.factory('ProductosFactory', ['RecursosFactory', function(RecursosFactory){

	var _productos = [];
		
		//[{"_id":"5718ff8e7600548d455ac2bf","foto_url":"http://img.directindustry.es/images_di/photo-g/25365-3310609.jpg","publicado":true,"precio":26000,"desc_larga":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas iaculis ac tortor sit amet suscipit. Phasellus sollicitudin, leo vel congue elementum, nisl mauris porttitor eros, quis gravida augue ante eget urna. Ut nisi tellus, blandit sed pulvinar ac, porttitor id lacus. Nullam diam ligula, venenatis a ultrices quis, varius eget mauris. Maecenas elit ipsum, iaculis sit amet arcu et, tristique condimentum sem. Integer id elit fermentum, vehicula metus ut, eleifend tortor. Aliquam ante mi, venenatis ut massa pulvinar, euismod posuere velit. In luctus tortor vel commodo fringilla. Praesent commodo mauris ac neque auctor, sit amet luctus neque laoreet. Nulla ultricies sapien ipsum, tempor ultricies nunc consequat dictum. Fusce nisi lectus, iaculis a pharetra a, scelerisque sed dui. Donec laoreet non ipsum vestibulum lacinia. Nulla leo ligula, lacinia vitae porttitor quis, condimentum et risus. Sed id diam eu urna viverra pharetra.","desc_corta":"Descripción corta del producto 1.","nombre":"Producto 1","__v":0}]
		
		/*[
			{'id':'1','nombre':'Producto uno', 'descripcion':'Esta es una descripcion del producto','precio': 10000,'detalles':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{'id':'2','nombre':'Producto dos', 'descripcion':'Esta es una descripcion del producto','precio': 12000,'detalles':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{'id':'3','nombre':'Producto tres', 'descripcion':'Esta es una descripcion del producto','precio': 25000,'detalles':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{'id':'4','nombre':'Producto cuatro', 'descripcion':'Esta es una descripcion del producto','precio': 2500,'detalles':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{'id':'5','nombre':'Producto cinco', 'descripcion':'Esta es una descripcion del producto','precio': 35000,'detalles':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{'id':'6','nombre':'Producto seis', 'descripcion':'Esta es una descripcion del producto','precio': 10200,'detalles':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
		];*/
	return {
		getProductos : function() {
			return _productos;
		},

		//carga una lista de productos desde el servidor
		cargar: function(callback) {
			RecursosFactory.get('/productos', {}, function(respuesta) {
				console.log("imprimiendo respuesta");
				console.log(respuesta);
				if(!respuesta.error){
					_productos = respuesta.data;
				}
				callback(respuesta.error);	
			});
		}
	};
}])
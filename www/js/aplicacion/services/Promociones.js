app.factory('PromocionesFactory',[function(){
	var _promociones = [
			{'id':'1', imagen_url: 'http://hygieneshopping.com/WebRoot/StoreES3/Shops/ec5024/MediaGallery/Cupones_Descuento/cupon_dorado_10_8364_.jpg'},
			{'id':'2', imagen_url: 'https://regalosymuestrasgratis.com/wp-content/uploads/2011/02/cupones-descuento-opencor.jpg'},
			{'id':'3', imagen_url: 'http://hygieneshopping.com/WebRoot/StoreES3/Shops/ec5024/MediaGallery/Cupones_Descuento/cupon_dorado_10_8364_.jpg'},
			{'id':'4', imagen_url: 'https://regalosymuestrasgratis.com/wp-content/uploads/2011/02/cupones-descuento-opencor.jpg'}
		] ;

	return {
		getPromociones: function() {
			return _promociones;
		},

		//carga lista de promociones desde el servidor
		cargar: function(callback) {
			RecursosFactory.get('/promociones', {}, function(respuesta) {
				console.log("imprimiendo respuesta");
				console.log(respuesta);
				if(!respuesta.error){
					_promociones = respuesta.data;
				}
				callback(respuesta.error);	
			});
		}
	};
}])
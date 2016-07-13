var FotosFactory = function($cordovaCamera) {
	
	var seleccionarFoto = function() {
		var opciones = {
			sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
			quality: 75,
			targetWidth: 310,
			targetHeight: 310,
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			destinationType: Camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: !0
		};

		return $cordovaCamera
		.getPicture(opciones)
		.then(function(imageData) {
			return imageData;
		}, function(err) {
			// error
			console.log("FotosFactory.obtenerFoto(), err", err)
		});
	};

	return {
		seleccionarFoto: seleccionarFoto
	};
};

app.factory("FotosFactory", FotosFactory);
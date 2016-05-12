var CargarScriptsFactory = function(angularLoad) {
	var recursos = {
		googleMaps: false
	};

	return { 
		cargarGoogleMaps : function(callback, error) {
			var self = this;
			if(!recursos.googleMaps) {
				console.log("cargando Script google maps...")
				angularLoad.loadScript('https://maps.googleapis.com/maps/api/js').then(function () {
					console.log("exito script google maps.")
					recursos.googleMaps = true;
					if(callback) {
						callback();
					}	
				}).catch(function () {
					console.log("error script google maps.");
					recursos.googleMaps = false;
					if(error) {
						error();
					}
				});
			}
			else {
				console.log("Script google maps ya ha sido cargado.")
			}
		}
	};
};

app.factory("CargarScriptsFactory", ['angularLoad', CargarScriptsFactory]);

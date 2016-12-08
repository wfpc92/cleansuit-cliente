
var Interceptor = function ($rootScope, $q, $log, AUTH_EVENTS, APP_EVENTS) {
	// eventos que son llamados para cierto status de red.
	var statusEvents = {
		"106": APP_EVENTS.noAccesoServidor,	
		"401": AUTH_EVENTS.noAutenticado,
		"403": AUTH_EVENTS.noAutorizado,
		"404": APP_EVENTS.servidorNoEncontrado,
		"500": APP_EVENTS.servidorNoEncontrado,
		"501": APP_EVENTS.servidorNoEncontrado,
		"502": APP_EVENTS.servidorNoEncontrado,
		"503": APP_EVENTS.servidorNoEncontrado,
	};
	
	return {
		responseError: function (response) {
			$log.log("Interceptor.responseError()");
			$log.log(JSON.stringify(response));
			
			if(response.status == 0) {
				response.status = "106";
			}

			$rootScope.$broadcast(statusEvents[response.status], response);
		  	return $q.reject(response);
		}
	};
};

app.factory('Interceptor', Interceptor);

var RecursosFactory = function($log, $http, API_ENDPOINT, APP_EVENTS, $rootScope) {
	var self = this;
	this.$log = $log;
	this.$http = $http;
	this._apiUrl = API_ENDPOINT.url;	
	
	$log.debug("Contructor de RecursosApi");

	this.solicitud = function(metodo, recurso, getParams, postParams) {
		
		console.log("solicitud para consumir servicio de api cleansuit");

		var requestConfig = {
			url: self._apiUrl + recurso, 
			method: metodo,
			params: getParams,
			data: postParams
		};
		return self.solicitudHttp(requestConfig);
	}

	this.solicitudHttp = function(requestConfig, callback) {
		var self = this;
		this.respuesta = {
			data : null,
			error : null
		};

		console.log("RecursosFactory.requestConfig: ", JSON.stringify(requestConfig))
		return $http(requestConfig);
	};

	return {
		get: function(recursos, params) {
			return self.solicitud("GET", recursos, params, {});	
		},
		post: function(recursos, params) {
			return self.solicitud("POST", recursos, {}, params);	
		}
	};
};


app.factory("RecursosFactory", RecursosFactory);

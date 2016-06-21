var RecursosFactory = function($log, $http) {
	
	//$http.defaults.headers.common.Authorization = 'login YmVlcDpi' ;
	//or try this
	//$http.defaults.headers.common['Auth-Token'] = 'login YmVlcDpi';
	//
	//'Access-Control-Allow-Origin': '*',
    //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    //'X-Random-Shit':'123123123'
    /*$http.defaults.useXDomain = true;
	$http.defaults.withCredentials = true;
	delete $http.defaults.headers.common["X-Requested-With"];
	$http.defaults.headers.common["Accept"] = "application/json";
	$http.defaults.headers.common["Content-Type"] = "application/json";
	$http.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
	$http.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS";
	$http.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With";*/

	var self = this;
	this.$log = $log;
	this.$http = $http;
	//development:
	//this._apiUrl = "/api";	
	//production:
	this._apiUrl = "http://api.cleansuit.co";
	
	$log.debug("Contructor de RecursosApi");

	this.solicitud = function(metodo, recurso, getParams, postParams, callback) {
		
		console.log("solicitud para consumir servicio de api cleansuit");

		var requestConfig = {
			url: self._apiUrl + recurso, 
			method: metodo,
			params: getParams,
			headers: {
				/*'Access-Control-Allow-Origin': '*',
	    		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	    		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
	    		'Content-Type' : 'application/json; charset=utf-8',
	    		'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*;q=0.8',
	    		'Accept-Language':'es-419,es;q=0.8',
				'Cache-Control':'max-age=0',
				'Upgrade-Insecure-Requests':'1'*/
			}
		};
		self.solicitudHttp(requestConfig, callback);
	}

	this.solicitudHttp = function(requestConfig, callback) {
		var self = this;
		this.respuesta = {
			data : null,
			error : null
		};

		console.log("requestConfig: ", JSON.stringify(requestConfig))

		this.$http(requestConfig).then(function(respuestaServidor) {
				// Consulta exitosa: Se obtuvo respuesta por parte del servidor
				console.log("se obtuvo una respuesta desde el servidor.")
				for(var i = 0; i<= 10; i++){
					console.log("... "+ i)
				}
				
				console.log(JSON.stringify(respuestaServidor));
				
				if (respuestaServidor && respuestaServidor.data) {
					self.respuesta.data = respuestaServidor.data;
					//callback(data, null);
					
					/*if (typeof data == 'object') {
						if (data.success) {
							callback(data, null);
						}
						else {
							/*var msgError = recurso + ": La solucitud no fué exitosa";
							if (respuesta.data.mensaje) {
								msgError += ": " + respuesta.data.mensaje;
							}
							e = ErrorRed(msgError);*/
						/*}
					}
					else {
						//e = ErrorRed(recurso + ": El servidor no respondió con un objeto JSON válido.");
						console.log("error no respondio con objeto json valido")
					}*/
				}
				else {
					//e = ErrorRed(recurso + ": La solucitud retornó una respuesta vacía.");
					self.respuesta.error = "Respuesta vacia";
					console.log("respuesta vacia.")
				}
				callback(self.respuesta);
				// Si ocurrió un error, reportarlo y regresar
				/*if (e) {
					e.status = respuesta.status;
					e.imprimir();
					callback(null, e);
				}*/
				
			},
			function(respuesta) {
				// No se pudo realizar la consulta
				/*var status = respuesta.status;
				e = ErrorRed(recurso + ": La solicitud HTTP falló: ErrorRed " + status + ": " + respuesta.statusText);
				e.status = status;
				e.imprimir();
				callback(null, e);*/
				console.log("Respuesta desde $http: ", JSON.stringify(respuesta));
				self.respuesta.error = respuesta;
				callback(self.respuesta);
			});
	};

	return {
		get: function(recursos, getParams, callback) {
			self.solicitud("GET", recursos, getParams, {}, callback);	
		},
		post: function() {

		}
	};
};


app.factory("RecursosFactory", RecursosFactory);

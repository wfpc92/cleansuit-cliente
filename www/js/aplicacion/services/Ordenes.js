var OrdenesFactory = function(UsuarioFactory,
							CarritoFactory,
							RecursosFactory){
	var _orden = null, 
		_ultimaOrden = null,
		_ordenesEnProceso = [],
		_historialOrdenes = [];
	
	function nuevaOrden() {
		_orden = {
			recoleccion: {
				direccion: '',
				posicion:'',
				fecha: null,
				hora:''
			},
			entrega : {
				direccion: '',
				posicion:'',
				fecha: null,
				hora:''
			},
			formaPago : '',
			telefono: '',
			abono: '',
			cupon: '',
			terminosCondiciones : false
		};
		
		_orden.recoleccion.direccion = UsuarioFactory.getUsuario().direccion;
		_orden.entrega.direccion = UsuarioFactory.getUsuario().direccion;
		_orden.telefono = UsuarioFactory.getUsuario().telefono;
	};

	return {
		
		getOrden: function() {
			if(!_orden) {
				nuevaOrden();
			}
			return _orden;
		},

		getUltimaOrden: function() {
			return _ultimaOrden;
		},

		enviarOrden : function() { 
			console.log("OrdenFactory.enviarOrden(): ");	
			var self = this, orden = {
				orden: _orden,
				items: CarritoFactory.items
			};
			orden.orden.servicioDirecto = CarritoFactory.servicioDirecto;	
			orden.orden.totales = CarritoFactory.totales;		
			
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				console.log("OrdenesFactory.realizarOrden(): ", response);
				self.limpiarOrden();
				_ultimaOrden = response.data.orden;

			}, function(err) {
				console.log("OrdenesFactory.realizarOrden(): ", err);
			});
		},
		
		cargarOrdenesEnProceso: function() {
			console.log("Enviando peticion GET a servidor para obtener ordenes en proceso.")
			return RecursosFactory
			.get('/ordenes/en-proceso', {})
			.then(function(respuesta) {
				if(respuesta) {
					console.log("Finaliza peticion GET a servidor para ordenes en proceso.")
					console.log("OrdenesFactory.cargarOrdenesEnProceso()", respuesta)
					_ordenesEnProceso = respuesta.data.ordenes;
				} else {
					console.log("OrdenesFactory.cargarOrdenesEnProceso(): no hay respuesta del servidor");
				}
			});
		},

		cargarHistorialOrdenes: function() {
			console.log("Enviando peticion GET a servidor para obtener historial de ordenes.")
			return RecursosFactory
			.get('/ordenes/historial', {})
			.then(function(respuesta) {
				if(respuesta) {
					console.log("Finaliza peticion GET a servidor para historial de ordenes.")
					console.log("OrdenesFactory: ", respuesta)
					_historialOrdenes = respuesta.data.ordenes;
				} else {
					console.log("OrdenesFactory.cargarHistorial(): no hay respuesta del servidor");
				}
			});
		},
		
		getOrdenesEnProceso: function() {
			return _ordenesEnProceso;
		},

		getHistorialOrdenes: function() {
			return _historialOrdenes;
		},

		limpiarOrden: function() {
			orden = null;
			CarritoFactory.vaciar();
		}
	};

};

app.factory('OrdenesFactory', OrdenesFactory);

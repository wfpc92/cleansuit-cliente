var OrdenesFactory = function(CarritoFactory,
							RecursosFactory){
	var _orden = {
		recoleccion: {
			direccion: '',
			posicion:'',
			fecha: new Date(),
			hora:''
		},
		entrega : {
			direccion: '',
			posicion:'',
			fecha: new Date(),
			hora:''
		},
		formaPago : '',
		telefono: '',
		terminosCondiciones : false
	};
	
	var _ordenesEnProceso	= [];
	var _historialOrdenes = [];
	
	return {
		
		orden: _orden,

		enviarOrden : function() { 
			console.log("OrdenFactory.enviarOrden(): ");			
			var orden = {
				orden: _orden,
				items: CarritoFactory.items
			};		
			
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				console.log("OrdenesFactory.realizarOrden(): ", response);
				_orden = response.data.orden;
				CarritoFactory.items = [];
				CarritoFactory.limpiar();
			}, function(err) {
				console.log("OrdenesFactory.realizarOrden(): ", err);
			});
		},
		
		cargarOrdenesEnProceso: function() {
			console.log("Enviando peticion GET a servidor para obtener ordenes en proceso.")
			return RecursosFactory
			.get('/ordenes/en-proceso', {})
			.then(function(respuesta) {
				console.log("Finaliza peticion GET a servidor para ordenes en proceso.")
				console.log("OrdenesFactory.cargarOrdenesEnProceso()", respuesta)
				if(!respuesta.error){
					_ordenesEnProceso = respuesta.data.ordenes;
				} else {
					console.log("OrdenesFactory.cargar()", respuesta.error);
				}
			});
		},

		cargarHistorialOrdenes: function() {
			console.log("Enviando peticion GET a servidor para obtener historial de ordenes.")
			return RecursosFactory
			.get('/ordenes/historial', {})
			.then(function(respuesta) {
				console.log("Finaliza peticion GET a servidor para historial de ordenes.")
				console.log("OrdenesFactory: ", respuesta)
				if(!respuesta.error){
					_historialOrdenes = respuesta.data.ordenes;
				} else {
					console.log("OrdenesFactory.cargarHistorial()", respuesta.error);
				}
			});
		},
		
		getOrdenesEnProceso: function() {
			return _ordenesEnProceso;
		},

		getHistorialOrdenes: function() {
			return _historialOrdenes;
		},
	};

};

app.factory('OrdenesFactory', OrdenesFactory);

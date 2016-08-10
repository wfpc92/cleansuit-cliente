var OrdenesFactory = function(CarritoFactory,
							RecursosFactory){
	var _orden = {}, 
		_ultimaOrden = {},
		_ordenesEnProceso = [],
		_historialOrdenes = [];
	
	nuevaOrden();

	function nuevaOrden() {
		var ahora = new Date();
		//var ahora = new Date(2016, 7, 9, 21, 00, 0, 0); //para probar varas fechas
		var unaHoraDespues = new Date(ahora.getTime() + (60 * 60 * 1000));
			
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
			terminosCondiciones : false
		};
 
		
		if(unaHoraDespues.getHours() < 22) {
			_orden.recoleccion.fecha = ahora;
			console.log("son menos de las 10");
		} else {
			//como se pasa de las 10 de la noche la fecha de recoleccion debe ser un dia despues.
			_orden.recoleccion.fecha = new Date(ahora.getTime() + (24 * 3600 * 1000));
			console.log("son mas de las 10")
		} 
		console.log("recoleccion.fecha", _orden.recoleccion.fecha)

		CarritoFactory.vaciar();
	};

	return {
		
		getOrden: function() {
			return _orden;
		},

		getUltimaOrden: function() {
			return _ultimaOrden;
		},

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
				nuevaOrden();
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
	};

};

app.factory('OrdenesFactory', OrdenesFactory);

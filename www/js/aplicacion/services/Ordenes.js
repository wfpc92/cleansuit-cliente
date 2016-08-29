var OrdenesFactory = function(UsuarioFactory,
							CarritoFactory,
							RecursosFactory,
							$localStorage){
	var _orden = null, 
		_ultimaOrden = null;

	var setOrdenesEnProceso = function(ordenesEnProceso) {
		for (var i in $localStorage.ordenesEnProceso) {
			delete $localStorage.ordenesEnProceso[i];
		}
		
		for (var i in ordenesEnProceso) {
			$localStorage.ordenesEnProceso[i] = ordenesEnProceso[i];
		}
	};

	var setHistorialOrdenes = function(historialOrdenes) {
		for (var i in $localStorage.historialOrdenes) {
			delete $localStorage.historialOrdenes[i];
		}
		
		for (var i in historialOrdenes) {
			$localStorage.historialOrdenes[i] = historialOrdenes[i];
		}
	};

	if (!$localStorage.ordenesEnProceso) {
		$localStorage.ordenesEnProceso = [];
	}
	
	if (!$localStorage.historialOrdenes) {
		$localStorage.historialOrdenes = [];
	}
	

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
		ordenesEnProceso: $localStorage.ordenesEnProceso,

		historialOrdenes: $localStorage.historialOrdenes,

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
			var self = this, orden = {
				orden: _orden,
				items: CarritoFactory.items
			};
			orden.orden.servicioDirecto = CarritoFactory.servicioDirecto;	
			orden.orden.totales = CarritoFactory.totales;		
			
			console.log("OrdenFactory.enviarOrden(): ", orden);	
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				console.log("OrdenesFactory.realizarOrden(): ", response);
				self.limpiarOrden();
				_ultimaOrden = response.data.orden;

			});
		},
		
		cargarOrdenesEnProceso: function() {
			return RecursosFactory
			.get('/ordenes/en-proceso', {})
			.then(function(respuesta) {
				console.log("OrdenesFactory.cargarOrdenesEnProceso()", respuesta)
				if(respuesta.data.success) {
					setOrdenesEnProceso(respuesta.data.ordenes);
				}
			});
		},

		cargarHistorialOrdenes: function() {
			return RecursosFactory
			.get('/ordenes/historial', {})
			.then(function(respuesta) {
				console.log("OrdenesFactory.cargarOrdenesEnProceso()", respuesta)
				if(respuesta.data.success) {
					setHistorialOrdenes(respuesta.data.ordenes);
				}
			});
		},
		
		limpiarOrden: function() {
			orden = null;
			CarritoFactory.vaciar();
		}
	};

};

app.factory('OrdenesFactory', OrdenesFactory);

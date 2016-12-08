var OrdenesFactory = function(UsuarioFactory,
							CarritoFactory,
							RecursosFactory,
							$localStorage,
							$log){
	var _orden = null, 
		_ultimaOrden = null;

	var init = function() {
		$localStorage.ordenesEnProceso = $localStorage.ordenesEnProceso || [];
		$localStorage.historialOrdenes = $localStorage.historialOrdenes || [];	
	};

	var setOrdenesEnProceso = function(ordenesEnProceso) {
		init();

		for (var i in $localStorage.ordenesEnProceso) {
			delete $localStorage.ordenesEnProceso[i];
		}
		
		for (var i in ordenesEnProceso) {
			$localStorage.ordenesEnProceso[i] = ordenesEnProceso[i];
		}
	};

	var setHistorialOrdenes = function(historialOrdenes) {
		init();

		for (var i in $localStorage.historialOrdenes) {
			delete $localStorage.historialOrdenes[i];
		}
		
		
		for (var i in historialOrdenes) {
			$localStorage.historialOrdenes[i] = historialOrdenes[i];
		}
	};

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

	init();

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
			
			$log.debug("OrdenFactory.enviarOrden(): ", orden);	
			return RecursosFactory
			.post("/ordenes", orden)
			.then(function(response) {
				$log.debug("OrdenesFactory.realizarOrden(): ", response);
				self.limpiarOrden();
				_ultimaOrden = response.data.orden;
				self.cargarOrdenesEnProceso();
			});
		},
		
		cargarOrdenesEnProceso: function() {
			return RecursosFactory
			.get('/ordenes/en-proceso', {})
			.then(function(respuesta) {
				$log.debug("OrdenesFactory.cargarOrdenesEnProceso()", respuesta)
				if(respuesta.data.success) {
					setOrdenesEnProceso(respuesta.data.ordenes);
				}
			});
		},

		cargarHistorialOrdenes: function() {
			return RecursosFactory
			.get('/ordenes/historial', {})
			.then(function(respuesta) {
				$log.debug("OrdenesFactory.cargarOrdenesEnProceso()", respuesta)
				if(respuesta.data.success) {
					setHistorialOrdenes(respuesta.data.ordenes);
				}
			});
		},
		
		limpiarOrden: function() {
			/*
			//_orden.recoleccion.direccion: '';
			_orden.recoleccion.posicion = '';
			_orden.recoleccion.fecha = null;
			_orden.recoleccion.hora = '';
			
			//_orden.entrega.direccion: '';
			_orden.entrega.posicion = '';
			_orden.entrega.fecha = null;
			_orden.entrega.hora = '';
			
			_orden.formaPago = '';
			//_orden.telefono: '';
			_orden.abono = '';
			_orden.cupon = '';
			_orden.terminosCondiciones = false;
			*/
			_orden = null;
			CarritoFactory.vaciar();
		}
	};

};

app.factory('OrdenesFactory', OrdenesFactory);

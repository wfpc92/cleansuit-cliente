var CarritoFactory = function(RecursosFactory, 
							PromocionesFactory, 
							$log, 
							ConfiguracionesFactory){
	/**
	 * [this.items ]
	 * @type [{Object id:String producto o servicio
	 *		tipo:String "PRODUCTO" o "SERVICIO"
	 *		cantidad:Number cantidad agregada}]
	 */
	
	return {
		items: {},

		servicioDirecto: false,

		domicilio: 0,

		contProductos: 0,

		contServicios: 0,

		totales: {},

		hayItems : function(){
			var cont = 0; 
			for(var i in this.items){
				cont += 1;
			}
			return ((cont > 0) ? true : false) || this.servicioDirecto;
		},

		/**
		 * agregar un item a la lista de items del carrito
		 * @param  {object} item item de producto o servicio
		 * @param  {string} tipo      'PRODUCTO' o 'SERVICIO'
		 * @param  {int} cantidad  cantidad que se adiciona al carrito 
		 * @return {void}
		 */
		agregar : function(item, tipo, cantidad){
			//$log.debug("CarritoFactory.agregar()", item, tipo, cantidad);
			if(!item){ return; }
			//existe el item en el carrito de compra, aumentar cantidad
			if(typeof this.items[item._id] !== 'undefined'){
				this.items[item._id].cantidad += cantidad;
			}
			//no existe hay que agregarlo al carrito de compras
			else {
				//$log.debug("no existe el item... creando")
				this.items[item._id] = item;
				this.items[item._id].tipo = tipo;
				this.items[item._id].cantidad = cantidad;
			}
			
			this.actualizarContadores();
			this.calcularTotales();
		},

		disminuir : function(item, tipo, cantidad){
			//$log.debug("CarritoFactory.disminuir()", item, tipo, cantidad);
			//existe el item en el carrito de compra, disminuri cantidad
			if(typeof this.items[item._id] !== 'undefined'){
				this.items[item._id].cantidad -= cantidad;
				if(this.items[item._id].cantidad <= 0){
					this.items[item._id].cantidad = 0;
				}
			}//si no existe no se hace nada

			this.actualizarContadores();
			this.calcularTotales();
		},

		cantidad: function(id) {
			return (typeof this.items[id] !== 'undefined') ? this.items[id].cantidad : 0;
		},

		/**
		 * [limpiar los items que tienen cantidad 0, deben ser eliminados.]
		 * @return {[type]} [description]
		 */
		limpiar : function(){//limpiar los items que no tienen cantidades.
			//$log.debug("CarritoFactory.limpiar(): antes", this.items);
			for(var i in this.items){
				if(this.items[i].cantidad == 0 ){
					delete this.items[i];
				}
			}
			//$log.debug("CarritoFactory.limpiar(): despues", this.items);
			this.actualizarContadores();
		},

		actualizarContadores : function(){
			this.contProductos = 0;
			this.contServicios = 0;
			//$log.debug("CarritoFactory.actualizarContadores()", this.items);
			for (var i in this.items) {
				switch(this.items[i].tipo){
					case "PRODUCTO":
						this.contProductos += this.items[i].cantidad;
						break;
					case "SUBSERVICIO":
						this.contServicios += this.items[i].cantidad;
						break;
					default:
						break;		
				}
			}

			/*if(this.contServicios > 0) {
				this.servicioDirecto = false;
			}*/
		},
		
		calcularTotales : function(){//calcular precios de total y subtotal
			var subtotal = 0, descuento = 0;			
			
			for (var idItem in this.items) {//precio * cantidad			 	
				subtotal += this.items[idItem].precio * this.items[idItem].cantidad;

				//revisar en lista de descuentos del cupon si este item aplica para descuento
				if(this.totales.promocion){
					for (var i = this.totales.promocion.servicios.length - 1; i >= 0; i--) {
						if (this.totales.promocion.servicios[i].servicio == idItem) {
							//console.log("se aplica promocion de", this.totales.promocion.servicios[i].descuento, "para servicio", this.totales.promocion.servicios[i].servicio);
							descuento += this.items[idItem].precio * this.items[idItem].cantidad * (this.totales.promocion.servicios[i].descuento / 100.0);
							break;
						}
					}
				}
			}

			this.totales.descuento = descuento !== 0 ? descuento * -1 : null;
			this.totales.domicilio = ConfiguracionesFactory.getConfiguraciones().domicilio || 0;	

			if (this.servicioDirecto) {
				this.totales.subtotal = subtotal !== 0 ? subtotal : null;
				this.totales.total = null;
			} else {
				this.totales.subtotal = subtotal;
				this.totales.total = (subtotal !== 0 ? subtotal + this.domicilio - descuento: 0);
			}

			//$log.debug("CarritoFactory.calcularTotales", this.totales)
			return this.totales;
		},

		soloHayProductos : function(items){
			var cont = 0;
			
			if (!items){
				items = this.items;
			}

			for (i in items){
				if (items[i].tipo == 'PRODUCTO'){
					cont++;
				} else {
					return false;
				}
			}
			
			return !this.servicioDirecto && (cont > 0 ? true : false);
		},

		/**
		 * [vaciar eliminiar los items del carrito]
		 * @return {[type]} [description]
		 */
		vaciar: function() {
			for (var i in this.items) {
				delete this.items[i];
			}
			this.totales.promocion = null;
			this.servicioDirecto = false;
			this.actualizarContadores();
		},

		aplicarPromocion: function(promocion) {
			//$log.debug("CarritoFactory.aplicarPromocion", promocion);
			this.totales.promocion = promocion;
			this.calcularTotales();
		}

	};
};

app.factory('CarritoFactory', CarritoFactory);

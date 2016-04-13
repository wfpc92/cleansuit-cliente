app.factory('CarritoFactory', [function(){
	return {
		domicilio: 2300,

		items: {
		//id: {
		//  producto o servicio object +
		//	tipo: "PRODUCTO" o "SERVICIO"
		//	cantidad: cantidad agregada
		//}
		},

		totales : {
			subtotal: 0,
			domicilio: 0,
			total: 0
		},

		contProductos: 0,
		contServicios: 0,

		hayItems : function(){
			var cont = 0; 
			for(var i in this.items){
				cont += 1;
			}
			if(cont>0){
				return true;
			}else{
				return false;
			}
		},

		/**
		 * agregar un item a la lista de items del carrito
		 * @param  {object} item item de producto o servicio
		 * @param  {string} tipo      'PRODUCTO' o 'SERVICIO'
		 * @param  {int} cantidad  cantidad que se adiciona al carrito 
		 * @return {void}
		 */
		agregar : function(item, tipo, cantidad){
			var nuevoItem = this.items[item.id];
			console.log("agregar item al carrito")
			console.log(item)

			//existe el item en el carrito de compra, aumentar cantidad
			if(typeof nuevoItem !== 'undefined'){
				this.items[item.id].cantidad += cantidad;
			}
			//no existe hay que agregarlo al carrito de compras
			else {
				console.log("no existe el item... creando")
				this.items[item.id] = item;
				this.items[item.id].tipo = tipo;
				this.items[item.id].cantidad = cantidad;
				console.log("items:")
				console.log(this.items)
			}
			
			this.actualizarContadores();
			this.calcularPedido();
		},

		disminuir : function(item, tipo, cantidad){
			var nuevoItem = this.items[item.id];
			console.log("disminuir item al carrito")
			console.log(item)

			//existe el item en el carrito de compra, disminuri cantidad
			if(typeof nuevoItem !== 'undefined'){
				this.items[item.id].cantidad -= cantidad;
				if(this.items[item.id].cantidad <= 0){
					this.items[item.id].cantidad = 0;
				}
			}
			//si no existe no se hace nada

			this.actualizarContadores();
			this.calcularPedido();
		},

		limpiar : function(){//limpiar los items que no tienen cantidades.
			console.log("limpiar...")
			for(var i in this.items){
				console.log(this.items[i])
				console.log("cantidad: "+this.items[i].cantidad)
				if(this.items[i].cantidad == 0 ){
					console.log("borrando... ")
					delete this.items[i];
					console.log(this.items)
				}
			}
			this.actualizarContadores();
		},

		actualizarContadores : function(){
			this.contProductos = 0;
			this.contServicios = 0;
			for (var i in this.items) {
				switch(this.items[i].tipo){
					case "PRODUCTO":
						this.contProductos += this.items[i].cantidad;
						break;
					case "SERVICIO":
						this.contServicios += this.items[i].cantidad;
						break;
					default:
						break;		
				}
			}
		},
		
		calcularPedido : function(){//calcular precios de total y subtotal
			var subtotal = 0;
			for (var i in this.items) {
			 	//precio * cantidad
				subtotal += this.items[i].precio * this.items[i].cantidad;
			}

			this.totales.subtotal = subtotal;
			this.totales.domicilio = (subtotal != 0 ? this.domicilio : 0);
			this.totales.total = (subtotal != 0 ? subtotal + this.domicilio : 0);
		},

		soloHayProductos : function(){
			var cont = 0;
			for(i in this.items){
				if(this.items[i].tipo=='PRODUCTO'){
					cont++;
				} else {
					return false;
				}
			}
			return cont > 0 ? true : false;
		},

		cancelarOrden : function() {
			for(var i in this.items){
				delete this.items[i];
			}
		}
	};
}])
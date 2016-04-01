app.factory('CarritoFactory', [function(){
	return {
		domicilio: 2300,

		items: [
		//id: {
		//  producto o servicio object +
		//	tipo: "PRODUCTO" o "SERVICIO"
		//	cantidad: cantidad agregada
		//}
		],

		totales : {
			subtotal: 0,
			domicilio: 0,
			total: 0
		},

		contProductos: 0,
		contServicios: 0,

		get : function(id){
			for(var i = 0; i < this.items.length; i++){
				if(this.items[i].id == id){
					return this.items[i];
				}
			}
			return null;
		},

		agregar : function(nuevoItem, tipo, cantidad){
			var existe = false;

			for(var i = 0; i < this.items.length; i++){
				if(this.items[i].id == nuevoItem.id){
					this.items[i].cantidad += cantidad;
					existe = true;
				}
			}

			if (!existe) {
				nuevoItem.tipo = tipo;
				nuevoItem.cantidad = cantidad;
				this.items.push(nuevoItem);
			}
			this.actualizarContadores();
			this.calcularPedido();
		},

		disminuir : function(nuevoItem, tipo, cantidad){
			var existe = false;

			for(var i = 0; i < this.items.length; i++){
				if(this.items[i].id == nuevoItem.id){
					this.items[i].cantidad -= cantidad;
					if(this.items[i].cantidad <= 0){
						this.items[i].cantidad = 0;
					//this.items.splice(i, 1);
						
					}
					existe = true;
				}
			}

			if (!existe) {
				nuevoItem.tipo = tipo;
				nuevoItem.cantidad = cantidad;
				this.items.push(nuevoItem);
			}
			this.actualizarContadores();
			this.calcularPedido();
		},

		limpiar : function(){//limpiar los items que no tienen cantidades.
			for(var i = 0; i < this.items.length; i++){
				if(this.items[i].cantidad == 0){
					this.items.splice(i, 1);
				}
			}
			this.actualizarContadores();
		},

		actualizarContadores : function(){
			this.contProductos = 0;
			this.contServicios = 0;
			for (var i = 0; i < this.items.length; i++) {
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
			for (var i = this.items.length - 1; i >= 0; i--) {
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
		}
	};
}])
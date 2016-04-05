app.factory('HistorialOrdenFactory', ['EstadosFactory', function(EstadosFactory){	
	return {
		contOrdenesEnProceso : 0,
		ordenesEnProceso: [],
		historialOrdenes: [],
		ordenes : [
			{
				id:'1', fecha:'20 de abril de 2016', codigo:'A3190', estado: EstadosFactory.estados[3].titulo, 
				orden:{	
					direccionRecoleccion: {
						direccion: 'calle 4 5 6',
						hora:'14:00'
					},
					direccionEntrega:{
						direccion:'cra 24 4 56',
						hora:'20:00'
					},
					formaPago:'En Efectivo'
				}, 
				items:[
					{'id':'5','nombre':'Producto cinco', 'resumen':'Esta es una descripcion del producto','precio': 35000, 'cantidad': 2},
					{'id':'55', 'nombre': 'alfombras', 'descripcion':'descripcion del servicio', 'precio':7000, 'cantidad': 1},
					{'id':'23', 'nombre': 'camisas', 'descripcion':'descripcion del servicio', 'precio':8000, 'cantidad':1}
				],
				totales: {
					subtotal: 85000,
					domicilio: 2300,
					total: 87300
				}
			},
			{id:'2', fecha:'16 de abril de 2016', codigo:'A3030', estado: EstadosFactory.estados[3].titulo},
			{id:'3', fecha:'10 de abril de 2016', codigo:'A3006', estado: 'cancelada'},
			{id:'4', fecha:'03 de abril de 2016', codigo:'A2987', estado: 'cancelada'}
		],
		obtenerHistorial: function(){
			//obtener las ordenes que no tengan el estado de entregado o de cancelado
			this.historialOrdenes = [];
			for(var i = 0; i < this.ordenes.length; i++){
				if (this.ordenes[i].estado == EstadosFactory.estados[3].titulo || this.ordenes[i].estado == 'cancelada') {
					this.historialOrdenes.push(this.ordenes[i]);
				}
			}
		}	,
		getOrdenHistorica: function(idOrden){
			for(var i = 0; i < this.ordenes.length; i++){
				if(this.ordenes[i].id == idOrden){
					return this.ordenes[i];
				}
			}
		},
		getOrdenEnProceso : function(idOrden){
			for(var i = 0; i < this.ordenes.length; i++){
				if(this.ordenes[i].id == idOrden){
					return this.ordenes[i];
				}
			}
			return false;
		}
	};
}])
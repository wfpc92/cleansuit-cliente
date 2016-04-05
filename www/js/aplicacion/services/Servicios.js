app.factory('ServiciosFactory',[function(){
	
	return {
		categorias : [
			{
				id:'1', 
				nombre:'Lavado en Seco', 
				resumen:'lavado de prendas en seco',
				servicios:[
					{id:'11', nombre: 'jeans', descripcion:'descripcion del servicio', precio:12000},
					{id:'12', nombre: 'sacos', descripcion:'descripcion del servicio', precio:7000},
					{id:'13', nombre: 'camisas', descripcion:'descripcion del servicio', precio:8000},
					{id:'14', nombre: 'camisetas', descripcion:'descripcion del servicio', precio:6500},
					{id:'15', nombre: 'busos', descripcion:'descripcion del servicio', precio:9500},
					{id:'16', nombre: 'bufandas', descripcion:'descripcion del servicio', precio:4000},
				]
			},
			{
				id:'2', 
				nombre:'Lavado en Frio', 
				resumen:'lavado de prendas en frio',
				servicios:[
					{id:'21', nombre: 'jeans', descripcion:'descripcion del servicio', precio:12000},
					{id:'22', nombre: 'sacos', descripcion:'descripcion del servicio', precio:7000},
					{id:'23', nombre: 'camisas', descripcion:'descripcion del servicio', precio:8000},
					{id:'24', nombre: 'camisetas', descripcion:'descripcion del servicio', precio:6500},
					{id:'25', nombre: 'busos', descripcion:'descripcion del servicio', precio:9500},
					{id:'26', nombre: 'bufandas', descripcion:'descripcion del servicio', precio:4000},
				]
			},
			{
				id:'3', 
				nombre:'Sastreria', 
				resumen:'sastreria para cualquier tipo de prenda',
				servicios:[
					{id:'31', nombre: 'sacos', descripcion:'descripcion del servicio ', precio:6500},
					{id:'32', nombre: 'pantalones', descripcion:'descripcion del servicio', precio:4000},
					{id:'33', nombre: 'camisas', descripcion:'descripcion del servicio', precio:12000},
					{id:'34', nombre: 'blusas', descripcion:'descripcion del servicio', precio:6500},
					{id:'35', nombre: 'ropa a medida', descripcion:'descripcion del servicio', precio:7000},
					{id:'36', nombre: 'sombreros', descripcion:'descripcion del servicio', precio:7000},
				]
			},
			{
				id:'4', 
				nombre:'Zapateria', 
				resumen:'zapateria para cualquier tipo de zapato',
				servicios:[
					{id:'41', nombre: 'mocasin', descripcion:'descripcion del servicio ', precio:12000},
					{id:'42', nombre: 'tacon', descripcion:'descripcion del servicio', precio:4000},
					{id:'43', nombre: 'deportivo', descripcion:'descripcion del servicio', precio:5000},
					{id:'44', nombre: 'formal', descripcion:'descripcion del servicio', precio:12000},
					{id:'45', nombre: 'tenis', descripcion:'descripcion del servicio', precio:6000},
					{id:'46', nombre: 'chanclas', descripcion:'descripcion del servicio', precio:7000},
				]
			},
			{
				id:'5', 
				nombre:'Limpieza Hogar', 
				resumen:'servicio de limpieza hogar',
				servicios:[
					{id:'51', nombre: 'muebles', descripcion:'descripcion del servicio ', precio:12000},
					{id:'52', nombre: 'sillas', descripcion:'descripcion del servicio', precio:6500},
					{id:'53', nombre: 'cortinas', descripcion:'descripcion del servicio', precio:4000},
					{id:'54', nombre: 'colchon de perro', descripcion:'descripcion del servicio', precio:5200},
					{id:'55', nombre: 'alfombras', descripcion:'descripcion del servicio', precio:7000},
					{id:'56', nombre: 'manteles', descripcion:'descripcion del servicio', precio:4000},
				]
			},
			{
				id:'6', 
				nombre:'Limpieza Industrial y Fachadas', 
				resumen:'Servicio de limpieza industrial y fachadas',
				servicios:[
					{id:'61', nombre: 'industrias', descripcion:'descripcion del servicio ', precio:7000},
					{id:'62', nombre: 'fachadas', descripcion:'descripcion del servicio', precio:6500}
				]
			}
		],

		getServicios : function(idCategoria){
			for(var i = 0; i < this.categorias.length; i++){
				if(this.categorias[i].id == idCategoria){
					return this.categorias[i].servicios;
				}
			}
			return false;
		},

		getServicio : function(idCategoria, idServicio){
			for(var i = 0; i < this.categorias.length; i++){
				if(this.categorias[i].id == idCategoria){
					for(var j = 0; j < this.categorias[i].servicios.length; j++){
						if(this.categorias[i].servicios[j].id == idServicio){
							return this.categorias[i].servicios[j];
						}
					}
				}
			}
			return false;
		}

	};

}])
angular.module('ClienteCleanSuit.services', [])

.factory('FabricaDatos', [function(){

	var domicilio = 2300;

	var promociones = [
		{'id':'1', 'descuento':'20% DE DESCUENTO'},
		{'id':'2', 'descuento':'10% DE DESCUENTO'},
		{'id':'3', 'descuento':'5% DE DESCUENTO'},
		{'id':'4', 'descuento':'25% DE DESCUENTO'},
	];

	var estados = [
		{titulo:'En ruta de recolección'},
		{titulo:'En Procesamiento'},
		{titulo:'En ruta de Entrega'},
		{titulo:'Entregado'}
	];

	var categorias = [
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
	];

	var productos = [
		{'id':'1','nombre':'Producto uno', 'resumen':'Esta es una descripcion del producto','precio': 10000,'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		{'id':'2','nombre':'Producto dos', 'resumen':'Esta es una descripcion del producto','precio': 12000,'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		{'id':'3','nombre':'Producto tres', 'resumen':'Esta es una descripcion del producto','precio': 25000,'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		{'id':'4','nombre':'Producto cuatro', 'resumen':'Esta es una descripcion del producto','precio': 2500,'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		{'id':'5','nombre':'Producto cinco', 'resumen':'Esta es una descripcion del producto','precio': 35000,'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		{'id':'6','nombre':'Producto seis', 'resumen':'Esta es una descripcion del producto','precio': 10200,'descripcion':'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
	];
	
	var usuario = {
		nombre : 'Dany Alejandro',
		apellidos : 'Cabrera Bolaños',
		direccion : {
			departamento : 'Cundinamarca',
			ciudad : 'Bogotá',
			envio: 'Carrera 9 # 18N-343 Apto 301'
		},
		telefono: '300 5757050',
		fotoPerfil: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8h8h9zqj1xg5bGwGMuXTBnqI_52j9i5i_XrUj2oOcvpiKPmm__REQu9o',
		ordenes : [
			{
				id:'1', fecha:'20 de abril de 2016', codigo:'A3190', estado: estados[3].titulo, 
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
			{id:'2', fecha:'16 de abril de 2016', codigo:'A3030', estado: estados[3].titulo},
			{id:'3', fecha:'10 de abril de 2016', codigo:'A3006', estado: 'cancelada'},
			{id:'4', fecha:'03 de abril de 2016', codigo:'A2987', estado: 'cancelada'}
		],
		contOrdenesEnProceso: 0,
		ordenesEnProceso: [],
		historialOrdenes : [],
		obtenerHistorial: function(){
			//obtener las ordenes que no tengan el estado de entregado o de cancelado
			this.historialOrdenes = [];
			for(i in this.ordenes){
				if (this.ordenes[i].estado == estados[3].titulo || this.ordenes[i].estado == 'cancelada') {
					this.historialOrdenes.push(this.ordenes[i]);
				}
			}
		}
	};


	var get = function(datos, id){
		for (var i = datos.length - 1; i >= 0; i--) {
			if(datos[i].id == id)
				return datos[i];
		}
		return false;
	}

	var carrito = {
		items: [
			//id: {
			//  producto o servicio object +
			//	tipo: "PRODUCTO" o "SERVICIO"
			//	cantidad: cantidad agregada
			//}
		],
		totales: function(){
			var subtotal = 0;
			for (i in this.items) {
				//precio * cantidad
				subtotal += this.items[i].precio * this.items[i].cantidad;
			}

			return {
				subtotal: subtotal,
				domicilio: (subtotal != 0 ? domicilio : 0),
				total: (subtotal != 0 ? subtotal + domicilio : 0)
			};
		},
		get: function(id){
			for(i in this.items){
				if(this.items[i].id == id){
					return this.items[i];
				}
			}
			return null;
		},
		agregar: function(nuevoItem, tipo, cantidad){
			var existe = false;

			for(i in this.items){
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
		},
		disminuir: function(nuevoItem, tipo, cantidad){
			var existe = false;

			for(i in this.items){
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
		},
		limpiar: function(){//limpiar los items que no tienen cantidades.
			for(i in this.items){
				if(this.items[i].cantidad == 0){
					this.items.splice(i, 1);
				}
			}
		},
		contadorProductos : 0,
		contadorServicios: 0,
		actualizarContadores : function(){
			this.contadorProductos = 0;
			this.contadorServicios = 0;
			for (i in this.items) {
				switch(this.items[i].tipo){
					case "PRODUCTO":
						this.contadorProductos += this.items[i].cantidad;
						break;
					case "SERVICIO":
						this.contadorServicios += this.items[i].cantidad;
						break;
					default:
						break;		
				}
			}
		},
		calcularPedido: function(){//calcular precios de total y subtotal
			var subtotal = 0;
			for (i in this.items) {
				//precio * cantidad
				subtotal += this.items[i].precio * this.items[i].cantidad;
			}

			this.totales.subtotal = subtotal;
			this.totales.domicilio = (subtotal != 0 ? domicilio : 0);
			this.totales.total = (subtotal != 0 ? subtotal + domicilio : 0);
		},
		soloHayProductos: function(){
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

	var orden = {
		direccionRecoleccion: {
			direccion: '',
			hora:''
		},
		direccionEntrega:{
			direccion:'',
			hora:''
		},
		formaPago:'',
		realizarOrden: function(){
			//aqui se envia la informacion al servidor
			usuario.ordenesEnProceso.push({
				id:usuario.ordenes.length+1,
				fecha: new Date(),
				codigo: 'A3025',
				estado: estados[0],
				orden: orden,
				items: carrito.items
			});		
			
			carrito.items = [];
			carrito.actualizarContadores();
		}
	};

	return {
		promociones : promociones,
		categorias:categorias,
		productos : productos,
		estados : estados,
		get : get,
		usuario : usuario,
		carrito: carrito,
		orden: orden
	};
}])

.factory('FabricaCategorias', [function(){
	var categorias =";";

	return {
		categorias : categorias
	}
}])



//clase para descripcion:
//item-text-wrap
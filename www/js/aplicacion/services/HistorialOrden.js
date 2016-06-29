var HistorialOrdenFactory = function(EstadosFactory, RecursosFactory){
	
	var _ordenesEnProceso	= [];
	var _historialOrdenes = [];

	return {
		contOrdenesEnProceso : 0,
		ordenesEnProceso: [], 
		historialOrdenes: [],
		ordenes : [
			{
				id:'1', 
				fecha:'20 de abril de 2016', 
				codigo:'A3190', 
				estado: EstadosFactory.estados[3].titulo, 
				orden:{
					usuario : {
						nombre : 'Dany Alejandro',
						apellidos : 'Cabrera Bolaños',
						direccion : {
							departamento : 'Cundinamarca',
							ciudad : 'Bogotá',
							residencia: 'Carrera 9 # 18N-343 Apto 301'
						},
						telefono: '3005757050',
						email: 'danyalejandro@gmail.co',
						fotoPerfil: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8h8h9zqj1xg5bGwGMuXTBnqI_52j9i5i_XrUj2oOcvpiKPmm__REQu9o',
					},
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
					{
						id:5,
						nombre: 'Producto cinco', 
						resumen:'Esta es una descripcion del producto',
						'precio': 35000, 
						cantidad: 2, 
						tipo:"PRODUCTO"
					},
					{
						id:'55',
						nombre: 'alfombras', 
						descripcion: 'descripcion del servicio', 
						categoria: 'Lavado en frio', 
						precio:7000, 
						cantidad: 1, 
						tipo:"SERVICIO"
					},
					{
						id: '23',
						nombre: 'camisas', 
						descripcion: 'descripcion del servicio', 
						categoria: 'Lavado en seco',
						precio: 8000, 
						cantidad: 1, 
						tipo: "SERVICIO"
					}
				],
				totales: {
					subtotal: 85000,
					domicilio: 2300,
					total: 87300
				}
			},
			{
				id:'2', 
				fecha:'30 de abril de 2016', 
				codigo:'A3245', 
				estado: EstadosFactory.estados[3].titulo, 
				orden:{	
					usuario : {
						nombre : 'Dany Alejandro',
						apellidos : 'Cabrera Bolaños',
						direccion : {
							departamento : 'Cundinamarca',
							ciudad : 'Bogotá',
							residencia: 'Carrera 9 # 18N-343 Apto 301'
						},
						telefono: '3005757050',
						email: 'danyalejandro@gmail.co',
						fotoPerfil: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8h8h9zqj1xg5bGwGMuXTBnqI_52j9i5i_XrUj2oOcvpiKPmm__REQu9o',
					},
					direccionRecoleccion: {
						direccion: '',
						hora:''
					},
					direccionEntrega:{
						direccion:'cra 24 4 56',
						hora:'6:00 P.M. a 7:00 P.M.'
					},
					formaPago:'En Efectivo'
				}, 
				items:[
					{
						id:'5',
						nombre:'Producto cinco', 
						resumen:'Esta es una descripcion del producto',
						precio: 35000, 
						cantidad: 2, 
						tipo:"PRODUCTO"
					},
					{
						id:'6',
						nombre:'Producto seis', 
						resumen:'Esta es una descripcion del producto',
						precio: 5000, 
						cantidad: 1, 
						tipo:"PRODUCTO"
					},
					{
						id:'2',
						nombre:'Producto dos', 
						resumen:'Esta es una descripcion del producto',
						precio: 14000, 
						cantidad: 3, 
						tipo:"PRODUCTO"
					},
				],
				totales: {
					subtotal: 117000,
					domicilio:  2300,
					total: 119300
				}
			},
			{id:'3', fecha:'16 de abril de 2016', codigo:'A3030', estado: EstadosFactory.estados[3].titulo},
			{id:'4', fecha:'10 de abril de 2016', codigo:'A3006', estado: 'cancelada'},
			{id:'5', fecha:'03 de abril de 2016', codigo:'A2987', estado: 'cancelada'}
		],
		obtenerHistorial: function(){
			//obtener las ordenes que no tengan el estado de entregado o de cancelado
			this.historialOrdenes = [];
			for(var i = 0; i < this.ordenes.length; i++){
				if (this.ordenes[i].estado == EstadosFactory.estados[3].titulo || this.ordenes[i].estado == 'cancelada') {
					this.historialOrdenes.push(this.ordenes[i]);
				}
			}
		},

		getOrdenesEnProceso: function() {
			return _ordenesEnProceso;
		},

		getHistorialOrdenes: function() {
			return _historialOrdenes;
		},
		
		cargar: function() {
			console.log("Enviando peticion GET a servidor para obtener ordenes.")
			return RecursosFactory
			.get('/ordenes/en-proceso', {})
			.then(function(respuesta) {
				console.log("Finaliza peticion GET a servidor para ordenes.")
				console.log("HistorialOrdenFactory: ", respuesta)
				if(!respuesta.error){
					_ordenesEnProceso = respuesta.data;
				} else {
					console.log("HistorialOrdenFactory.cargar()", respuesta.error);
				}
			});
		},

		cargarHistorialOrdenes: function() {
			console.log("Enviando peticion GET a servidor para obtener historial de ordenes.")
			return RecursosFactory
			.get('/ordenes/historial', {})
			.then(function(respuesta) {
				console.log("Finaliza peticion GET a servidor para historial de ordenes.")
				console.log("HistorialOrdenFactory: ", respuesta)
				if(!respuesta.error){
					_historialOrdenes = respuesta.data;
				} else {
					console.log("HistorialOrdenFactory.cargarHistorial()", respuesta.error);
				}
			});
		}
	};
};

app.factory('HistorialOrdenFactory', HistorialOrdenFactory);

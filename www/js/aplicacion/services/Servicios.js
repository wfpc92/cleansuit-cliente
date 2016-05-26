app.factory('ServiciosFactory',['RecursosFactory', function(RecursosFactory){
	
	/*[{ 
		id:'1', 
		nombre:'Lavado en Seco', 
		descripcion:'las prendas se lavan cuidadosamente en modo seco, sin daños en prendas ni rasgaduras',
		servicios:[
			{id:'11', nombre: 'jeans', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'12', nombre: 'sacos', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'13', nombre: 'camisas', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:8000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'14', nombre: 'camisetas', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:6500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'15', nombre: 'busos', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:9500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'16', nombre: 'bufandas', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:4000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		]
	},
	{
		id:'2', 
		nombre:'Lavado en Frio', 
		descripcion:'las prendas se lavan con agua fria en ciclo normal con jabon suave y suavizante',
		servicios:[
			{id:'21', nombre: 'jeans', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'22', nombre: 'sacos', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'23', nombre: 'camisas', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:8000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'24', nombre: 'camisetas', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:6500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'25', nombre: 'busos', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:9500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'26', nombre: 'bufandas', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:4000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		]
	},
	{
		id:'3', 
		nombre:'Sastreria', 
		descripcion:'el servicio de sastreria para cualquier tipo de prenda, remendamos, ponemos botones, etc',
		servicios:[
			{id:'31', nombre: 'sacos', descripcion:'descripcion del servicio ', categoria: 'Sastreria', precio:6500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'32', nombre: 'pantalones', descripcion:'descripcion del servicio', categoria: 'Sastreria', precio:4000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'33', nombre: 'camisas', descripcion:'descripcion del servicio', categoria: 'Sastreria', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'34', nombre: 'blusas', descripcion:'descripcion del servicio', categoria: 'Sastreria', precio:6500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'35', nombre: 'ropa a medida', descripcion:'descripcion del servicio', categoria: 'Sastreria', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'36', nombre: 'sombreros', descripcion:'descripcion del servicio', categoria: 'Sastreria', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		]
	},
	{
		id:'4', 
		nombre:'Zapateria', 
		descripcion:'arreglamos cualquier tipo de calzado, pegamos zapatos despegados, ponemos clavos a tacones',
		servicios:[
			{id:'41', nombre: 'mocasin', descripcion:'descripcion del servicio ', categoria: 'Zapateria', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'42', nombre: 'tacon', descripcion:'descripcion del servicio', categoria: 'Zapateria', precio:4000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'43', nombre: 'deportivo', descripcion:'descripcion del servicio', categoria: 'Zapateria', precio:5000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'44', nombre: 'formal', descripcion:'descripcion del servicio', categoria: 'Zapateria', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'45', nombre: 'tenis', descripcion:'descripcion del servicio', categoria: 'Zapateria', precio:6000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'46', nombre: 'chanclas', descripcion:'descripcion del servicio', categoria: 'Zapateria', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		]
	},
	{
		id:'5', 
		nombre:'Limpieza Hogar', 
		descripcion:'aqui encontraras todos los servicio de limpieza para que tu hogar quede brillante y elegante',
		servicios:[
			{id:'51', nombre: 'muebles', descripcion:'descripcion del servicio ', categoria: 'Limpieza Hogar', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'52', nombre: 'sillas', descripcion:'descripcion del servicio', categoria: 'Limpieza Hogar', precio:6500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'53', nombre: 'cortinas', descripcion:'descripcion del servicio', categoria: 'Limpieza Hogar', precio:4000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'54', nombre: 'colchon de perro', descripcion:'descripcion del servicio', categoria: 'Limpieza Hogar', precio:5200, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'55', nombre: 'alfombras', descripcion:'descripcion del servicio', categoria: 'Limpieza Hogar', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'56', nombre: 'manteles', descripcion:'descripcion del servicio', categoria: 'Limpieza Hogar', precio:4000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
		]
	},
	{
		id:'6', 
		nombre:'Limpieza Industrial y Fachadas', 
		descripcion:'Servicio de limpieza industrial y fachadas',
		servicios:[
			{id:'61', nombre: 'industrias', descripcion:'descripcion del servicio ', categoria: 'Limpieza Industrial y Fachadas', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
			{id:'62', nombre: 'fachadas', descripcion:'descripcion del servicio', categoria: 'Limpieza Industrial y Fachadas', precio:6500, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
		]
	}]*/

	var _categorias = //[];
		[
			{ 
				id:'1', 
				nombre:'Lavado en Seco', 
				descripcion:'las prendas se lavan cuidadosamente en modo seco, sin daños en prendas ni rasgaduras'
			},
			{
				id:'2', 
				nombre:'Lavado en Frio', 
				descripcion:'las prendas se lavan con agua fria en ciclo normal con jabon suave y suavizante',
			}

		];


	var _servicios = //[];
		[
			[
				{_id:'11', nombre: 'jeans', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
				{_id:'12', nombre: 'sacos', descripcion:'descripcion del servicio', categoria: 'Lavado en Seco', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
			],
			[
				{_id:'21', nombre: 'jeans', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:12000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
				{_id:'22', nombre: 'sacos', descripcion:'descripcion del servicio', categoria: 'Lavado en Frio', precio:7000, detalles:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
			]
		];

	return {
		getCategorias: function() {
			return _categorias;
		},

		getServicios: function() {
			return _servicios;
		},

		//carga una lista de productos desde el servidor
		cargar: function(callback) {
			this.cargarCategorias(callback);
			this.cargarServicios(callback);			
		},

		cargarCategorias: function(callback) {
			console.log("Enviando peticion GET a servidor para obtener categorias y servicios.")
			RecursosFactory.get('/categorias', {}, function(respuesta) {
				console.log("Finaliza peticion GET a servidor para categorias.")
				if(!respuesta.error){
					_categorias = respuesta.data;
				}
				callback(respuesta.error);
			});
		},

		cargarServicios: function(callback) {
			console.log("Enviando peticion GET a servidor para obtener categorias y servicios.")
			RecursosFactory.get('/servicios', {}, function(respuesta) {
				console.log("Finaliza peticion GET a servidor para servicios.")
				if(!respuesta.error){
					_servicios = respuesta.data;
				}
				callback(respuesta.error);
			});
		},
	};
}]);

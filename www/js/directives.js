app.directive('elementoCentrado', function(){
	return {
		restrict: 'AEC',//'AEC' - matches either attribute or element or class name
		scope: {
				'heightPercent':'='//cunado @ es unidireccional & para llamar funciones, = para hacer binding
		},
		replace: true,//para reemplazar el contenedor 
		transclude:true, //reinserta el contenido original
		templateUrl:  function(elem, attr){
				return 'templates/directives/elemento-centrado.html';
		},
		link : function(scope, element, attrs) {
				//funcion para asignar eventos, css, y cosillas varias al elemento
		}
		
	};
})

		
/**
 * muestra el footer para permitir solicitar un servicio o para mostrar 
 * el numero de servicios que ha solicitado
 * @param  {String} ){                           return          {                  restrict: 'AEC',          scope:                                         {                       'heightPercent':' [description]
 * @param  {[type]} replace:        true          [description]
 * @param  {[type]} transclude:true [description]
 * @param  {[type]} templateUrl:                  function(elem,  attr){                                return 'templates/directives/elemento-centrado.html';      } [description]
 * @param  {[type]} link            :             function(scope, element, attrs) {                                                                                   }                                               };} [description]
 * @return {[type]}                 [description]
 */
.directive('footerCarrito', function(){
	return {
		restrict: 'AEC',//'AEC' - matches either attribute or element or class name
		scope: {
				carrito:'='//cunado @ es unidireccional & para llamar funciones, = para hacer binding
		},
		replace: true,//para reemplazar el contenedor  
		transclude:false, //reinserta el contenido original
		templateUrl:  function(elem, attr){
				return 'templates/directives/footer-carrito.html';
		},
		link : function(scope, element, attrs) {
				
				//funcion para asignar eventos, css, y cosillas varias al elemento
		}
		
	};
})



.directive('resumenTotales', function(){
	return {
		restrict: 'E',//'AEC' - matches either attribute or element or class name
		scope: {
				totales: '='//cunado @ es unidireccional & para llamar funciones, = para hacer binding
		},
		replace: false, //para reemplazar el contenedor 
		transclude: false, //reinserta el contenido original
		templateUrl:  function(elem, attr){
				return 'templates/directives/resumen-totales.html';
		}    
	};
})




.directive('menuTabs', function(){
	return {
		restrict: 'AEC',//'AEC' - matches either attribute or element or class name
		scope: {
				carrito:'=',//cunado @ es unidireccional & para llamar funciones, = para hacer binding
				banderas: '='
		},
		replace: false,//para reemplazar el contenedor  
		transclude:false, //reinserta el contenido original
		templateUrl:  function(elem, attr){
				return 'templates/directives/menu-tabs.html';
		}    
	};
})



.directive('tutorial', function(){
	return {
		restrict: 'E',//'AEC' - matches either attribute or element or class name
		scope: {
				tutorial:'=',//cunado @ es unidireccional & para llamar funciones, = para hacer binding
				tipo: '='
		},
		replace: false,//para reemplazar el contenedor  
		transclude:false, //reinserta el contenido original
		templateUrl:  function(elem, attr){
				return 'templates/directives/tutorial.html';
		}    
	};
})




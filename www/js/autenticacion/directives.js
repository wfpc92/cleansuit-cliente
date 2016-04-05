
app.directive('iconoEmpresa', function(){
  return {
    restrict: 'AEC',//'AEC' - matches either attribute or element or class name
    scope: {
    	'height':'@'
    },
    templateUrl:  function(elem, attr){ 
    	return 'templates/directives/icono-empresa.html';
    }
  };
})



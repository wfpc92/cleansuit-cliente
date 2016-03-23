angular.module('autenticacion.controllers', [])
  
.controller('inicioCtrl', function($scope) {

})
   
.controller('registrarManualCtrl', function($scope) {

})
   
.controller('ingresarManualCtrl', function($scope) {

})
   
.controller('recuperarContrasenaCtrl', function($scope) {

})
   
.controller('panelPrincipalCtrl', function($scope, Productos) {
	$scope.productos = Productos;
})
 
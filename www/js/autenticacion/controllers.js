  
app.controller('AutenticacionInicioCtrl', function($scope, $ionicSideMenuDelegate) {
	
	$ionicSideMenuDelegate.canDragContent(false);
})
   
.controller('registrarManualCtrl', function($scope) {

})
   
.controller('ingresarManualCtrl', function($scope) {

})
   
.controller('recuperarContrasenaCtrl', function($scope) {

})
   
.controller('panelPrincipalCtrl', function($scope, Productos) {
	$scope.productos = Productos;
}); 
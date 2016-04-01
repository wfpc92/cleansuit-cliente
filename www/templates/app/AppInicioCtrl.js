app.controller('AppInicioCtrl', function($scope, PromocionesFactory, CarritoFactory, $log, $ionicTabsDelegate) {
	$scope.promociones = PromocionesFactory.promociones;
	$scope.carrito = CarritoFactory;
	$ionicTabsDelegate.select(2);
});
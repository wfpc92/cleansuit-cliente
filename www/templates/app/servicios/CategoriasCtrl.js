app.controller('CategoriasCtrl', function($scope, ServiciosFactory, CarritoFactory) {
	$scope.categorias = ServiciosFactory.categorias;
	$scope.carrito = CarritoFactory;
});
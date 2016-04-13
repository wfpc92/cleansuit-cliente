var CategoriasCtrl = function($scope, ServiciosFactory, CarritoFactory) {
	$scope.categorias = ServiciosFactory.categorias;
	$scope.carrito = CarritoFactory;
};

app.controller('CategoriasCtrl', CategoriasCtrl);


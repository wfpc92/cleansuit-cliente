var CategoriasCtrl = function($scope, ServiciosFactory, CarritoFactory) {
	$scope.carrito = CarritoFactory;

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.categorias = ServiciosFactory.getCategorias();	
	});

	$scope.cargarCategorias = function() {
		console.log("ejecutando cargarCategorias desde CategoriasCtrl.");
		ServiciosFactory.cargarCategorias(function(error) { 
			console.log("la operacion cargarCategorias ha sido terminada. ")
			console.log(error);
			$scope.categorias = ServiciosFactory.getCategorias();
		});
	};
};

app.controller('CategoriasCtrl', CategoriasCtrl);


var AppInicioCtrl = function($scope, 
							PromocionesFactory, 
							$ionicTabsDelegate, 
							CargaInicialFactory) {
	
	$ionicTabsDelegate.select(0);

	CargaInicialFactory
	.iniciar(function() {
		$scope.promociones = PromocionesFactory.getPromociones();
		console.log("termina de ejecutar la funcion iniciar de CargaInicialFactory")
	});

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.banderas.swp=false;
		$scope.banderas.sws=false;
	})
};

app.controller('AppInicioCtrl', AppInicioCtrl);

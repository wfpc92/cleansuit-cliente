var AcercaCtrl = function($scope, 
						ConfiguracionesFactory){

	console.log("AcercaCtrl");

	$scope.$on("$ionicView.beforeEnter", function () {
		$scope.sobreEmpresa = ConfiguracionesFactory.getConfiguraciones().sobreEmpresa;
	});
	
};

app.controller("AcercaCtrl", AcercaCtrl);
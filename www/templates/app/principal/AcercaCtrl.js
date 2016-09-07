var AcercaCtrl = function($scope,
						$log,
						ConfiguracionesFactory){

	$log.debug("AcercaCtrl");

	$scope.$on("$ionicView.beforeEnter", function () {
		$scope.sobreEmpresa = ConfiguracionesFactory.getConfiguraciones().sobreEmpresa;
	});
	
};

app.controller("AcercaCtrl", AcercaCtrl);
var AppInicioCtrl = function($scope, PromocionesFactory, CarritoFactory, $log, $ionicTabsDelegate, CargaInicialFactory) {
	var self = this;
	$scope.promociones = PromocionesFactory.getPromociones();
	$scope.carrito = CarritoFactory;
	
	$ionicTabsDelegate.select(0);
	this.$scope = $scope;
	this.CargaInicialFactory = CargaInicialFactory;
	self.cargarDatos();
};

//cargar los datos del servidor
AppInicioCtrl.prototype.cargarDatos = function() {
	var self = this;
	
	//cargar informacion del API de cleansuit.
	self.CargaInicialFactory.iniciar(function() {
		console.log("termina de ejecutar la funcion iniciar de CargaInicialFactory")
	});
};

app.controller('AppInicioCtrl', AppInicioCtrl);
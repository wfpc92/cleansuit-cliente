var AppInicioCtrl = function($scope, PromocionesFactory, CarritoFactory, $log, $ionicTabsDelegate, ModalCargaFactory, ProductosFactory) {
	var self = this;
	$scope.promociones = PromocionesFactory.getPromociones();
	$scope.carrito = CarritoFactory;
	$ionicTabsDelegate.select(0);
	this.$scope = $scope;
	this.ProductosFactory = ProductosFactory;
	this.ModalCargaFactory = ModalCargaFactory;
	self.cargarDatos();
};

//cargar los datos del servidor
AppInicioCtrl.prototype.cargarDatos = function() {
	var self = this;
	self.$scope.mensajeModal = "productos";
	self.ModalCargaFactory.mostrar(self.$scope);

	self.ProductosFactory.cargar(function(){ 
		self.ModalCargaFactory.ocultar();
	});
};

app.controller('AppInicioCtrl', AppInicioCtrl);
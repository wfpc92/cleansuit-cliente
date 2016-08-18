var AppInicioCtrl = function($scope, 
							PromocionesFactory, 
							$ionicTabsDelegate, 
							CargaInicialFactory,
							$log) {
	
	$ionicTabsDelegate.select(0);

	$log.debug("AppInicioCtrl");

	CargaInicialFactory
	.iniciar(function() {
		$scope.promociones = PromocionesFactory.getPromociones();
		generarEtiquetasDescuentos();
		console.log("termina de ejecutar la funcion iniciar de CargaInicialFactory")
	});

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.banderas.swp=false;
		$scope.banderas.sws=false;
		generarEtiquetasDescuentos();
	});

	function generarEtiquetasDescuentos() {
		for (var i in $scope.promociones){
			etiquetar($scope.promociones[i]);
		}
	}

	function etiquetar(promocion) {
		//promocion.items = {checked: boolean, descuento: number}
		var arr = [], etiqueta, cadena;
		
		for(var i in promocion.items){
			if (promocion.items 
				&& arr.indexOf(promocion.items[i].descuento) == -1 
				&& promocion.items[i].descuento) {
			    arr.push(parseInt(promocion.items[i].descuento));
			}
		}
		
		arr = arr.sort(function(a, b){return a-b});
		
		if(arr.length == 0){
			etiqueta = "Descuento del " + promocion.descuento + "%";
		} else if(arr.length == 1) {
			etiqueta = "Descuento del " + arr[0] + "%";
		} else {
			cadena = "";

			for (var i in arr) {
				cadena += arr[i];
				if(i < arr.length - 2) {
					cadena += ", ";
				}
				if(i == arr.length - 2) {
				 	cadena += " y "
				}
			}

			etiqueta = "Descuentos del " + cadena + "%";
		}

		promocion.etiquetaDescuentos = etiqueta;
	}
};

app.controller('AppInicioCtrl', AppInicioCtrl);

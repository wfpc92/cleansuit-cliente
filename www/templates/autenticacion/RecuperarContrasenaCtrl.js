var RecuperarContrasenaCtrl = function($scope, $ionicPopup) {
	var self = this;

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.formData = {
			email: '',
			formValido: false
		};
		self.viewAfterEnter($scope);
	});

	$scope.enviar = function() {
		self.enviarCorreo($scope, function(){
			$ionicPopup
			.alert({
				title: 'Recuperar Contraseña',
				template: 'Se ha enviado un correo a tu bandeja de entrada para crear una nueva contraseña.'
			})
			.then(function(res){
				$scope.formData = {
					email: '',
					formValido: false
				};
			})
		})
	};
};

RecuperarContrasenaCtrl.prototype.viewAfterEnter = function($scope) {
	$scope.$watch('formData.email', function(newV, oldV, scope){
		if(newV){
			$scope.formData.formValido = true;
		}else {
			$scope.formData.formValido = false;
		}
	});
};

RecuperarContrasenaCtrl.prototype.enviarCorreo = function($scope, cllbck) {
	console.log("aqui se ejecuta enviarcorreo desde un servicio se envia la peticion al servidor");
	//al final se ejecuta el callback
	cllbck();
};

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
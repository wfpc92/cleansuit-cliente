var RecuperarContrasenaCtrl = function($scope) {
	var self = this;
	$scope.password = "";
	$scope.formIncompleto = true;

	$scope.$on("$ionicView.afterEnter", function () {
		self.viewAfterEnter($scope);
	});
};

RecuperarContrasenaCtrl.prototype.viewAfterEnter = function($scope) {
	$scope.$watch('password', function(newV, oldV, scope){
		console.log("password esta siendo bservado")
		if(newV){
			$scope.formIncompleto = false;
		}else {
			$scope.formIncompleto = true;
		}
	})
};

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
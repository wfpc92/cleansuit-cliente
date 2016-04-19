var RecuperarContrasenaCtrl = function($scope) {
	var self = this;

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.email = "";
		$scope.formIncompleto = true;
		self.viewAfterEnter($scope);
	});
};

RecuperarContrasenaCtrl.prototype.viewAfterEnter = function($scope) {
	$scope.$watch('email', function(newV, oldV, scope){
		console.log("password esta siendo bservado")
		if(newV){
			$scope.formIncompleto = false;
		}else {
			$scope.formIncompleto = true;
		}
	})
};

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
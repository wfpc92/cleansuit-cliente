
var PopupFactory = function($ionicPopup) {
	var active = false;

	return { 
		alert : function(opt) {
			if(active) {
				return;
			}

			active = true;

			return $ionicPopup.alert(opt)
			.then(function(res) {
				active = false;
				return res;
			});
		}
	};
};

app.factory("PopupFactory", PopupFactory);

var TutorialFactory = function($localStorage, UsuarioFactory) {
	var tP = false, // indica si ya seha mostrado en vista deproductos
		tSs = false, // indica si ya seha mostrado en vista de subservicios
		existe = false; // indica si existe registro de haber realizado tutorial en este dispositivo

	//buscar si el usuario ya realizo el tutorial anteriormente en este dispositivo.
	if (typeof $localStorage.tutorial !== 'undefined') {
		for (var i  in $localStorage.tutorial) {
			//console.log($localStorage.tutorial[i]);	
			if ($localStorage.tutorial[i].correoUsuario == UsuarioFactory.getUsuario().correo) {
				existe = true;
				break;
			}
		}
	}

	return {
		/**
		 *  verificar si el usuario ya realizo cierto tutorial.
		 */
		mostrarTutorial: function(tipo) {
			if (existe) {
				return false;
			}
			//console.log("TutorialFactory.mostrarTutorial()", tipo)
			switch (tipo) {
				case "PRODUCTOS":
					var idLst = "#lstProductos .list .productos > .item";
					var primerItem = document.querySelector(idLst);
					if (primerItem) {
						var ele = angular.element(primerItem);
						console.log(ele);
					}
					else {
						this.cancelarTutorial();
					}
					console.log();
					var ele = angular.element(document.getElementById(idLst));
					console.log(ele)
					//lstProductos
					return !tP;
					break;
				case "SUBSERVICIOS":
					return !tSs;
					break;
				default:
					return false;
			}
		},

		/**
		 * el tutorial acaba de ser ejecutado y debe almacenarse en memoria para no volver a mostrar,
		 * incluso si el usuario reinicia sesion. 
		 */
		realizarTutorial: function(tipo) {
			if(existe) {
				return;
			}

			switch (tipo) {
				case "PRODUCTOS":
					tP = true;
					break;
				case "SUBSERVICIOS":
					tSs = true;
					break;
				default:
					break;
			}
			
			if (tP && tSs) {
				//console.log("TutorialFactory.realizarTutorial()2", tipo, tP, tSs)
				if (typeof $localStorage.tutorial == 'undefined') {
					//console.log("TutorialFactory.realizarTutorial()3", tipo, tP, tSs)
					$localStorage.tutorial = [];
				}
				//console.log("TutorialFactory.realizarTutorial()4", tipo, tP, tSs)
				$localStorage.tutorial.push({
					correoUsuario: UsuarioFactory.getUsuario().correo,
					tutorialRealizado: true
				});
				existe = true;
			}
		}
	};
};

app.factory("TutorialFactory", TutorialFactory);

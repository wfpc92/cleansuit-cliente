var TutorialFactory = function($localStorage, 
							UsuarioFactory, 
							$ionicBackdrop,
							$timeout,
							$document) {
	var tP = false, // indica si ya seha mostrado en vista deproductos
		tSs = false, // indica si ya seha mostrado en vista de subservicios
		existe = false,// indica si existe registro de haber realizado tutorial en este dispositivo
		duracion = 1300,//duracion despues que termina la transicion de la mano
		idLst = "",
		loaderInstance;
		var mano, imgMano;
		var texto, imgTexto;


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
		* verifica que el tutorial no haya sido realizado.
		*/
		realizado: function(tipo) {
			if (existe) {
				return true;
			}

			switch (tipo) {
				case "PRODUCTOS":
					return tP;
				case "SUBSERVICIOS":
					return tSs;
			}
			return false;
		},

		setIdLst : function(id) {
			idLst = id;
		},

		/**
		 *  verificar si el usuario ya realizo cierto tutorial.
		 */
		mostrarTutorial: function(tipo) {
			var self = this;

			if (existe || this.realizado(tipo)) {
				return false;
			}

			if (!imgMano) {
				mano = angular.element(document.getElementById("tutMano"));
				texto = angular.element(document.getElementById("tutTexto"));
				imgMano = $document[0].body.appendChild(mano[0]);
				imgTexto = $document[0].body.appendChild(texto[0]);
			}
			$ionicBackdrop.retain();
			//console.log("TutorialFactory.mostrarTutorial()", tipo)
			var header = angular.element(document.querySelector(".bar-header"))[0];
			var lst = angular.element(document.querySelector(idLst))[0];
			var top = (header.offsetHeight + lst.offsetTop + 30) + "px",
				left = ((1.0 - 0.25) * lst.children[0].offsetWidth) + "px";

			if (lst) {
				mano.addClass("transicionSwipeDerecha");
				
				mano.css({
					"display": "block",
					"top": top,
					"position": "absolute",
					"left": left,
					"-webkit-animation": "transicionSwipeDerecha "+ duracion +"ms ease-in-out",
					"-webkit-animation-fill-mode": "forwards",
					"-webkit-transform": "translateX(0)",
					"z-index": "12"
				});
				$timeout(function() {
					self.realizarTutorial(tipo);
					mano.css("display", "none");
				}, duracion);
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

			$ionicBackdrop.release();
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

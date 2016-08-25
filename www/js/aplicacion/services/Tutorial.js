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
				var hei = document.getElementById("tutMano").height;
				mano = angular.element(document.getElementById("tutMano"));
				texto = angular.element(document.getElementById("tutTexto"));
				imgMano = $document[0].body.appendChild(mano[0]);
				imgTexto = $document[0].body.appendChild(texto[0]);
			}

			$ionicBackdrop.retain();

			var header = angular.element(document.querySelector(".bar-header"))[0];
			var lst = angular.element(document.querySelector(idLst))[0];
			var top = (header.offsetHeight + lst.offsetTop + 30) ,
				left = ((1.0 - 0.25) * lst.children[0].offsetWidth);
				console.log("left:", left)

			if (lst) {
				
				mano.addClass("transicionSwipeDerecha");
				
				mano.css({
					"display": "block",
					"top": top + "px", 
					"position": "absolute",
					"left": left + "px",
					"-webkit-animation": "transicionSwipeDerecha "+ duracion +"ms ease-in-out",
					"-webkit-animation-fill-mode": "forwards",
					"-webkit-transform": "translateX(0)",
					"z-index": "12"
				});

				// ubicar el texto en la posicion deseada
				// se llama a timeout para que pueda acceder a los estilos computados
				// http://goo.gl/R4JFtm
				$timeout(function() {
					var topTexto = top + mano[0].clientHeight + 50,
						leftTexto = (1.0 - 0.80) * lst.children[0].offsetWidth;
					
					texto.css({
						"display": "block",
						"top": (topTexto)+ "px",
						"position": "absolute",
						"left": leftTexto + "px",
						"z-index": "12"
					});
				})

				//cuando termine la animacion del movimiento, volverlo a hacer
				$timeout(function() {
					console.log("removing")
					mano.removeClass("transicionSwipeDerecha");
					mano.css({
						opacity:0,
						"transition": "opacity 0.3s linear"
					});
					$timeout(function(){
						mano.css({
							left: left +"px", //79 equivale a la cantidad de pixeles que se corrio en .transicionSwipeDerecha
							opacity: 1,
							transition: "opacity 0.3s linear",
							"-webkit-animation": "none",
							"-webkit-transform": "none"
						});
						/*mano.css({
							left: (left + 79) +"px", //79 equivale a la cantidad de pixeles que se corrio en .transicionSwipeDerecha
							opacity: 1,
							transform: "left 0s linear",
							transition: "opacity 0.3s linear"
						});*/
						//mano.removeClass("notransition");
						mano.addClass("transicionSwipeDerecha");

					}, 300);
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

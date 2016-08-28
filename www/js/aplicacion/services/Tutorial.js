var TutorialFactory = function($localStorage, 
							UsuarioFactory, 
							$ionicBackdrop,
							$timeout,
							$document,
							$ionicPopup) {
	var tP = false, // indica si ya seha mostrado en vista deproductos
		tSs = false, // indica si ya seha mostrado en vista de subservicios
		existe = false,// indica si existe registro de haber realizado tutorial en este dispositivo
		duracion = 1300,//duracion despues que termina la transicion de la mano
		idLst = "",
		mano,
		imgMano,
		texto,
		imgTexto;


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

	var realizado = function(tipo) {
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
	};

	var realizarTutorial = function(tipo) {
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
	};

	var mostrarTutorial = function(tipo) {
		if (existe || realizado(tipo)) {
			return false;
		}
		
		tipoTutorial = tipo;
		mano = mano || angular.element(document.getElementById("tutMano"));
		texto = texto || angular.element(document.getElementById("tutTexto"));
		imgMano = imgMano || document.body.appendChild(mano[0]);
		imgTexto = imgTexto || document.body.appendChild(texto[0]);
		
		$ionicBackdrop.retain();
		$ionicBackdrop.getElement().on("click", function() {
			mano.css({"display": "none"});
			texto.css({"display": "none"});
			$ionicBackdrop.release();
			realizarTutorial(tipoTutorial);
		});

		var header = 56,
			lst = angular.element(document.querySelector(idLst))[0],
			top = (header + lst.offsetTop + 30),
			left = ((1.0 - 0.25) * lst.children[0].offsetWidth);

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
					});
					mano.addClass("transicionSwipeIzquierda")
					
					mano.css({
						"-webkit-animation": "transicionSwipeIzquierda "+ duracion +"ms ease-in-out",
						"-webkit-animation-fill-mode": "forwards",
						"-webkit-transform": "translateX(0)"
					});
				}, 300);
			}, duracion);
		}
		
	};


	return {
		/**
		* verifica que el tutorial no haya sido realizado.
		*/
		realizado: realizado,

		/**
		* recibe el id del DOM que debe tomarse como punto para coordenadas para tutorial.
		*/
		setIdLst : function(id) {
			idLst = id;
		},

		/**
		 *  verificar si el usuario ya realizo cierto tutorial. mostrar el tutorial.
		 */
		mostrarTutorial: mostrarTutorial,

		/**
		 * el tutorial acaba de ser ejecutado y debe almacenarse en memoria para no volver a mostrar,
		 * incluso si el usuario reinicia sesion. 
		 */
		realizarTutorial: realizarTutorial
	};
};

app.factory("TutorialFactory", TutorialFactory);

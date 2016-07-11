app 

.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	
	noAutenticado: 'auth-not-authenticated',
	noAutorizado: 'auth-not-authorized',
	perfilActualizado: 'perfil-actualizado'
})

.constant('APP_EVENTS', {
	noAccesoServidor: 'no-acceso-servidor', //hay conexion ainternet pero el servidor esta caido.
})
 
.constant('USER_ROLES', {
	cliente: 'cliente',
	public: 'public'
})
 
.constant('API_ENDPOINT', {
	url: '/api'
	//url: 'http://api.cleansuit.co'
});
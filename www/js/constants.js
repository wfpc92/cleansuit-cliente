app 

.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})
 
.constant('USER_ROLES', {
	cliente: 'cliente',
	public: 'public'
})
 
.constant('API_ENDPOINT', {
	url: '/api'
	//url: 'http://api.cleansuit.co'
});
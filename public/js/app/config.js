angular.module('courseApp.config', [])

.constant('config', {
	//API_URL: 'http://192.168.1.2222:3000/api'
	API_URL: 'api',
	LOCAL_TOKEN_KEY: 'Local_Auth_Token',
	LOCAL_USER_KEY: 'Local_User',
	HTTP_AUTH_HEADER: 'X-Authorization',
	FACEBOOK_APP_ID: '1701140506826073',
	GOOGLE_CLIENT_ID: '213358234973-081a9vqg4afl86gfgkgv148cl81svoim.apps.googleusercontent.com'
})

.constant('events', {
	USER_SIGN_IN: 'User_Sign_In',
	USER_SIGN_OUT: 'User_Sign_Out',
	SEARCH_TEXT_CHANGED: 'Search_Text_Changed'
})
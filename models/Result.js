var ResultHash = {
	'OK': {
		code: 'OK',
		status: 200,
		message: {
			vi: 'OK',
			en: 'OK'
		}
	},
	'UnAuthorized': {
		code: 'UnAuthorized',
		status: 401,
		message: {
			vi: 'Bạn chưa đăng nhập!',
			en: 'No authenticated!'
		}
	},
	'Forbidden': {
		code: 'Forbidden',
		status: 403,
		message: {
			vi: 'Bạn không có quyền!',
			en: 'No authorization!'
		}
	},
	'DBError': {
		code: 'DBError',
		status: 500,
		message: {
			vi: 'Lỗi cơ sở dữ liệu!',
			en: 'Database error!'
		}
	},
	'InvalidArgument': {
		code: 'InvalidArgument',
		status: 400,
		message: {
			vi: 'Tham số không hợp lệ!',
			en: 'Invalid argument!'
		}
	},
	'EmailExisted': {
		code: 'EmailExisted',
		status: 400,
		message: {
			vi: 'Email đã được sử dụng!',
			en: 'Email is in use!'
		}
	},
	'EmailNotRegistered': {
		code: 'EmailNotRegistered',
		status: 400,
		message: {
			vi: 'Email chưa đăng ký!',
			en: 'Email is not registered!'
		}	
	},
	'InvalidPassword': {
		code: 'InvalidPassword',
		status: 400,
		message: {
			vi: 'Sai mật khẩu!',
			en: 'Password is invalid!'
		}		
	},
	'GoogleOAuthFailed': {
		code: 'GoogleOAuthFailed',
		status: 401,
		message: {
			vi: 'Không thể kết nối với Google!',
			en: 'Can not connect to Google!'
		}	
	},
	'FacebookOAuthFailed': {
		code: 'FacebookOAuthFailed',
		status: 401,
		message: {
			vi: 'Không thể kết nối với Facebook!',
			en: 'Can not connect to Facebook!'
		}	
	}
}

module.exports = ResultHash
define(['mui'], function(mui) {
	if (typeof(GP) == 'undefined') {
		GP = {};
	}
	//接口地址
	GP.ServiceUrl = "http://121.43.158.213:8003";

	GP.getQueryString = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

	GP.NewOpenWindow = function(id) {
		mui.openWindow({
				url: id,
				id: id,
				show: {
					aniShow: 'pop-in'
				}
		})
	}
	return GP;
})
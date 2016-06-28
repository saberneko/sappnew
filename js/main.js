require.config({
	baseUrl: 'js',
	paths: {
		"mui": "mui.min",
		"in": "settings"
	},
	shim: {
		'mui': {
			exports: 'mui'
		}
	}
});
require(['mui', 'in'], function($, _) {
	$.init({});
	$.plusReady(function() {
		//仅支持竖屏显示
		plus.screen.lockOrientation("portrait-primary");

		if (window.localStorage.autoLogin == "true") {
			_.NewOpenWindow("main.html");
			//延时关闭 splash
			setTimeout(function() {
				plus.navigator.closeSplashscreen();
			}, 600);
		} else {
			//关闭 splash
			plus.navigator.closeSplashscreen();
		}

		var toMain = function() {
			var EmpNo = document.getElementById("empno").value;
			var Pwd = document.getElementById("pwd").value;
			if (EmpNo == "" || Pwd == "") {
				$.toast("请输入学号和密码");
				return;
			}
			var wa = plus.nativeUI.showWaiting();
			$.ajax({
				url: _.ServiceUrl + "/Service/Login/Login.ashx?r=" + Date.now().toString(),
				type: "POST",
				data: {
					"GP_No": EmpNo,
					"GP_Password": Pwd
				},
				dataType: "json",
				success: function(dat) {
					if ((!dat.ErrorMessage) && dat.LoginResult == "Success") {
						window.localStorage.empno = EmpNo;
						window.localStorage.autoLogin = ((document.getElementById("autoLogin").className.indexOf("mui-active") > -1) ? "true" : "false");
						//clicked("index.html");
						_.NewOpenWindow("main.html");
					} else {
						$.alert("工号或密码错误");
					}
				},
				error: function(e) {
					$.alert("发生错误，登录失败！" + e.responseText);
				},
				complete: function() {
					wa.close();
				}
			});
		};
		var loginButton = document.getElementById('btnLogin');
		loginButton.addEventListener('tap', function(event) {
			toMain();
		});

		//返回按钮
		$.back = function(event) {
			if (!$.os.ios) {
				if (confirm('确认退出？')) {
					plus.runtime.quit();
				}
			}
			return false;
		};
	});
});
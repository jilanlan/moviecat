'use strict';
// 手写jsonp实现
(function(angular) {
	// 由于默认angular提供的异步请求对象不支持自定义回调函数名
	// angular随机分配的回调函数名称不被豆瓣支持

  // 创建http服务模块
	var http = angular.module('moviecat.services.http', []);
	// console.log(http);
	// 创建一个服务模块
	http.service('HttpService', ['$window', '$document', function($window, $document) {
		// url : http://api.douban.com/vsdfsdf -> <script> -> html就可自动执行
		// 构造函数
		this.jsonp = function(url, data, callback) {
	  //将date转换为url字符串的形式
	  //{id:1,name:zhangsan} ——> ?id=1&name=zhangsan
			var querystring = url.indexOf('?') == -1 ? '?' : '&';
			for (var key in data) {
				querystring += key + '=' + data[key] + '&';
				//             id     =       1         &
			}
//      querystring=?id=1&name=zhangsan&
//    随机回调函数的后缀
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;
			//处理url中的回调参数
			querystring += 'callback=' + cbFuncName;
//创建script标签
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			console.log(url + querystring);
			// 不推荐
			$window[cbFuncName] = function(data) {
				callback(data);
				$document[0].body.removeChild(scriptElement);
			};
			//将script标签放到页面中
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular);

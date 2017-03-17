'use strict';
//创建主模块，添加其他的依赖模块
angular.module('moviecat', [
    	'ngRoute',//路由
    	'moviecat.movie_detail',//每部电影的详情
    	'moviecat.movie_list',//电影列表
    	'moviecat.directives.auto_focus',//自动聚焦指示器
  		])
// 为模块定义一些常量
	   .constant('AppConfig', {
	    pageSize: 10,//每页显示10条
	    listApiAddress: 'https://api.douban.com/v2/movie/',//豆瓣API
	    detailApiAddress: 'https://api.douban.com/v2/movie/subject/'
	   })
//
	   .config(['$routeProvider', function($routeProvider) {
         $routeProvider.otherwise({ redirectTo: '/in_theaters/1' });
       }])
       .controller('CheckController', ['$scope', function($scope){
       	   $scope.check = function() {
               var width_screen = screen.width;
               if (width_screen < 600){
               	return true;
               }else{
               	return false;
               }

           };
       }])
//搜索框控制器
       .controller('SearchController', [
		    '$scope',
		    '$route',
		    'AppConfig',
	    	function($scope, $route, AppConfig) {
		      $scope.input = ''; // 取文本框中的输入
		      $scope.search = function() {
		        // console.log($scope.input);
		      $route.updateParams({ category: 'search', q: $scope.input });
		      };

	    	}


  	   ]);

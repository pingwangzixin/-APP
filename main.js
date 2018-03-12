var app = angular.module("app", []);
if(navigator.onLine) {
		if(navigator.connection.type == "wifi") {
			app.controller("tvctrl", function($scope, $http, $interval) {
			
				var playtv = document.getElementById("playtv");
			
				$scope.playingname = "";
				$scope.tv="";
			
				$interval(function() {
					$scope.date = new Date();
					$scope.h = $scope.date.getHours();
					$scope.m = $scope.date.getMinutes();
					if($scope.m < 10) {
						$scope.m = "0" + $scope.m;
					}
					$scope.times = $scope.h + ":" + $scope.m;
				}, 1000)
			
				$http.get('http://www.h5wx.cn/tv/js/tv.json').success(function(res) {
					$scope.tv = res.data;
				});
			
				$scope.play = function() {
					$(".wx_xianluul li").removeClass("active");
					$scope.playurl = eval(angular.element(event.target).attr("dataurl"));
					$scope.playingname = angular.element(event.target).text();
					$("#playtv").html("");
					$scope.lines = [];
					for(var i = 0; i < $scope.playurl.length; i++) {
						var urls = {}
						urls.name = "线路" + i;
						urls.url = $scope.playurl[i];
						$scope.lines.push(urls)
					}
					$("#playtv").attr("src", $scope.playurl[0])
					playtv.play();
			
					$scope.qiehuanline = function() {
						$scope.urlline = angular.element(event.target).attr("urls");
						angular.element(event.target).addClass("active").siblings().removeClass("active");
						$("#playtv").attr("src", $scope.urlline);
						playtv.play();
					}
			
				};
			})
		}
		if(navigator.connection.type == "cellular") {
			alert("为避免产生流量费用，请在WiFi下观看");
			app.controller("tvctrl", function($scope, $http, $interval) {
				$scope.tv="";
				$http.get('http://www.h5wx.cn/tv/js/tv.json').success(function(res) {
					$scope.tv = res.data;
				});
				
				$scope.play = function() {
					alert("为避免产生流量费用，请在WiFi下观看");
				};
				
			})
		}
	} else {
		alert('需在WiFi下观看，请连接网络');
	}

$(function() {

	$(document).on("touchend", ".pindao", function() {
		if($(this).siblings().hasClass("wx_hide")) {
			$(this).siblings().removeClass("wx_hide");
			$(this).siblings("span").addClass("wx_jianhao");
		} else {
			$(this).siblings().addClass("wx_hide");
			$(this).siblings("span").removeClass("wx_jianhao");
		}
	})

	$(document).on("touchend", ".wx_chanalclass li ul li", function() {
		$(this).addClass("active").siblings().removeClass("active");
	})
})
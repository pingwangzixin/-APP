var app = angular.module("app", []);
    app.controller("tvctrl", function ($scope, $http) {
        
        var playtv = document.getElementById("playtv");
        
        $scope.playingname="";
        
        $http.get('http://www.h5wx.cn/tv/js/tv.json').success(function(res){
            $scope.tv=res.data;
        });

        $scope.play = function () {
            $(".wx_xianluul li").removeClass("active");
            $scope.playurl =eval(angular.element(event.target).attr("dataurl"));
            $scope.playingname=angular.element(event.target).text();
            $("#playtv").html("");
            $scope.lines=[];
            for(var i=0;i<$scope.playurl.length;i++){
                var urls={}
                urls.name="线路"+i;
                urls.url=$scope.playurl[i];
                $scope.lines.push(urls)
            }
            $("#playtv").attr("src",$scope.playurl[0])
            playtv.play();
            
            $scope.qiehuanline=function(){
                $scope.urlline=angular.element(event.target).attr("urls");
                angular.element(event.target).addClass("active").siblings().removeClass("active");
                $("#playtv").attr("src",$scope.urlline);
                playtv.play();
            }
            
        };
    })

$(function () {
        $(document).on("click",".pindao",function(){
            if($(this).siblings().hasClass("wx_hide")){
                $(this).siblings().removeClass("wx_hide");
            }else{
                $(this).siblings().addClass("wx_hide");
            }
        })
        
        $(document).on("click",".wx_chanalclass li ul li",function(){
            $(this).addClass("active").siblings().removeClass("active");
        })
})
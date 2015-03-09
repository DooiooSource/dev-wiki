/**
 * Created by LiuYang on 15-02-27.
 * DEV首页中的所有组件展示
 */
'use strict';
angular.module('dwikiApp').directive('homeList',function($window){
    return function(scope,ele,attrs) {
        var listener = function (e) {

            //导航固定
            var scrollTop = $(window).scrollTop();
            if(scrollTop >= pos.top) {
                !isFixed && nav.addClass('fixed').css('paddingLeft', pos.left);
                isFixed = true;
            } else {
                isFixed && nav.removeClass('fixed').css('paddingLeft', 0);
                isFixed = false;
            }
            //更新位置信息
            updateposArr();
            //对比当前位置与位置信息
            for(var i = posArr.length-1 ; i>=0 ; i--) {
                if(posArr[i] - scrollTop <= 60) {
                    !(lastIndex === i) && nav.find('a[href]').removeClass('current').eq(i).addClass('current');
                    lastIndex = i;
                    break;
                }
            }
        };
        var p = ele,
            nav = p.find('div[nav]'),
            content = p.find('div[content]'),
            pos = nav.offset(),
            isFixed = false,
            posArr = [],
            timer = null,
            isUpdate = true,
            lastIndex;

        var updateposArr = function(){
            isUpdate && nav.find('a[href]').each(function(i){
                posArr[i] = $($(this).attr('href')).offset().top;
            });
            clearTimeout(timer);
            isUpdate = false;
            timer = setTimeout(function(){
                isUpdate = true;
            },500);
        };

        nav.wrap('<div/>').parent().css({
            'width':nav.width(),
            'height':nav.height()
        });
        //指令调用时绑定事件
        nav.on('click',function(e){
            //如果不是点击在a链接标签上
            if(!e.target.matches('a[href^="#"]')) return ;
            //如果点击在a链接标签上
            e.preventDefault();
            var pos = $($(e.target).attr('href')).offset();
            $('html,body').animate({
                'scrollTop':pos.top-40
            },'slow');
        });
        $(window).on('scroll',listener);
        //在控制器作用域被销毁时，直接去清除事件绑定
        scope.$on('$destroy',function(e){
            $(window).off('scroll',listener);
        });
    }
});

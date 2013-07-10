$(function(){
	// 点击删除进行确认
	$(".js_deletePost").click(function(){
		return confirm('你确定删除这篇文章吗？');
	});

	// 文章目录点击
	$(".outline li").each(function(e){
		$(this).click(function(event){
	        var topPosition = $(".mdbody section h2").eq(e).offset().top;
	        $("html,body").animate({ scrollTop: topPosition-15}, 100);
			return false;
		})
	})

	// 侧边栏fix
	$.fn.smartFloat = function() {
	    var position = function(element){
	        var top = element.position().top;
	        $(window).scroll(function(){
	            var scrolls = $(this).scrollTop();
	            element.css({top: scrolls});
	        });
	    };
	    return $(this).each(function(){
	        position($(this));                         
	    });
	};
	
});

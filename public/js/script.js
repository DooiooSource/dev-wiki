$(function(){
	// 点击删除进行确认
	$(".js_deletePost").click(function(e){
		e.preventDefault();
		if (confirm('你确定删除这篇文章吗？')){ 
			location.href = location.href+"/delete";
		}
	})
	

	var category = $(".mainbody").data("category");
	$(".js_"+category).addClass("active").siblings("li").removeClass("active");

});

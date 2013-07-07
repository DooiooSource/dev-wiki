$(function(){

    // ACE Editor 

    var editor = ace.edit("editor");

    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/markdown");
    editor.renderer.setShowGutter(false);
    editor.setHighlightActiveLine(false);
    editor.getSession().setUseWrapMode(true); 
    editor.setShowPrintMargin(false);

    var code = editor.getSession().getValue();

    editor.on("change", function(){
        $("#maincontent").val(editor.getSession().getValue());
    });

    var tool = {
        'h1': '# ',
        'h2': '## ',
        'h3': '### ',
        'link': '[文字](地址)',
        'image': '![文字](图片)',
        'bold': '**texthere**',
        'italic': '_texthere_',
        'code': '```code```',
        'ul': '- ',
        'ol': '1. ',
        'blockquote': '> ',
        'hr': '***\n'
    }
    // Toolbar
    $(".js_mdinsert .btn").click(function(){
        var insertVal = $(this).data("insert");
        insertVal = tool[insertVal];
        editor.insert(insertVal);
        editor.focus();
    })



    // Write and Preivew

    $(".tab-write").click(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".panel-preview").hide();
        $(".panel-write").show();
        editor.focus();
    })
    $(".tab-preview").click(function(){

        $(this).addClass("active").siblings("li").removeClass("active");

        var blogcon = $("#maincontent").val();

        $.post("/parsemd",{"postcon": blogcon}, function(data){
            if(data !== ""){
                $(".panel-preview").html(data);
            } else {
                $(".panel-preview").html("Nothing to preview");
            }
        });

        $(".panel-preview").show();
        $(".panel-write").hide();
    });

})
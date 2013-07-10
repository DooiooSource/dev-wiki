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
    };

    // Toolbar

    $(".js_mdinsert .btn").click(function(e){
        e.preventDefault();
        var insertVal = $(this).data("insert");
        insertVal = tool[insertVal];
        editor.insert(insertVal);
        editor.focus();
    });

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


    // bind hidden file input with click event    
    $("#uploadInput").bind("change", function(){
        var fileList = this.files;
        for (var i = 0; i < fileList.length; i++) {
            sendFile(fileList[i])
        }
        return false;
    });

    // when click the link trigger input click event
    $(".js_insertImg").click(function(){
        $("#uploadInput").trigger("click");
    })

    // send file to server by XMLHttpRequest
    function sendFile(file) {
        var uri = "/fileupload";
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
         
        xhr.open("POST", uri, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Handle response.
                var databack =  jQuery.parseJSON(xhr.responseText);
                var imgMd = "![" + databack.alt + "](/photos/"+ databack.url + ")\n";
                editor.insert(imgMd);
                editor.focus();
            }
        };
        fd.append('thumbnail', file);
        xhr.send(fd);
    }    

    // 添加tag
    $('#tags').tagsInput({width:'auto'});

    // 未保存提示
    var submitClick = false;
    window.onbeforeunload = function() {
        if(!submitClick){
            return "你的文档还未保存";
        }
    }
    $(".js_postSubmit").click(function(e){
        submitClick = true;
        e.preventDefault();
        $("#postform").submit();
    });
})

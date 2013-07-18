$(function(){

    // ACE Editor 

    var editor = ace.edit("editor");

    editor.setTheme("ace/theme/github");
    editor.getSession().setMode("ace/mode/markdown");
    editor.renderer.setShowGutter(false);
    editor.setHighlightActiveLine(false);
    editor.getSession().setUseWrapMode(true); 
    editor.setShowPrintMargin(false);
    editor.setFontSize(14);

    var code = editor.getSession().getValue();

    editor.on("change", function(){
        $("#maincontent").val(editor.getSession().getValue());
    });

    var tool = {
        'h1': '# ',
        'h2': '## ',
        'h3': '### ',
        'h4': '#### ',
        'h5': '##### ',
        'link': '[文字](地址)',
        'image': '![文字](图片)',
        'bold': '**',
        'italic': '_',
        'code': '`',
        'ul': '- ',
        'ol': '1. ',
        'blockquote': '> ',
        'hr': '***\n'
    };

    // Toolbar

    $(".js_mdinsert .js_pre").click(function(e){
        e.preventDefault();

        var insertVal = $(this).data("insert");
        if($(this).data("insert") === "blockquote"){
            var sel = editor.session.getTextRange(editor.getSelectionRange());
        } else {
            if(editor.selection.isMultiLine()){
                var sel = editor.session.getTextRange(editor.getSelectionRange()).replace(/\n/gm, '\n'+tool[insertVal]);
            } else {
                var sel = editor.session.getTextRange(editor.getSelectionRange());
            }
        }
        insertVal = tool[insertVal] + sel;

        editor.insert(insertVal);
        editor.focus();
    });

    $(".js_mdinsert .js_wrap").click(function(e){
        e.preventDefault();
        var insertVal = $(this).data("insert");
        var sel = editor.session.getTextRange(editor.getSelectionRange());
        insertVal = tool[insertVal] + sel + tool[insertVal];
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

    $(".js_help").click(function(e){
        e.preventDefault();
        $(".js_helpbody").slideToggle('fast');
    })


    // bind hidden file input with click event    
    $("#uploadInput").bind("change", function(){
        var fileList = this.files;
        for (var i = 0; i < fileList.length; i++) {
            sendFile(fileList[i])
        }
        return false;
    });

    // when click the link trigger input click event
    $(".js_insertImg").click(function(e){
        e.preventDefault();
        $("#uploadInput").trigger("click");
    })

    $(".js_insertMdLink").click(function(e){
        e.preventDefault();
        var mdLinkStr = '['+ $(".js_linktext").val() +']('+ $(".js_linkurl").val() +')';
            $('#mdLinkModal').modal('hide')
            editor.insert(mdLinkStr);
            editor.focus();
    })

    // $(".js_insertLink").modal();

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

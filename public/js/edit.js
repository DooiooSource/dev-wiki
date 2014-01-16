$(function(){

    // var converter1 = Markdown.getSanitizingConverter();
    var converter1 = new Markdown.Converter();
    Markdown.Extra.init(converter1, {
        extensions: "all",
        highlighter: "prettify"
    });
    
    var PagedownEditor = new Markdown.Editor(converter1);
    PagedownEditor.hooks.chain("onPreviewRefresh", prettyPrint); // google code prettify
    var AceEditor = ace.edit("wmd-input");

    AceEditor.setTheme("ace/theme/textmate");
    AceEditor.getSession().setMode("ace/mode/markdown");
    AceEditor.renderer.setShowGutter(false);
    AceEditor.setHighlightActiveLine(false);
    AceEditor.getSession().setUseWrapMode(true); 
    AceEditor.setShowPrintMargin(false);
    AceEditor.setFontSize(14);
    // AceEditor.setKeyboardHandler("ace/keyboard/vim");
    AceEditor.on("change", function(){
        $("#maincontent").val(AceEditor.getSession().getValue());
    });

    PagedownEditor.run(AceEditor);




    function getScrollHeight($prevFrame) {
        // Different browsers attach the scrollHeight of a document to different
        // elements, so handle that here.
        if ($prevFrame[0].scrollHeight !== undefined) {
            return $prevFrame[0].scrollHeight;
        } else if ($prevFrame.find('html')[0].scrollHeight !== undefined &&
                   $prevFrame.find('html')[0].scrollHeight !== 0) {
            return $prevFrame.find('html')[0].scrollHeight;
        } else {
            return $prevFrame.find('body')[0].scrollHeight;
        }
    }
    // 同步编辑和预览位置
    function syncPreview() {
        var $ed = AceEditor;
        var $prev = $('.editor-preview');

        var editorScrollRange = ($ed.getSession().getLength());

        var previewScrollRange = (getScrollHeight($prev));

        // Find how far along the editor is (0 means it is scrolled to the top, 1
        // means it is at the bottom).
        var scrollFactor = $ed.getFirstVisibleRow() / editorScrollRange;

        // Set the scroll position of the preview pane to match.  jQuery will
        // gracefully handle out-of-bounds values.
        $prev.scrollTop(scrollFactor * previewScrollRange);
    }

    AceEditor.session.on('changeScrollTop', syncPreview);
    AceEditor.session.selection.on('changeCursor', syncPreview);

    $(".dropdown-menu li a").click(function(){
        $("#category").val($(this).data('cate'));
        $(".dropdown-toggle .select-text").text($(this).text());
    })

    $(".js_submitPost").click(function(e){
        e.preventDefault();
        if($("#category").val() == ''){
            alert("请选择分类");
        }else if($("#title").val() == ''){
            alert("标题不能为空");
        }else{
            $("#postform").submit();
        }
    })




})
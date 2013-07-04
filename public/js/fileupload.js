/*
Functions:
	1. use input to select files then upload
	2. Drap files from desktop to upload them
	3. checkout if server had the file
	4. Identifying that the file to be uploaded is the same one already partially uploaded.
*/


$(function(){

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
                var dropzone = $("#editor");
                var databack =  jQuery.parseJSON(xhr.responseText);
                var imgMd = "![" + databack.alt + "](/photos/"+ databack.url + ")\n";
                insertAtCursor(dropzone.get(0), imgMd);
            }
        };
        fd.append('thumbnail', file);
        xhr.send(fd);
    }


    function insertAtCursor(myField, myValue){
        editor.insert(myValue);
    }



    // drag upload files
    var dropzone = $("#editor");
    var highlight = $(".panel-write");
    dropzone.get(0).ondragover = dropzone.get(0).ondragenter = function(event) {
        event.stopPropagation();
        event.preventDefault();
        highlight.addClass("border-blue");
    }

    dropzone.get(0).ondragleave = function(event){
        event.stopPropagation();
        event.preventDefault();
        highlight.removeClass("border-blue");
    }

    dropzone.get(0).ondrop = function(event) {
        event.stopPropagation();
        event.preventDefault();

        var filesArray = event.dataTransfer.files;
        for (var i=0; i<filesArray.length; i++) {
            sendFile(filesArray[i]);
        }
    }
})

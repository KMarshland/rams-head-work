

function initializeUploads(direct_post_url, form_data){

    function log() {
        for (var i = 0; i < arguments.length; i++){
            // console.log(arguments[i]);
        }
    }
    
    // Parameters
    var self = this;
    self.direct_post_url = direct_post_url;
    self.form_data = form_data;


    $('.upload-input').each(function(i, elem) {
        var fileInput = $(elem);

        if (fileInput.data('initialized')){
            return;
        } else {
            fileInput.data('initialized', true);
        }

        var form         = $(fileInput.parents('form:first'));
        var submitButton = form.find('input[type="submit"]');
        var progressBar  = $('<div class="progress-bar progress-bar-success" style="width:0%;"></div>');
        var barContainer = $('<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>').append(progressBar);
        if (fileInput.parent().is('.fileinput-button')){
            barContainer.insertAfter(fileInput.parent());
        } else {
            barContainer.insertAfter(fileInput);
        }
        barContainer.hide();

        var filename;

        var informationResults = [];
        var onFileChange = function (e) {//store the file size, in MB
            var files = e.currentTarget.files; // puts all files into an array
            var filesizes = Array.prototype.map.call(files, function (file) {
                ((file.size/1024)/1024).toFixed(4); // MB
            });
            $(this).data('filesizes', filesizes);
            informationResults = [];
        };
        $(fileInput).on("change", onFileChange);
        $(fileInput).on("fileuploadadd", onFileChange);

        fileInput.fileupload({
            fileInput: fileInput,
            url: direct_post_url,
            type: 'POST',
            autoUpload: false,
            formData: form_data,
            paramName: 'file', // S3 does not like nested name fields i.e. name="user[avatar_url]"
            replaceFileInput: false,
            progressall: function (e, data) {
                var progress = parseInt(data.loaded / data.total * 100, 10);
                progressBar.css('width', progress + '%');
            },
            add: function (e, data) {
                if (e.delegatedEvent.handleObj.type == 'drop' && fileInput.data('forbid-drop')){
                    return;
                }

                //check if the file is too large
                var maxFileSize = 10;
                filename = data.files[0].name || (fileInput.val() || '').split(/(\\|\/)/g).pop(); //extract the filename from the file input

                for (var i = 0; i < fileInput.data('filesizes').length; i++) {
                    if (fileInput.data('filesizes')[i] > maxFileSize) {
                        var errMsg = "Please upload a file under 10MB";
                        barContainer.fadeIn();
                        submitButton.prop('disabled', false);
                        progressBar.css('width', 100 + '%');
                        progressBar.css('color', '#FFF');
                        progressBar.css("background", "red").html(errMsg);
                        fileInput.wrap('<form>').closest('form').get(0).reset();
                        fileInput.unwrap();
                        return;
                    }
                }

                data.submit();
            },
            start: function (e) {
                submitButton.prop('disabled', true);

                barContainer.addClass('progress-striped');
                barContainer.addClass('active');
                progressBar.css('width', '0%').text('');
                barContainer.fadeIn();
            },
            done: function (e, data) {
                submitButton.prop('disabled', false);
                progressBar.text('Processing...');

                // extract key and generate URL from response
                log("AWS Response: ", data);
                var aws_key = $(data.jqXHR.responseXML).find("Key").text();
                var aws_url = $(data.jqXHR.responseXML).find("Location").text();
                log("DONE. Key is " + aws_key + "; url is " + aws_url);

                //reset the input
                fileInput.wrap('<form>').closest('form').get(0).reset();
                fileInput.unwrap();

                var bytes = data.total;
                var niceSize = 0;
                if (bytes < 1e3) {
                    niceSize = Math.round(bytes) + ' bytes';
                } else if (bytes < 1e6){
                    niceSize = Math.round(bytes / 1e3) + ' KB';
                } else if (bytes < 1e9){
                    niceSize = Math.round(bytes / 1e6) + ' MB';
                } else if (bytes < 1e12){
                    niceSize = Math.round(bytes / 1e9) + ' GB';
                } else {
                    niceSize = Math.round(bytes / 1e12) + ' TB';
                }

                var info = {
                    aws_key: aws_key,
                    aws_url: aws_url,
                    url: aws_url,
                    filename: filename,
                    filesize: data.total,
                    filesize_pretty: niceSize
                };

                fileInput.trigger('upload', info);

                if (informationResults.length === data.originalFiles.length || data.originalFiles.length === 1){
                    progressBar.text("Upload Complete");
                    barContainer.removeClass('active');
                    barContainer.removeClass('progress-striped');

                    fileInput.trigger('upload-all', informationResults);
                }
            },
            fail: function (e, data) {
                submitButton.prop('disabled', false);
                progressBar.css("background", "red").text("Failed");
                fileInput.wrap('<form>').closest('form').get(0).reset();
                fileInput.unwrap();

                swal({
                    title: 'Error uploading file',
                    type: 'error',
                    text: 'Something went wrong -- send the below message to the developer. ' +
                    'In the meantime, refresh the page and try again. ' +
                    '<textarea disabled class="form-control">' + JSON.stringify(data) + '</textarea>' +
                    'If the problem persists, make sure you\'re using Chrome and try disabling any extensions ' +
                    '(Problems have been reported with HTTPSEverywhere and some adblockers) .',
                    html: true
                });
            }
        });
    });

}
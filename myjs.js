//window.location.reload();
function syncAjax(u) {
    var obj = $.ajax(
            {url: u,
                async: false
            }
    );
    return $.parseJSON(obj.responseText);

}

$(function() {
 
                      $.ajaxSetup ({
                                   cache: false
                                   });
 
                      $.support.cors = true;
 
                      });
 
                    $(document).bind('mobileinit', function() {
 
                                     $.mobile.allowCrossDomainPages = true;
 
                                     });
 
                    $('#main').live('pageinit', function(event) {
 
                                    $('#browse_photo').click(function() {
 
                                                             navigator.camera.getPicture(uploadPhoto, function(message) {
                                                                                         alert('get picture failed');
                                                                                         },{ quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY });
 
                                                             });
 
                                    $('#take_photo').click(function() {
 
                                                           navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});
 
                                                           });
 
                                    });
 
                    $('#view').live('pageinit', function(event) {
 
                                    $.get('http://www.domain.com/view.php', function (data) {
 
                                          $('#photos').html(data.responseText);
 
                                          });
 
                                    });
 
                    function captureError(error) {
 
                        $('#loading').hide();
 
                        var msg = 'An error occurred during capture: ' + error.code;
                        navigator.notification.alert(msg, null, 'Uh oh!');
                    }
 
                    function captureSuccess(mediaFiles) {
 
                        var i, len;
                        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                            uploadFile(mediaFiles[i]);
                        }
 
                        $('#loading').show();
 
                    }
 
                    function uploadFile(mediaFile) {
                        var ft = new FileTransfer(),
                        path = mediaFile.fullPath,
                        name = mediaFile.name;
 
                        ft.upload(path, "http://www.domain.com/upload.php", function(result) {
 
                                  //var msg = result.bytesSent + ' bytes sent';
                                  //navigator.notification.alert(msg, null, 'Upload success');
 
                                  sessionStorage.setItem('filename', result.response);
                                  findLocation();
 
                                  $('#loading').hide();
 
                                  }, function(error) {
 
                                  $('#loading').hide();
 
                                  var msg = 'Error uploading file ' + path + ': ' + error.code;
                                  navigator.notification.alert(msg, null, 'Error');
 
                                  },{ fileName: name, fileKey: 'file' });  
                    }
 
                    function uploadPhoto(imageURI) {
 
                        $('#loading').show();
 
                        var options = new FileUploadOptions();
                        options.fileKey="file";
                        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                        options.mimeType="image/jpeg";
 
                        var params = new Object();
                        params.value1 = "test";
                        params.value2 = "param";
 
                        options.params = params;
 
                        var ft = new FileTransfer();
                        ft.upload(imageURI, "http://www.domain.com/upload.php", win, fail, options);
 
                    }
 
                    function win(result) {
 
                        $('#loading').hide();
 
                        //var msg = result.bytesSent + ' bytes sent';
                        //navigator.notification.alert(msg, null, 'Upload success');
 
                        sessionStorage.setItem('filename', result.response);
 
                        findLocation();
 
                    }
 
                    function fail(error) {
 
                        $('#loading').hide();
 
                        var msg = 'An error has occurred: Code = ' + error.code;
                        navigator.notification.alert(msg, null, 'Error');
 
                    }
 
function check_save(name, email, number)
{
    var u = "http://50.63.128.135/~csashesi/class2015/kutorkor-kotey-afutu/midsem_project/event_action.php?cmd=1&name=" + name + "&email=" + email + "&number=" + number;
//     prompt("u",u);
    return syncAjax(u);
}

function save()
{
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var r = check_save(name, email, number);

    if (r.result === 1)
    {
        alert("successfully added");
    }

    else if (r.result === 0)
    {
        alert("sorry please try again");
    }

}



function admin_view()
{
    document.location.href = "admin_view.php";
}

function saveDone(data) {
    alert(data);
}


function check_login_admin(user_name,password)
{
    var u = ("http://50.63.128.135/~csashesi/class2015/kutorkor-kotey-afutu/midsem_project/event_action.php?cmd=3&user_name=" + user_name + "&password=" + password);
//    prompt("u",u);
    return syncAjax(u);
}

function login_admin()
{
    var user_name = document.getElementById("user_name").value;
    var password = document.getElementById("password").value;
    // Alter the URL: http://example.com/#foo => http://example.com/#bar
   
    var r = check_login_admin(user_name,password);

    if(r.result === 1)  
    { 
        
//        debugger;
         $.mobile.navigate( "#admin_view" );
    }
    
    else if(r.result===0)
    {
//            prompt("he");
        
        alert("login unsuccessful");  
    }

}

$(document).on("pagecreate", "#admin_view", function () {
//    alert("hrrerrrr");

    var r = syncAjax("http://50.63.128.135/~csashesi/class2015/kutorkor-kotey-afutu/midsem_project/event_action.php?cmd=2");

    for (var i in r)
    {
        var blogpost = '<div data-role="collapsible" data-collapsed="true"><h3>' + r[i].name + '</h3>'
                + '<p>Email: ' + r[i].email + '<br>Phone Number:'
                + r[i].number + '</p></div>';

        $('#participant').append(blogpost).trigger("create");
    }
});


//});

$( document ).ready( function () {
    var bcsVersion;
    var processes;
    /*
        When a BCS url is entered, verify that it is running 4.0
    */
    $('#bcs').on('change', function (event) {
        $.get(event.target.value + '/api/device', function (data) {
            if(data.version === '4.0.0') {
                bcsVersion = data.type;
                $('#bcs').parent().addClass('has-success').removeClass('has-error');
                
                $('#process').html = "";
                processes = [];
                async.times(8, function (id, next) {
                    $.get(event.target.value + '/api/process/' + id, function (data) {
                        processes.push({id: id, name: data.name});
                        next();
                    });
                },
                function (done) {
                    processes.sort(function (a,b) { a.id - b.id });
                    processes.forEach( function (e) {
                        $('#process').append("<option value=" + e.id + ">" + e.id + " - " + e.name + "</option>");
                    });
                });
                
            } else {
                $('#bcs').parent().addClass('has-error').removeClass('has-success');            
            }
            
            
        })
        .fail(function () {
            $('#bcs').parent().addClass('has-error').removeClass('has-success');
        });
    });
    
    $('#configFile').on('change', function (event) {
        if(event.target.files[0].size) {
           $('#configFile').parent().addClass('has-success').removeClass('has-error');
        } else {
           $('#configFile').parent().addClass('has-error').removeClass('has-success'); 
        }
    });
    
    /*
        If the URL and File are valid, enable the button
    */
    $('form').on('change', function (event) {
       if( $('div.has-success #bcs').length && $('div.has-success #configFile').length ) {
           $('button').removeClass('disabled');
       } else {
           $('button').addClass('disabled');
       }
    });
    
    /*
        When the button is clicked, submit the file to the web service.
        When the response comes back, pop up a modal dialog for status and
        send all the required configs to the BCS.
    */
    $('button').on('click', function (event) {
        event.preventDefault();
       
        var dialog = $('#dialog .modal-body');
        dialog.empty();
       
        $('#dialog').modal('show');
        
        // Submit fhe file to the web service (see routes/migrate.js)
        $('form').ajaxSubmit({success: function (data) {
            if(data.type !== 'unknown') {
               
                dialog.append("Found valid <strong>" + data.type + "</strong> configuration.<br>");
               
                if(data.device !== bcsVersion) {
                    dialog.append("<div>Device mismatch.  Config for <strong>" + data.device + 
                    "</strong>.  Device <strong>" + bcsVersion + "</strong>. Loading anyway, may result in errors.");
                }
                
                dialog.append($('#progress').html());
               
                if(data.type === 'process') {
                
                    dialog.append($('#process-selector').html());
                    $('#update-process').on('click', function (event) {
                        event.preventDefault();
                        $(event.target).addClass('disabled');
                        var id = dialog.find('select')[0].value;
                        var config = data.config.map(function (e) {
                            e.endpoint = e.endpoint.replace(':id', id);
                            return e;
                        });
                        
                        updateDevice(dialog, config);
                    });
                
                } else {
                   updateDevice(dialog, data.config);
                }
               
            }
        }});
    });
});

var updateDevice = function(dialog, config) {
    var percent = 100 / config.length;
    var successBar = dialog.find('.progress-bar-success')[0];
    var dangerBar = dialog.find('.progress-bar-danger')[0];
    
    config.forEach(function (element) {
        var id = "elem-" + element.endpoint.replace(/\//g, '-');
        
        dialog.append('<div class="row" id="' + id + '"><div class="col-6 col-lg-8">Updating ' + element.endpoint + ' ... </div></div>');
        
        $.post($('#bcs')[0].value + "/api/" + element.endpoint, JSON.stringify(element.data), null, 'json')
        .done(function (data) {
            dialog.find('#' + id).append('<div class="col-6 col-lg-4"><span class="label label-success">Done</span></div>');
            $(successBar).attr('aria-valuenow', parseFloat($(successBar).attr('aria-valuenow')) + percent );
            $(successBar).css('width', $(successBar).attr('aria-valuenow') + '%');
        })
        .fail(function () {
            dialog.find('#' + id).append('<div class="col-6 col-lg-4"><span class="label label-danger">Failed</span></div>');
            $(dangerBar).attr('aria-valuenow', parseFloat($(dangerBar).attr('aria-valuenow')) + percent );
            $(dangerBar).css('width', $(dangerBar).attr('aria-valuenow') + '%');
        });
    });
};

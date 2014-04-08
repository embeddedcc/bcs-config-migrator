/*! bcs-config-migrator - v0.0.1 - 2014-04-08 */var Migrator=function(){var a=function(a,b){var e,f=[];b=b||function(){},e=new FileReader,e.addEventListener("load",function(a){var e,g="unknown";f=a.target.result.toString().split(","),g=666===f.length?"system":1267===f.length?"process":"unknown","system"===g?e=c(f):"process"===g&&(e=d(f)),b({type:g,device:f[0].substring(0,7),config:e})}),e.readAsText(a)},b=function(a){return parseInt(a)?!0:!1},c=function(a){var c,d,e=[];for(e.push({endpoint:"device",data:{name:(a[1]+a[2]).trim()}}),e.push({endpoint:"system",data:{celsius:b(a[203]),alarm_to_reg10:b(a[231]),require_auth:b(a[188])}}),d=0;18>d;d++)e.push({endpoint:"output/"+d,data:{name:a[3+d].trim(),enabled:parseInt(a[127+d%6])&1<<d/6?!0:!1}});for(d=0;8>d;d++)e.push({endpoint:"din/"+d,data:{name:a[21+d].trim(),enabled:parseInt(a[107+d%4])&1<<d/4?!0:!1,oneshot:parseInt(a[203])&1<<d?!0:!1}});for(d=0;8>d;d++)c=4>d?353:437,e.push({endpoint:"temp/"+d,data:{name:a[29+d].trim(),enabled:parseInt(a[133+d%4])&1<<d/4?!0:!1,coefficients:[1e-10*parseFloat(a[c+d]),1e-10*parseFloat(a[c+d+4]),1e-10*parseFloat(a[c+d+8])]}});for(d=0;8>d;d++)e.push({endpoint:"process/"+d,data:{run_on_startup:parseInt(a[197+d%4])&1<<d/4?!0:!1}});for(d=0;8>d;d++)for(var f=0;8>f;f++){for(var g=[],h=0;6>h;h++)g[h]={heat:b(a[175+h]),input:parseInt(a[169+h]),swing:parseInt(a[274+h])};e.push({endpoint:"process/"+d+"/state/"+f+"/output_controllers",data:g})}for(d=0;6>d;d++)e.push({endpoint:"pid/"+d,data:{proportional_gain:parseFloat(a[365+d])/100,integral_gain:parseFloat(a[371+d])/100,derivative_gain:parseFloat(a[377+d])/100,integral_max:parseFloat(a[383+d])/100,integral_min:parseFloat(a[389+d])/100,output_period:parseInt(a[282+d]),sample_period:parseInt(a[286+d]),pulse_width_min:parseInt(a[206+d]),pulse_width_max:parseInt(a[212+d])}});var i=parseInt(a[226]);switch(i){case 0:break;case 1:e.push({endpoint:"igniter/0",data:{outputs:[0],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 2:e.push({endpoint:"igniter/0",data:{outputs:[0,1],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 3:e.push({endpoint:"igniter/0",data:{outputs:[0,1,2],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 4:e.push({endpoint:"igniter/0",data:{outputs:[0],igniter:3,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}}),e.push({endpoint:"igniter/1",data:{outputs:[1],igniter:4,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}}),e.push({endpoint:"igniter/2",data:{outputs:[2],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 7:e.push({endpoint:"igniter/2",data:{outputs:[2],igniter:null,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});case 6:e.push({endpoint:"igniter/1",data:{outputs:[1],igniter:null,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});case 5:e.push({endpoint:"igniter/0",data:{outputs:[0],igniter:null,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}})}var j=function(b,c){var d=parseInt(a[473+3*b+Math.floor(c/2)])>>(c%2===0?0:4)&65535;return{wire:d>>12,type:15&d,number:127&d,nc:128&d?!0:!1}};for(d=0;40>d;d++)e.push({endpoint:"ladder/"+d,data:{slots:[j(d,0),j(d,1),j(d,2),j(d,3),j(d,4)]}});return e},d=function(a){var c=[];c.push({endpoint:"process/:id",data:{name:a[1].trim()}});for(var d=0;4>d;d++)c.push({endpoint:"process/:id/win/"+d,data:{name:a[14+d].trim()}}),c.push({endpoint:"process/:id/timer/"+d,data:{name:a[10+d].trim()}});for(d=0;8>d;d++)c.push({endpoint:"process/:id/state/"+d,data:{name:a[2+d].trim(),ramp:{enable:b(a[130+124*d]),output:parseInt(a[131+124*d]),start:parseInt(a[1029+32*d]),end:parseInt(a[1039+32*d]),time:parseInt(a[1040+32*d])},state_alarm:b(a[133+124*d]),email_alarm:b(a[262]),timers:e(a,d)}}),c.push({endpoint:"process/:id/state/"+d+"/exit_conditions",data:f(a,d)}),c.push({endpoint:"process/:id/state/"+d+"/output_controllers",data:j(a,d)});return c},e=function(a,c){for(var d=[],e=0;4>e;e++)d.push({used:b(a[36+e+124*c]),count_up:b(a[40+e+124*c]),preserve:b(a[134+124*c]&1<<e),init:parseInt(a[1010+e+32*c])});return d},f=function(a,b){for(var c=[],d=0;4>d;d++){var e=g(a,b,d);c.push({enabled:0!==e?!0:!1,source_type:e,source_number:h(a,b,d,e),next_state:parseInt(a[114+d+124*b]),condition:parseInt(a[126+d+124*b]),value:i(a,b,d,e)})}return c},g=function(a,b,c){return a.slice(50+4*c+124*b,54+4*c+124*b).reduce(function(a,b){return a+b})>0?1:a.slice(66+4*c+124*b,70+4*c+124*b).reduce(function(a,b){return a+b})>0?2:a.slice(82+4*c+124*b,86+4*c+124*b).reduce(function(a,b){return a+b})>0?3:a.slice(98+4*c+124*b,102+4*c+124*b).reduce(function(a,b){return a+b})>0?4:0},h=function(a,b,c,d){var e;switch(d){case 0:return 0;case 1:for(e=0;4>e;e++){if(1&parseInt(a[50+e+4*c+124*b]))return e;if(2&parseInt(a[50+e+4*c+124*b]))return e+4}break;case 2:for(e=0;4>e;e++)if(1===parseInt(a[66+e+4*c+124*b]))return e;break;case 3:for(e=0;4>e;e++){if(1&parseInt(a[82+e+4*c+124*b]))return e;if(2&parseInt(a[82+e+4*c+124*b]))return e+4}break;case 4:for(e=0;4>e;e++)if(1===parseInt(a[98+e+4*c+124*b]))return e}},i=function(a,b,c,d){switch(d){case 0:case 4:return 0;case 1:return parseInt(a[1020+c+32*b]);case 2:return parseInt(a[1024+c+32*b]);case 3:return parseInt(a[118+c+124*b])}return 0},j=function(a,b){for(var c,d=[],e=0;6>e;e++){switch(parseInt(a[18+e+124*b])){case 0:case 1:c=parseInt(a[44+e+124*b])?1:0;break;case 2:c=parseInt(a[44+e+124*b]);break;case 3:case 4:c=parseInt(a[1014+e+32*b])}d.push({mode:parseInt(a[18+e+124*b]),input:parseInt(a[31+e+32*b]),setpoint:c})}return d};return{migrate:a}}();!function(){var a=function(a,b){var c=100/b.length,d=a.find(".progress-bar-success")[0],e=a.find(".progress-bar-danger")[0];async.eachLimit(b,2,function(b,f){var g="elem-"+b.endpoint.replace(/\//g,"-");a.append('<div class="row" id="'+g+'"><div class="col-6 col-md-8">Updating '+b.endpoint+" ... </div></div>"),$.post($("#bcs")[0].value+"/api/"+b.endpoint,JSON.stringify(b.data),null,"json").done(function(){a.find("#"+g).append('<div class="col-6 col-md-4 pull-right"><span class="pull-right label label-success">Done</span></div>'),$(d).attr("aria-valuenow",parseFloat($(d).attr("aria-valuenow"))+c),$(d).css("width",$(d).attr("aria-valuenow")+"%"),f()}).fail(function(){a.find("#"+g).append('<div class="col-6 col-md-4 pull-right"><span class="pull-right label label-danger">Failed</span></div>'),$(e).attr("aria-valuenow",parseFloat($(e).attr("aria-valuenow"))+c),$(e).css("width",$(e).attr("aria-valuenow")+"%"),f()})})};$(document).ready(function(){var b,c;$("#bcs").on("change",function(a){$.get(a.target.value+"/api/device",function(d){"4.0.0"===d.version?(b=d.type,localStorage["bcs-backup.url"]=a.target.value,$("#bcs").parent().addClass("has-success").removeClass("has-error"),$("#process").html="",c=[],async.times(8,function(b,d){$.get(a.target.value+"/api/process/"+b,function(a){c.push({id:b,name:a.name}),d()})},function(){c.sort(function(a,b){return a.id-b.id}),c.forEach(function(a){$("#process").append("<option value="+a.id+">"+a.id+" - "+a.name+"</option>")})})):$("#bcs").parent().addClass("has-error").removeClass("has-success")}).fail(function(){$("#bcs").parent().addClass("has-error").removeClass("has-success")})}),$("#configFile").on("change",function(a){a.target.files[0].size?$("#configFile").parent().addClass("has-success").removeClass("has-error"):$("#configFile").parent().addClass("has-error").removeClass("has-success")}),$("form").on("change",function(){$("div.has-success #bcs").length&&$("div.has-success #configFile").length?$("button").removeClass("disabled"):$("button").addClass("disabled")}),$("button").on("click",function(c){c.preventDefault();var d=$("#dialog .modal-body");d.empty(),$("#dialog").modal("show"),Migrator.migrate($("#configFile")[0].files[0],function(c){"unknown"!==c.type?(d.append('<div class="alert alert-success">Found valid <strong>'+c.type+"</strong> configuration.</div>"),c.device!==b&&d.append('<div class="alert alert-warning">Device mismatch.  Loading anyway, may result in errors. <ul><li>Config file version: <strong>'+c.device+"</strong></li><li>Device version: <strong>"+b+"</strong></li></div>"),d.append($("#progress").html()),"process"===c.type?(d.append($("#process-selector").html()),$("#update-process").on("click",function(b){b.preventDefault(),$(b.target).addClass("disabled");var e=d.find("select")[0].value,f=c.config.map(function(a){return a.endpoint=a.endpoint.replace(":id",e),a});a(d,f)})):a(d,c.config)):d.append('<div class="alert alert-danger">Invalid configuration file found</div>')})}),localStorage["bcs-backup.url"]&&($("[data-name=bcs]").val(localStorage["bcs-backup.url"]),$("[data-name=bcs]").change())})}();
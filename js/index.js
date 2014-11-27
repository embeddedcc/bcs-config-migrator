/*! bcs-config-migrator - v0.0.1 - 2014-11-26 */var Migrator=function(){var a=function(a,b){var e,f=[];b=b||function(){},e=new FileReader,e.addEventListener("load",function(a){var e,g="unknown";f=a.target.result.toString().split(","),g=666===f.length?"system":1267===f.length?"process":"unknown","system"===g?e=c(f):"process"===g&&(e=d(f)),b({type:g,device:f[0].substring(0,7),config:e})}),e.readAsText(a)},b=function(a){return parseInt(a)?!0:!1},c=function(a){var c,d,e=[];for(e.push({endpoint:"device",data:{name:(a[1]+a[2]).trim()}}),e.push({endpoint:"system",data:{celsius:b(a[203]),alarm_to_reg10:b(a[231])}}),d=0;18>d;d++)e.push({endpoint:"output/"+d,data:{name:a[3+d].trim(),enabled:parseInt(a[127+d%6])&1<<d/6?!0:!1}});for(d=0;8>d;d++)e.push({endpoint:"din/"+d,data:{name:a[21+d].trim(),enabled:parseInt(a[107+d%4])&1<<d/4?!0:!1,oneshot:parseInt(a[203])&1<<d?!0:!1}});for(d=0;8>d;d++)c=4>d?353:437,e.push({endpoint:"temp/"+d,data:{name:a[29+d].trim(),enabled:parseInt(a[133+d%4])&1<<d/4?!0:!1,coefficients:[1e-10*parseFloat(a[c+d%4]),1e-10*parseFloat(a[c+d%4+4]),1e-10*parseFloat(a[c+d%4+8])]}});for(d=0;8>d;d++)e.push({endpoint:"process/"+d,data:{run_on_startup:parseInt(a[197+d%4])&1<<d/4?!0:!1}});for(d=0;8>d;d++)for(var f=0;8>f;f++){for(var g=[],h=0;6>h;h++)g[h]={heat:b(a[175+h]),input:parseInt(a[169+h]),swing:parseInt(a[274+h])};e.push({endpoint:"process/"+d+"/state/"+f+"/output_controllers",data:g})}for(d=0;6>d;d++)e.push({endpoint:"pid/"+d,data:{proportional_gain:parseFloat(a[365+d])/100,integral_gain:parseFloat(a[371+d])/100,derivative_gain:parseFloat(a[377+d])/100,integral_max:parseFloat(a[383+d])/100,integral_min:parseFloat(a[389+d])/100,output_period:parseInt(a[282+d]),sample_period:parseInt(a[286+d]),pulse_width_min:parseInt(a[206+d]),pulse_width_max:parseInt(a[212+d])}});var i=parseInt(a[226]);switch(i){case 0:break;case 1:e.push({endpoint:"igniter/0",data:{outputs:[0],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 2:e.push({endpoint:"igniter/0",data:{outputs:[0,1],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 3:e.push({endpoint:"igniter/0",data:{outputs:[0,1,2],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 4:e.push({endpoint:"igniter/0",data:{outputs:[0],igniter:3,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}}),e.push({endpoint:"igniter/1",data:{outputs:[1],igniter:4,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}}),e.push({endpoint:"igniter/2",data:{outputs:[2],igniter:5,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});break;case 7:e.push({endpoint:"igniter/2",data:{outputs:[2],igniter:null,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});case 6:e.push({endpoint:"igniter/1",data:{outputs:[1],igniter:null,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}});case 5:e.push({endpoint:"igniter/0",data:{outputs:[0],igniter:null,holdoff:10*parseInt(a[227]),time:10*parseInt(a[228])}})}var j=function(b,c){var d=parseInt(a[473+3*b+Math.floor(c/2)])>>(c%2===0?0:16)&65535;return{wire:d>>12,type:(3840&d)>>8,number:127&d,nc:128&d?!0:!1}};for(d=0;40>d;d++)e.push({endpoint:"ladder/"+d,data:{slots:[j(d,0),j(d,1),j(d,2),j(d,3),j(d,4)]}});return e},d=function(a){var c=[];c.push({endpoint:"process/:id",data:{name:a[1].trim()}});for(var d=0;4>d;d++)c.push({endpoint:"process/:id/timer/"+d,data:{name:a[10+d].trim()}});for(d=0;8>d;d++)c.push({endpoint:"process/:id/state/"+d,data:{name:a[2+d].trim(),ramp:{enable:b(a[130+124*d]),output:parseInt(a[131+124*d]),start:parseInt(a[1029+32*d]),end:parseInt(a[1039+32*d]),time:parseInt(a[1040+32*d])},state_alarm:parseInt(a[132+124*d]),email_alarm:b(a[137+124*d]),timers:e(a,d)}}),c.push({endpoint:"process/:id/state/"+d+"/exit_conditions",data:f(a,d)}),c.push({endpoint:"process/:id/state/"+d+"/output_controllers",data:k(a,d)}),"BCS-462"===a[0].substring(0,7)&&c.push({endpoint:"process/:id/state/"+d+"/boolean_outputs",data:l(a,d)});return c},e=function(a,c){for(var d=[],e=0;4>e;e++)d.push({used:b(a[36+e+124*c]),count_up:b(a[40+e+124*c]),preserve:b(a[134+124*c]&1<<e),init:parseInt(a[1010+e+32*c])});return d},f=function(a,b){for(var c=[],d=0;4>d;d++){var e=h(a,b,d);c.push(0!==e?{enabled:!0,source_type:e,source_number:i(a,b,d,e),next_state:parseInt(a[114+d+124*b]),condition:g(parseInt(a[126+d+124*b])),value:j(a,b,d,e)}:{enabled:!1})}return c},g=function(a){return 2>a?a:a-2},h=function(a,b,c){return a.slice(50+4*c+124*b,54+4*c+124*b).reduce(function(a,b){return a+b})>0?1:a.slice(66+4*c+124*b,70+4*c+124*b).reduce(function(a,b){return a+b})>0?2:a.slice(82+4*c+124*b,86+4*c+124*b).reduce(function(a,b){return a+b})>0?3:0},i=function(a,b,c,d){var e;switch(d){case 0:return 0;case 1:for(e=0;4>e;e++){if(1&parseInt(a[50+e+4*c+124*b]))return e;if(2&parseInt(a[50+e+4*c+124*b]))return e+4}break;case 2:for(e=0;4>e;e++)if(1===parseInt(a[66+e+4*c+124*b]))return e;break;case 3:for(e=0;4>e;e++){if(1&parseInt(a[82+e+4*c+124*b]))return e;if(2&parseInt(a[82+e+4*c+124*b]))return e+4}}},j=function(a,b,c,d){switch(d){case 0:case 4:return 0;case 1:return parseInt(a[1020+c+32*b]);case 2:return parseInt(a[1024+c+32*b]);case 3:return parseInt(a[118+c+124*b])}return 0},k=function(a,c){for(var d,e,f=[],g=0;6>g;g++){switch(e=parseInt(a[18+g+124*c])){case 1:d=parseInt(a[44+g+124*c])?1:0;break;case 2:d=parseInt(a[44+g+124*c]);break;case 3:case 4:d=parseInt(a[1014+g+32*c])}f.push(0!==e?{mode:parseInt(a[18+g+124*c]),input:parseInt(a[31+g+32*c]),setpoint:d}:{mode:0})}if("BCS-462"===a[0].substring(0,7)){var h=parseInt(a[1035+32*c]),i=parseInt(a[1036+32*c]);for(g=0;2>g;g++)f.push(h&1<<g?{mode:1,setpoint:b(i&1<<g)}:{mode:0})}return f},l=function(a,c){for(var d=[],e=parseInt(a[1035+32*c]),f=parseInt(a[1036+32*c]),g=2;12>g;g++)d.push({enabled:b(e&1<<g),value:b(f&1<<g)});return d};return{migrate:a}}();!function(){var a={},b=function(b,c){var d=100/c.length,e=b.find(".progress-bar-success")[0],f=b.find(".progress-bar-danger")[0];async.eachLimit(c,2,function(c,g){var h="elem-"+c.endpoint.replace(/\//g,"-");b.append('<div class="row" id="'+h+'"><div class="col-6 col-md-8">Updating '+c.endpoint+" ... </div></div>"),a.write(c.endpoint,c.data).then(function(){b.find("#"+h).append('<div class="col-6 col-md-4 pull-right"><span class="pull-right label label-success">Done</span></div>'),$(e).attr("aria-valuenow",parseFloat($(e).attr("aria-valuenow"))+d),$(e).css("width",$(e).attr("aria-valuenow")+"%"),g()}).fail(function(){b.find("#"+h).append('<div class="col-6 col-md-4 pull-right"><span class="pull-right label label-danger">Failed</span></div>'),$(f).attr("aria-valuenow",parseFloat($(f).attr("aria-valuenow"))+d),$(f).css("width",$(f).attr("aria-valuenow")+"%"),g()})})};$(document).ready(function(){$("#bcs").on("change",function(b){$("#bcs").parent().removeClass("has-success").removeClass("has-error"),a=new BCS.Device(b.target.value),a.on("ready",function(){localStorage["bcs-backup.url"]=b.target.value,$("#bcs").parent().addClass("has-success").removeClass("has-error"),a.helpers.getProcesses().then(function(a){a.forEach(function(a,b){$("#process").append("<option value="+b+">"+b+" - "+a.name+"</option>")})}),$("form").change()}).on("notReady",function(){$("#bcs").parent().addClass("has-error").removeClass("has-success")})}),$("#configFile").on("change",function(a){a.target.files[0].size?$("#configFile").parent().addClass("has-success").removeClass("has-error"):$("#configFile").parent().addClass("has-error").removeClass("has-success")}),$("form").on("change",function(){a.ready&&$("div.has-success #configFile").length?$("button").removeClass("disabled"):$("button").addClass("disabled")}),$("#migrate").on("click",function(c){c.preventDefault();var d=$("#dialog .modal-body");d.empty(),$("#dialog").modal("show"),Migrator.migrate($("#configFile")[0].files[0],function(c){"unknown"!==c.type?(d.append('<div class="alert alert-success">Found valid <strong>'+c.type+"</strong> configuration.</div>"),c.device!==a.type&&d.append('<div class="alert alert-warning">Device mismatch.  Loading anyway, may result in errors. <ul><li>Config file version: <strong>'+c.device+"</strong></li><li>Device version: <strong>"+a.type+"</strong></li></div>"),d.append($("#progress").html()),"process"===c.type?(d.append($("#process-selector").html()),$("#update-process").on("click",function(a){a.preventDefault(),$(a.target).addClass("disabled");var e=d.find("select")[0].value,f=c.config.map(function(a){return a.endpoint=a.endpoint.replace(":id",e),a});b(d,f)})):b(d,c.config)):d.append('<div class="alert alert-danger">Invalid configuration file found</div>')})}),localStorage["bcs-backup.url"]&&($("[data-name=bcs]").val(localStorage["bcs-backup.url"]),$("[data-name=bcs]").change())})}();
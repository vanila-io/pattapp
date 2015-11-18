$(document).ready(function(){
		/* find ratio of canvas */
	var cw = $('.canvasContainer').width();
	var ch = $('.canvasContainer').height();
	function calculateCanvasSize(original_width,original_height,type){
	    var pageMaxHeight = $('.canvasarea').height();
	    canvasWidth = original_width;
	    canvasHeight = original_height;
	    canvasSizeType = type;
	    mul = (type == 'inches' ? 96 : 1152);
	    sign = (type == 'inches' ? '"' : "'");
	    if (original_width > 0 && original_height > 0) {
	        width = original_width * mul;
	        height = original_height * mul;
	        _wid = $('.canvasarea').width() / width;
	        width = width * _wid;
	        height = height * _wid;
	        if(height > pageMaxHeight)
	        {
	            ratio = pageMaxHeight/height;
	            width = width*ratio;
	            height = height*ratio;
	        }
	        $('.canvasarea').css('padding-top',($('.canvasarea').height()-height)/2);
	        prototypefabric.setCanvasSize(width, height,original_width,original_height,type);
	        $('div#canvasSizeText').html(original_width + sign + 'x' + original_height + sign);
	    }
	}
	/* get file type source */
	var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
               	prototypefabric.addImage(e.target.result);
                setTimeout(function(){
                    /*popups.imagepopup.update(prototypefabric.getCurrentObject());
                    popups.imagepopup.show();
                    popups.imagepopupResponsive.show();*/
                    $(".file-upload").val('');
                },1000);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

	  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

 $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });
	$("div.canvas-container").css({margin:"0 auto"});
	$('#addtext').click(function(){
		prototypefabric.addtext();
	});
	/* browse / browse Svg*/
	$('#browse,#browse1').click(function(){
		$("#hidden-input").trigger('click');
	});
	$("#hidden-input,#hidden-input1").on('change', function(){
        readURL(this);
    });

	$("input").keyup(function(){
		var width = $("#width").val();
		var height = $("#height").val();
		prototypefabric.setCanvasWidth(width, height);
	});
	/* color picker*/
	ColorPicker = $('.my-color-picker').colorpicker({
	  color: 'hsl(10, 30%, 30%)',
	  colorSpace: 'hsl',
	  displayColor: 'hex'
	});
    ColorPicker.on('newcolor', function (ev, colorpicker, component, value) {
        color = colorpicker.toCssString();
        prototypefabric.changeBackground(color);
        $('#colorpickerHolder').val($('.output-wrapper').html());
    });
    ColorPicker = $('.my-color-picker1').colorpicker({
	  color: 'hsl(10, 30%, 30%)',
	  colorSpace: 'hsl',
	  displayColor: 'hex'
	});
    ColorPicker.on('newcolor', function (ev, colorpicker, component, value) {
        color = colorpicker.toCssString();
        prototypefabric.setcolor(color);
    });
    $("#test5").change(function(){
    	var opacity = $("#test5").val();
    	prototypefabric.opacity(opacity);
    });
    $("#duplicate").click(function(){
    	prototypefabric.duplicate();
    });
    $("#remove").click(function(){
    	prototypefabric.removeObj();
    });
});
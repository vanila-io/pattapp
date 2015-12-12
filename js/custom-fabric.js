prototypefabric;
var r = 0;
var prototypefabric = new function(){
	var canvas = new fabric.Canvas('myCanvas', { width: 400, height: 400, backgroundColor: '#0D1E2C'});
	canvas.renderAll();
    canvas.on('object:selected', function(o){
        var object = o.target;
        console.log(object);
    });
	this.addtext = function(){		
		var text = new fabric.IText('hello world', { left: 100, top: 100,backgroundColor: 'transparent', textAlign : 'center' ,class: 'text'});
		canvas.add(text);
		canvas.renderAll();
	}
	this.setCanvasWidth = function(width, height){
		if( width > height ){
			r = height/width;
			iwidth = 500;
			iheight = 500 * r;
		}
		else
		{
			r = width / height;
			iheight = 500;
			iwidth = 500 * r;
		}
		canvas.setHeight(iheight);
		canvas.setWidth(iwidth);
		canvas.renderAll();
	}
	
	/******************************* AHMAD'S CODE *******************************/
	
	this.setobjectsize = function(width, height)
    {
        //console.log('Recieved width : '+width+' Height : '+height);
		canvas.setHeight(height);
		canvas.setWidth(width);
		canvas.renderAll();
	}

	this.calGcd = function (a, b) {
		if (b) {
			return this.calGcd(b, a % b);
		} else {
			return Math.abs(a);
		}
	}

    this.ExportImage = function(width, height,ExportWidth,ExportHeight)
    {
        var Twidth = canvas.width;
        var Theight = canvas.height;
        canvas.setWidth(width);
        canvas.setHeight(height);
        _exportRatio = 1/exportRatio;
        alert(_exportRatio);
        canvas.forEachObject(function(obj){
            console.log(_exportRatio);
            var tempWd = obj.width;
            var tempHt = obj.height;
            obj.scaleX = _exportRatio * obj.scaleX;
            obj.scaleY = _exportRatio * obj.scaleY;
            obj.top = _exportRatio * obj.top;
            obj.left = _exportRatio * obj.left;
            console.log('before '+obj.width+' ::: '+obj.height);
        });
        canvas.renderAll();
        //console.log('Ratio : '+ratio+' Export Width : '+ExportWidth+' Export Height : '+ExportHeight);
        console.log(exportRatio);//Use this ratio
        canvas.discardActiveGroup();
        canvas.discardActiveObject();
        var _base64 = canvas.toDataURL();
        console.log(_base64);
        TempCanvas = window._tmpCanvas = new fabric.Canvas(fabric.util.createCanvasElement());
        TempCanvas.setWidth(ExportWidth);
        TempCanvas.setHeight(ExportHeight);
        TempCanvas.setBackgroundColor({source: _base64, repeat: 'repeat'}, function () {
            TempCanvas.renderAll();
            url = TempCanvas.toDataURL();
            window.open(url);
            window.focus();


        });
        canvas.forEachObject(function(obj){
            var tempWd = obj.width;
            var tempHt = obj.height;
            obj.scaleX =  obj.scaleX/_exportRatio;
            obj.scaleY = obj.scaleY/_exportRatio;
            obj.top = obj.top/_exportRatio;
            obj.left = obj.left/_exportRatio;
            console.log('After '+obj.width+' ::: '+obj.height);
        });
        canvas.setWidth(Twidth);
        canvas.setHeight(Theight);
        console.log(canvas);

    }

   
	/******************************* AHMAD'S CODE END *******************************/
	
	this.addImage = function(source){
		fabric.Image.fromURL(source, function(img) {
			img.class = 'image';
			img.source = source;
            img.id = "test";


	        $("#imageColorPicker").spectrum({
	            color: "blue",
	            allowEmpty:true,
	            move: function(color) {
	                var filter = new fabric.Image.filters.Tint({
						color: color.toHexString(),
						opacity: 1
					});
					img.filters.push(filter);
					img.applyFilters(canvas.renderAll.bind(canvas));
	            }
	        });
			
			canvas.add(img);
		});
	}

	this.changeBackground = function(color){
		canvas.setBackgroundColor(color);
		canvas.renderAll();
	}
	this.opacity = function(opacity){
		var obj = canvas.getActiveObject();
        if(obj.class=="image"){
            obj.setOpacity(opacity/100);
        }
		canvas.renderAll();
	}
    this.textopacity = function(opacity){
        var obj = canvas.getActiveObject();
        if(obj.class=="text"){
            obj.setOpacity(opacity/100);
        }
        canvas.renderAll();
    }
	this.canvasExport = function(){
		console.log(JSON.parse(decodeURIComponent(JSON.stringify(canvas))));
		canvas.renderAll();
	}

	this.duplicate = function(){
//		canvas.loadFromJSON('{"objects":[{"type":"i-text","originX":"left","originY":"top","left":100,"top":100,"width":183.3,"height":52.43,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"transparent","fillRule":"nonzero","globalCompositeOperation":"source-over","text":"hello world","fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"center","textBackgroundColor":"","styles":{}},{"type":"image","originX":"left","originY":"top","left":51,"top":142,"width":300,"height":220,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","src":"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBl…QXDssQDNCvy7s4ArWtdatooFUzc/WsO9PlWVmg+YOm5iepNXNP0y3ltgzJkk1yciN/aScU2f/Z","filters":[],"crossOrigin":"","alignX":"none","alignY":"none","meetOrSlice":"meet"}],"background":"#0D1E2C"}');
		var obj = canvas.getActiveObject();
		if (obj.class == "text") {
            var clone = obj.clone();
            clone.set({
                top: clone.get('top') + 10,
                left: clone.get('left') + 10,
                class: obj.class,
                //original_scaleX: clone.get('scaleX'),
                //original_scaleY: clone.get('scaleY'),
                //original_left: clone.get('left') + 10,
                //original_top: clone.get('top') + 10,
                hasControls: true,
                angle:obj.angle,
                fill:obj.fill,
                scaleY:obj.scaleY,
                scaleX:obj.scaleX
            });
            //clone.color = _color;
            canvas.add(clone);
            canvas.setActiveObject(clone);
            canvas.renderAll();
        }
        else if(obj.class == "image"){
            console.log(obj);
			fabric.Image.fromURL(obj.source, function(img) {
	            img.set({
	                top: obj.get('top') + 10,
	                left: obj.get('left') + 10,
	                class: obj.class,
	                //original_scaleX: img.get('scaleX'),
	                //original_scaleY: img.get('scaleY'),
	                //original_left: img.get('left') + 10,
	                //original_top: img.get('top') + 10,
	                hasControls: true,
	                angle:obj.angle,
	                fill:obj.fill,
	                scaleY:obj.scaleY,
	                scaleX:obj.scaleX,
	                opacity:obj.opacity
	            });
			  	canvas.add(img);
			  	canvas.renderAll();
	        });
	        canvas.renderAll();
		}
	}
	this.setcolor = function(color) {//Latest Modified
      $("#ColorVal").val(color);
		var obj = canvas.getActiveObject();
		obj.setColor(color);
		canvas.renderAll();
	}
	this.removeObj =function (){//Latest Modified
		var obj = canvas.getActiveObject();
        if(obj == null){
            obj = canvas.getActiveGroup();
            for(var i = 0 ; i < obj._objects.length ; i++) {
                console.log(obj._objects[i]);
                canvas.fxRemove(obj._objects[i]);
            }
            canvas.discardActiveGroup();
            canvas.renderAll();
        }
        else{
            canvas.fxRemove(obj);
            canvas.renderAll();
        }
        canvas.renderAll();
	}

	this.tint = function(color){
        alert('asd');
		var obj = canvas.getActiveObject();
		var filter = new fabric.Image.filters.Tint({
			color: color,
			opacity: 0.5
		});
		object.filters.push(filter);
		object.applyFilters(canvas.renderAll.bind(canvas));
		canvas.renderAll();
	}
	canvas.renderAll();
}



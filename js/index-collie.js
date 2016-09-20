var imgs = ["pic1.png", "pic2.png", "pic3.png"]

var coordinateList = [
	[0, 0],
	[97, 0],
	[177, 0]
];

var sizes = [
	[302, 316],
	[302, 316],
	[302, 316]
];

var hitAreas = [
	[[91, 83],[80, 23],[128, 41],[189, 35],[219, 61],[280, 59],[252, 114],[273, 159],[209, 196],[210, 236],[209, 261],[234, 257],[213, 295],[170, 298],[163, 266],[119, 257],[119, 297],[51, 297],[42, 269],[69, 248],[105, 241],[105, 204],[36, 179],[35, 146],[54, 117],[86, 85]]
	,
	[[40, 64],[2, 31],[30, 23],[78, 33],[145, 16],[220, 43],[292, 38],[254, 80],[279, 123],[226, 219],[150, 247],[45, 196],[11, 114],[36, 57]]
	,
	[[18, 142],[96, 220],[95, 298],[204, 296],[231, 217],[232, 175],[272, 144],[255, 78],[274, 40],[248, 5],[61, 4],[27, 39],[48, 88],[20, 137]]
];

(function(doc, win) {
	var oLayer, sensor;

	var clientWidth = document.body.clientWidth,
		clientHeight = document.body.clientHeight,
		scale = 0.5;

	var htParams = collie.util.queryString();
	collie.Renderer.DEBUG_RENDERING_MODE = typeof htParams.dom != "undefined" ? "dom" : (typeof htParams.canvas != "undefined" ? "canvas" : "auto");

	oLayer = new collie.Layer({
		width: clientWidth,
		height: clientHeight
	});

	// 이벤트
	var oSelectedDisplayObject = null;
	var htStartPosition = {};
	var htSelectedDisplayObjectPosition = {};
 
	for(var i = 0; i < imgs.length; i++) {
		//加载图片 
		collie.ImageManager.add(imgs[i], 'img/' + imgs[i]);
 
		(function(i) {
			new collie.DisplayObject({
				width: sizes[i][0],
				height: sizes[i][1],
				originX: 'left',
				originY: 'top',
				x: coordinateList[i][0],
				y: coordinateList[i][1],
//				backgroundColor:'blue',
				zIndex: 1,
				useEvent: true,
				backgroundImage: imgs[i],
				scaleX: scale,
				scaleY: scale,
				rangeX: [0, clientWidth - sizes[i][0] * scale],
				rangeY: [0, clientHeight - sizes[i][1] * scale],
				hitArea: hitAreas[i],
//				debugHitArea: true,
			}).addTo(oLayer);
		})(i);
	}
	
	oLayer.attach({
		mousedown: function(oEvent) {
			if(oEvent.displayObject) {
				oSelectedDisplayObject = oEvent.displayObject;
				htStartPosition = {
					x: oEvent.x,
					y: oEvent.y
				};
				htSelectedDisplayObjectPosition = {
					x: oSelectedDisplayObject.get("x"),
					y: oSelectedDisplayObject.get("y")
				};
				
				oLayer.removeChild(oEvent.displayObject);
				oLayer.addChild(oEvent.displayObject);
			}
		},
		mouseup: function(oEvent) {
			if(oSelectedDisplayObject !== null) {
				oSelectedDisplayObject = null;
				htSelectedDisplayObjectPosition = htStartPosition = {};
			}
		},
		mousemove: function(oEvent) {
			if(oSelectedDisplayObject !== null) {
				var x = htStartPosition.x - oEvent.x;
				var y = htStartPosition.y - oEvent.y;
				oSelectedDisplayObject.set({
					x: htSelectedDisplayObjectPosition.x - x,
					y: htSelectedDisplayObjectPosition.y - y
				});
			}
		}
	});

	collie.Renderer.addLayer(oLayer);
	collie.Renderer.load(document.getElementById("container"));
	collie.Renderer.start();
})(document, window);
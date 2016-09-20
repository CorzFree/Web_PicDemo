var canvas1 = new Rcanvas({
	id: '#canvas1',
	width: 302,
	height: 316,
	scale: 0.5,
	imageSrc: 'img/pic1.png'
});

$('#canvas1').attr('bgChange', 'false');
$('#canvas1').attr('borderChange', 'false');

function toggle(type) {

	if(type == 1) {

		var flag = $('#canvas1').attr('borderChange');
		if(flag == 'false') {
			$('#canvas1').css('border', '1px solid black');
			$('#canvas1').attr('borderChange', 'true');
		} else {
			$('#canvas1').css('border', '');
			$('#canvas1').attr('borderChange', 'false');
		}
	} else if(type == 2) {

		var flag = $('#canvas1').attr('bgChange');
		if(flag == 'false') {
			$('#canvas1').css('background-color', 'red');
			$('#canvas1').attr('bgChange', 'true');
		} else {
			$('#canvas1').css('background-color', '');
			$('#canvas1').attr('bgChange', 'false');
		}
	}
}
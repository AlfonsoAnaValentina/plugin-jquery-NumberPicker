$(document).ready(function(){
	$('.np').NumberPicker();	
	$('.np2').NumberPicker();	
	$('.np3').NumberPicker();	
	var aux = $('.np').NumberPicker('getData');
	console.log(aux);	
	console.log($('.np2').NumberPicker('getData'));
	console.log($('.np3').NumberPicker('getData'));
});

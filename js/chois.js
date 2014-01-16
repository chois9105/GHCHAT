var canvas = new fabric.Canvas('c');

$(document).ready(canvasInit);


function canvasInit() {
	$("button.inputButton").click(insertText);
	$("button.textButton").click(toggleTextOption);
	$("ul.textOption li:nth-child(1)").click(setBold);
	$("ul.textOption li:nth-child(2)").click(setItalic);	
	$("ul.textOption li:nth-child(3)").click(setUnderline);
	$(".textContents").keyup(editText);
}


function toggleTextOption(){
	$(".textPanel").toggleClass("opend");
	if($(".textOption").css("display") === "none" ){
		$(".textContents").show();
		$(".inputButton").show();
		$(".textOption").show();
	}else{
		$(".textContents").hide();
		$(".textOption").hide();
		$(".inputButton").css("display","none");
	}
}

function toggleShapeOption(){
	$(".shapePanel").toggleClass("opend");
	if($(".shapeOption").css("display") === "none" ){
		$(".shapePanel").addClass("opend");
		$(".shapeOption").show();
	}else{
		$(".shapeOption").hide();
	}
}

function setBold(){
	var activeObject = canvas.getActiveObject();
	var fontWeight = (activeObject.getFontWeight() === 'normal') ? 'bold' : 'normal';
	activeObject.setFontWeight(fontWeight);
	canvas.renderAll();

	activeObject = null;
	fontWeight = null;
}

function setItalic(){
	var activeObject = canvas.getActiveObject();
	var fontStyle = (activeObject.getFontStyle() === 'italic') ? 'normal' : 'italic'; 
	activeObject.setFontStyle(fontStyle);
	canvas.renderAll();

	activeObject = null;
	fontStyle = null;
}
function setUnderline(){
	var activeObject = canvas.getActiveObject();
	var textDecoration =  (activeObject.getTextDecoration() === '') ? 'underline' : '';
	activeObject.setTextDecoration(textDecoration);
	canvas.renderAll();

	activeObject = null;
	textDecoration = null;
}
function insertText(){
	var contents = $(".textContents").val();
	var text = new fabric.Text(contents,{
		top:100,
		left:100
	})
	canvas.add(text);
	$(".textContents").val("");
	canvas.setActiveObject(text);

	text = null;
}

function editText(){
	var activeObject = canvas.getActiveObject();
	if(activeObject.type === "text"){
		var contents = $(".textContents").val();
		activeObject = canvas.getActiveObject();
		activeObject.setText(contents);
		canvas.renderAll();
		contents = null;
	}
	activeObject = null;


}

function synchronizeContents(obj){
	var text = obj.target.getText();
	$(".textContents").val(text);
	text = null;
}
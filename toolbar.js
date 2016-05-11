colorButton = document.getElementById("demo2");
colorButton.addEventListener("input", function() {
  myDiagram.startTransaction("change color");
  var it = myDiagram.selection.iterator;
  while (it.next()) {
    var node = it.value;
    var shape = node.findObject("SHAPE");
    if (shape !== null) {
      shape.fill = colorButton.value;
    }
  }
  myDiagram.commitTransaction("change color");
});

var boldButton = document.getElementById("bold");
boldButton.addEventListener("click", function() {
  myDiagram.startTransaction("change font style");
  var it = myDiagram.selection.iterator;
  var equalStylesVar = equalStyles('bold',myDiagram.selection.iterator)
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {
      textBlock.font = setFontStyle('bold',textBlock.font,equalStylesVar)
    }
  }
  myDiagram.commitTransaction("change font style");
});

var italicButton = document.getElementById("italic");
italicButton.addEventListener("click", function() {
  myDiagram.startTransaction("change font style");
  var it = myDiagram.selection.iterator;
  var equalStylesVar = equalStyles('italic',myDiagram.selection.iterator)
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {
      textBlock.font = setFontStyle('italic',textBlock.font,equalStylesVar)
    }
  }
  myDiagram.commitTransaction("change font style");
});

var underlineButton = document.getElementById("underline");
underlineButton.addEventListener("click", function() {
  myDiagram.startTransaction("change font style");
  var it = myDiagram.selection.iterator;
  var equalStylesVar = equalStyles('underline',myDiagram.selection.iterator)
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {
      textBlock.isUnderline = setFontStyle('underline',textBlock.isUnderline,equalStylesVar)
    }
  }
  myDiagram.commitTransaction("change font style");
});

function equalStyles(style,selectedModels){

  var it = selectedModels.iterator;
  while (it.next()) {
    var node = it.value;
    var textBlock = node.findObject("TEXTBLOCK");
    if (textBlock !== null) {

      if (style === 'underline') {
        if (textBlock.isUnderline === null || !textBlock.isUnderline) {
          return false
        }
      } else {
        if (textBlock.font.search(style) == -1) {
          return false
        }
      }
    }
  }
  return true
}


function setFontStyle(style, font, equalStyles){

  var newFont = font

  switch (style) {

    case 'bold':
      if (equalStyles) {

        newFont = font.replace('bold ', '');

      } else if (font.search('bold') == -1){

        newFont = `bold ${font}`

      }
      break;
      case 'italic':
        if (equalStyles) {

          newFont = font.replace('italic ', '');

        } else if (font.search('italic') == -1){

          newFont = `italic ${font}`

        }
        break;
        case 'underline':
          if (equalStyles) {

            newFont = false;

          } else if (font === null || !font){

            newFont = true

          }
          break;
    default:

  }

  console.log(newFont)

  return newFont
}

$(function(){

    var demo2 = $('#demo2');
    demo2.colorpickerplus();
    demo2.on('changeColor', function(e,color){
  if(color==null) {
    //when select transparent color
    $('.color-fill-icon', $(this)).addClass('colorpicker-color');
  } else {
    $('.color-fill-icon', $(this)).removeClass('colorpicker-color');
        $('.color-fill-icon', $(this)).css('background-color', color);

        colorButton.value = color
        colorButton.dispatchEvent(new Event('input'));
  }
    });

});

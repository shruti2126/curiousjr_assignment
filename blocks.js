$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

Blockly.Blocks['Bot_block'] = {
  init: function () {
    this.appendStatementInput("Bot")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['Bot_block'] = function (block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'Bot');
  // TODO: Assemble JavaScript into code variable.
  var code = `var inputTextValue = "${text_input}";`;
  return code;
};

Blockly.Blocks['question_block'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([["What is the date today?", "What is the date today?"],
      ["What is the time now?", "What is the time now?"],
      ["How are you?", "How are you?"],
      ["What is JavaScript?", "What is JavaScript?"],
      ["What is your name?", "What is your name?"]]), "Ask me a question: ");
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
var text_input;
Blockly.JavaScript['question_block'] = function (block) {
  text_input = block.getFieldValue('Ask me a question: ');
  // TODO: Assemble JavaScript into code variable.
  var code = `var inputTextValue = "${text_input}";`;
  return code;
};

var toolbox = document.getElementById("toolbox");

var options = {
  toolbox: toolbox,
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: false,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: false,
  sounds: true,
  oneBasedIndex: true
};

var workspace = Blockly.inject("blocklyDiv", options);

function redrawUi() {
  var date = new Date();
  if (text_input == "What is the date today?") {
    $("#textBox").text(date);
  } else if (text_input == "What is the time now?") {
    var time = date.getTime();
    $('#textBox').text(time + " seconds");
  } else if (text_input == "How are you?") {
    $('#textBox').text("I am great! And you?");
  } else if (text_input == "What is JavaScript?") {
    $('#textBox').text("A programming language to make web pages dynamic!")
  } else if (text_input == "What is your name?") {
    $('#textBox').text("Shruti Sharma");
  } else {
    $("#textBox").text("");
  }

}

function onBlockSelect(event) {
  if (event.type == Blockly.Events.SELECT &&
    event.oldElementId == Blockly.Blocks['Bot_block'].id && event.newElementId == Blockly.Blocks['questino_block'].id) {
    redrawUi();
  workspace.removeChangeListener(onBlockSelect);
}
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  // select = new Blockly.Events.Selected(Blockly.Blocks['Bot_block'].id, Blockly.Blocks['question_block'].id);
  // onBlockSelect(select);
  // workspace.addChangeListener(onBlockSelect);
  // Blockly.Blocks['Bot_block'] = {
    // 
    // init: function () {
      // this.setOnChange(function (CLICK) {
        // 
        //  if (CLICK.targetType == this) {
            //  console.log("I am herere");
            //  redrawUi();
          // }
      // });
    // }
  //}
  redrawUi();
}

function reset() {
  $('#textBox').empty();
  $('#blocklyDiv').empty();
  workspace = Blockly.inject("blocklyDiv", options);
}
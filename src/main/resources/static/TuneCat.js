/* Author: Brandon Frale
 *
 * Control script for Tune Cat.
 */

var dims;
var skins;
var tuneEditor;
var editorWidth = 800;
var editorHeight = 800;

var editorActive;


//
function setup() {
   editorActive = false;
   populateSkins();
   createCanvas(editorWidth, editorHeight);
   dims = new EditorDimensions(editorWidth, editorHeight);
   getAudioPermission();
   noLoop();
};


//
function getAudioPermission() {
   clear();
   textSize(dims.minMargin/4);
   textAlign(CENTER);
   text('TUNE.CAT NEEDS YOUR PERMISSION\nTO PLAY SOUNDS.\n\nPLEASE CLICK OR TOUCH HERE\nTO ALLOW TUNE.CAT TO PLAY AUDIO', dims.hCenter, dims.vCenter - dims.minMargin);
};


// Starts the editor after the AudioContext is started.
function initEditor() {
   tuneEditor = new TuneEditor(SkinTypes.stacy);
   getAudioContext().resume();
   getUrlTune();
   scaleTuneEditor();
   editorActive = true;
   loop();
};


//
function draw() {
   if(editorActive) {
      tuneEditor.handleNoteMovement(mouseY);
   }
};


//
function mousePressed() {
   if(editorActive) {
      tuneEditor.handleMousePress(mouseX, mouseY);
   }
};


//
function mouseReleased() {
   if(editorActive) {
      tuneEditor.handleMouseRelease();
   }
}


function mouseClicked() {
   if(!editorActive) {
      initEditor();
   }
};


//
function windowResized() {
   if(editorActive) {
      scaleTuneEditor();
   } else {
      scaleAudioPermission();
   }
};


// Sets the editor dimensions based on the current window size and redraws the editor.
function scaleTuneEditor() {
   var w = windowWidth;
   if(windowWidth >= editorWidth) {
      w = editorWidth;
   } else if(windowWidth < 200) {
      w = 200;
   }
   var h = windowHeight;
   if(windowHeight >= editorHeight) {
      h = editorHeight;
   } else if(windowHeight < 200) {
      h = 200;
   }
   
   resizeCanvas(w, h);
   dims.setDimensions(w, h);
   tuneEditor.drawAll();
};


//
function scaleAudioPermission() {
   var w = windowWidth;
   if(windowWidth >= editorWidth) {
      w = editorWidth;
   } else if(windowWidth < 200) {
      w = 200;
   }
   var h = windowHeight;
   if(windowHeight >= editorHeight) {
      h = editorHeight;
   } else if(windowHeight < 200) {
      h = 200;
   }
   
   resizeCanvas(w, h);
   dims.setDimensions(w, h);
   getAudioPermission();
}


// Grabs the tune parameter, if present, from the URL and sends it to the editor.
function getUrlTune() {
   var urlString = window.location.href;
   var url = new URL(urlString);
   var tuneString = url.searchParams.get("tune");
   
   if(tuneString != null) {
      tuneEditor.setTune(tuneString);
   };
};
/* Author: Brandon Frale
 *
 * Editor code for Tune Cat.
 */
 

// Tune Cat editor state.
function TuneEditor(skinType) {
   this.tune = [Note.C, Note.cont, Note.G, Note.e, Note.f, Note.f, Note.f, Note.sleep, Note.G, Note.G, Note.f, Note.b, Note.c, Note.cont, Note.sleep, Note.sleep];
   this.skin = skins[skinType];
   this.noteColors = getNoteColors();
   
   this.dragStart = -1;
   this.selectedNoteIndex = -1;
   this.selectedNoteOriginalValue = -1;
   this.selectedNoteLastValue = -1;
   this.selectedNoteCurrentValue = -1;
   
   this.dialogueOpen = false;
   
   
   // Redraws the entire editor.
   this.drawAll = function() {
      clear();
      this.skin.drawFrame();
      this.drawNoteEditor();
      this.drawSkinSelector();
      this.drawButtons();
   };
   
   
   // Draws the editor frame surrounding the note editor.
   this.drawFrame = function() {
      this.skin.drawFrame();
   };
   
   
   // Draws the skin selector, highlighting the currently selected skin.
   this.drawSkinSelector = function() {
      var i;
      for(i = 0; i < skins.length; i++) {
         var x = dims.hMargin/2;
         var y = (dims.vMargin*3) + (i*(dims.vMargin*.75));
         if(i == this.skin.skinType) {
            fill(color(128, 128, 255));
            noStroke();
            ellipse(x, y, dims.minMargin/2, dims.minMargin/2);
         }
         skins[i].drawIcon(x, y);
      }
   };
   
   
   // Draws the play and save buttons.
   this.drawButtons = function() {
      // Draw play button.
      if(currentPlayingNote == -1) {
         fill(0, 255, 0);
      } else {
         fill(128);
      }
      noStroke();
      strokeWeight(2);
      ellipse(dims.width - (dims.hMargin/2), dims.vMargin*3, dims.minMargin/2, dims.minMargin/2);
      stroke(0);
      if(currentPlayingNote == -1) {
         fill(0, 128, 0);
      } else {
         fill(64);
      }
      triangle(dims.width - (dims.hMargin/2) + (dims.minMargin/8), dims.vMargin*3, dims.width - (dims.hMargin/2) - (dims.minMargin/8), (dims.vMargin*3) - (dims.minMargin/8), dims.width - (dims.hMargin/2) - (dims.minMargin/8), (dims.vMargin*3) + (dims.minMargin/8));
      
      // Draw save button.
      fill(255, 0, 255);
      noStroke();
      strokeWeight(2);
      ellipse(dims.width - (dims.hMargin/2), dims.vMargin*3.75, dims.minMargin/2, dims.minMargin/2);
      fill(0, 0, 255);
      stroke(0);
      rect(dims.width - (dims.hMargin/2) - (dims.minMargin/8), (dims.vMargin*3.75) - (dims.minMargin/8), dims.minMargin/4, dims.minMargin/4);
      fill(255);
      rect(dims.width - (dims.hMargin/2) - (dims.minMargin/12), (dims.vMargin*3.75) - (dims.minMargin/8), dims.minMargin/6, dims.minMargin/8);
   
      // Draw help button.
      noFill();
      stroke(0);
      strokeWeight(4);
      ellipse(dims.width - (dims.hMargin/2), dims.vMargin*4.5, dims.minMargin/2, dims.minMargin/2);
      fill(0);
      noStroke();
      textSize(dims.minMargin/3);
      text('?', dims.width - (dims.hMargin/2), dims.vMargin*4.6)
   };
   
   
   // Draws the note editor within the frame.
   this.drawNoteEditor = function() {
      // Redraw background and divider line.
      fill(this.skin.palette.noteBackground);
      noStroke();
      rect(dims.editorX, dims.editorY, dims.editorWidth, dims.editorHeight);
      noFill();
      stroke(this.skin.palette.chinFur);
      strokeCap(ROUND);
      var dividerWeight = Math.max(dims.minMargin/8, 2);
      line(dims.editorX + (dividerWeight*2), dims.editorY + (dims.editorHeight/2), dims.editorX + dims.editorWidth - (dividerWeight*2), dims.editorY + (dims.editorHeight/2));
      
      var i;
      for(i = 0; i < this.tune.length; i++) {
         this.drawNote(i);
      }
   };
   
   
   // Gets the X position of an editor note.
   this.getNoteX = function(tuneIndex) {
      var lineIndex = tuneIndex%8;
      var noteXSpacing = (dims.editorWidth - (dims.noteSize))/8;
      return dims.editorX + (dims.noteSize/2) + (noteXSpacing*.5) + (noteXSpacing*lineIndex);
   };
   
   
   // Gets the Y position of an editor note.
   this.getNoteY = function(tuneIndex) {
      var lineTop = dims.editorY + (Math.floor(tuneIndex/8)*(dims.editorHeight/2)) + (dims.noteSize/2);
      return lineTop + (this.tune[tuneIndex]*dims.noteYIncrement);
   };
   
   
   // Draws a note from the current tune.
   this.drawNote = function(tuneIndex) {
      var noteX = this.getNoteX(tuneIndex);
      var noteY = this.getNoteY(tuneIndex);
      // Draw kitty.
      fill(this.noteColors[this.tune[tuneIndex]]);
      noStroke();
      triangle(noteX - (dims.noteSize*.375), noteY - (dims.noteSize/2), noteX + (dims.noteSize/8), noteY, noteX - (dims.noteSize*.375), noteY);
      triangle(noteX + (dims.noteSize*.375), noteY - (dims.noteSize/2), noteX - (dims.noteSize/8), noteY, noteX + (dims.noteSize*.375), noteY);
      ellipse(noteX, noteY, dims.noteSize*.75, dims.noteSize*.75);
      ellipse(noteX + (dims.noteSize/8), noteY + (dims.noteSize/8), dims.noteSize*.625, dims.noteSize*.325);
      ellipse(noteX - (dims.noteSize/8), noteY + (dims.noteSize/8), dims.noteSize*.625, dims.noteSize*.325);
      // Label note. Don't draw white circle one sleep notes.
      if(this.tune[tuneIndex] != Note.sleep) {
         fill(255);
         ellipse(noteX, noteY, dims.noteSize/2, dims.noteSize/2);
      }
      fill(0);
      textSize(dims.noteSize*0.375);
      textStyle(BOLD);
      textAlign(CENTER);
      text(NoteLabels[this.tune[tuneIndex]], noteX, noteY + (dims.noteSize/8));
   };
   
   
   // Sets the skin that determines the frame.
   this.setSkin = function(skinType) {
      this.skin = skins[skinType];
   };
   
   
   // Parses a tune string into an array of notes.
   this.setTune = function(tuneString) {
      if(tuneString.length != 16) {
         alert("The URL for this tune is invalid!\n(Tunes must contain 16 notes.)");
      } else {
         var newTune = [];
         var i;
         for(i = 0; i < 16; i++) {
            var newNote = getNoteFromChar(tuneString.charAt(i));
            if(newNote == -1) {
               alert("The URL for this tune is invalid!\n(Contains invalid note.)");
               return;
            } else {
               newTune.push(newNote);
            }
         }
         this.tune = newTune;
      }
   }
   
   
   // Handles a mouse press event.
   this.handleMousePress = function(mX, mY) {
      // Check to see if mouse is in note edit region.
      if(mX > dims.editorX && mX < dims.editorX + dims.editorWidth && mY > dims.editorY && mY < dims.editorY + dims.editorHeight) {
         if(currentPlayingNote == -1) {
               
         
            var i;
            for(i = 0; i < this.tune.length; i++) {
               if(pointInRadius(mX, mY, this.getNoteX(i), this.getNoteY(i), dims.noteSize/2)) {
                  this.selectedNoteIndex = i;
                  this.selectedNoteOriginalValue = this.tune[i];
                  this.selectedNoteCurrentValue = -1;
                  this.selectedNoteLastValue = -1;
                  this.dragStart = mY;
               }
            }
         }
      }
      // Check to see if a skin was selected.
      else if(mX < dims.hCenter) {
         this.handleSkinSelection(mX, mY);
      }
      // Check to see if a button was pressed.
      else if(mX > dims.hCenter) {
         this.handleButtonPress(mX, mY);
      }
   };
   
   
   //
   this.handleMouseRelease = function() {
      this.selectedNoteIndex = -1;
   }
   
   
   // Handles dragging and updating of music notes.
   this.handleNoteMovement = function(mY) {
      if(this.selectedNoteIndex >= 0) {
         var noteDelta = Math.floor((mY - this.dragStart) / dims.noteYIncrement);
         this.selectedNoteLastValue = this.selectedNoteCurrentValue;
         this.selectedNoteCurrentValue = this.selectedNoteOriginalValue + noteDelta;
         
         if(this.selectedNoteCurrentValue < 0) {
            this.selectedNoteCurrentValue = 0;
         } else if(this.selectedNoteCurrentValue > 15) {
            this.selectedNoteCurrentValue = 15;
         }
         
         this.tune[this.selectedNoteIndex] = this.selectedNoteCurrentValue;
         
         if(this.selectedNoteLastValue != this.selectedNoteCurrentValue) {
            playTransitionNote(this.selectedNoteCurrentValue);
         }
         
         this.drawNoteEditor();
      }
   };
   
   
   // Check to see which skin was selected, if any, and update the editor accordingly.
   this.handleSkinSelection = function(mX, mY) {
      var selectedSkin = -1;
      var i;
      for(i = 0; i < skins.length; i++) {
         var skinSelectX = dims.hMargin/2;
         var skinSelectY = (dims.vMargin*3) + (i*(dims.vMargin*.75));
         
         if(pointInRadius(mX, mY, skinSelectX, skinSelectY, dims.minMargin/4)) {
            selectedSkin = i;
         }
      }
      
      if(selectedSkin >= 0) {
         this.skin = skins[selectedSkin];
         this.drawAll();
      }
   };
   
   
   // Check to see which button was pressed, if any, and act accordingly.
   this.handleButtonPress = function(mX, mY) {
      // Prevent the "OK" button in a dialog window from accidentally pressing a button.
      if(!this.dialogueOpen) {
         // Check play button.
         if(pointInRadius(mX, mY, dims.width - (dims.hMargin/2), dims.vMargin*3, dims.minMargin/4)) {
            this.playTune();
         }
         // Check save button.
         else if(pointInRadius(mX, mY, dims.width - (dims.hMargin/2), dims.vMargin*3.75, dims.minMargin/4)) {
            this.copyTuneUrl();
         }
         // Check help button.
         else if(pointInRadius(mX, mY, dims.width - (dims.hMargin/2), dims.vMargin*4.5, dims.minMargin/4)) {
            this.dialogueOpen = true;
            alert("Drag the notes up or down to make your own tune!\n\nCreated by Brandon Frale using p5.js");
            setTimeout(function() {
               tuneEditor.dialogueOpen = false;
            }, 200);
         }
      }

   };
   
   
   // Saves this tune as a URL to the clipboard.
   this.copyTuneUrl = function() {
      var tuneUrl = "http://tune.cat/?tune=";
      var i;
      for(i = 0; i < this.tune.length; i++) {
         if(this.tune[i] == Note.random) {
            tuneUrl = tuneUrl.concat("r");
         } else if(this.tune[i] == Note.cont) {
            tuneUrl = tuneUrl.concat("h");
         } else {
            tuneUrl = tuneUrl.concat(NoteLabels[this.tune[i]]);
         }
      }
      const urlElement = document.createElement('textarea');
      urlElement.value = tuneUrl;
      document.body.appendChild(urlElement);
      urlElement.select();
      document.execCommand('copy');
      document.body.removeChild(urlElement);
      this.dialogueOpen = true;
      alert("Copied tune to clipboard!");
      setTimeout(function() {
            tuneEditor.dialogueOpen = false;
      }, 200);
   };
   
   
   // Plays the current tune.
   this.playTune = function() {
      if(currentPlayingNote == -1) {
         playableTune = [];
         currentPlayingNote = 0;
         this.drawButtons();
         
         var totalBeats = 0;
         var prev;
         var i = 0;
         var endingSleepNotes;
         while(i < this.tune.length) {
            var currentNote = this.tune[i];
            if(currentNote != Note.cont && currentNote != Note.sleep) {
               var beats = 1;
               while(i < 16 && this.tune[i + 1] == Note.cont) {
                  beats++;
                  i++;
               }
               var playableNote;
               if(currentNote == Note.random) {
                  playableNote = new PlayableNote(NoteFrequencies[Math.floor(Math.random() * 13) + 1], beats);
               } else {
                  playableNote = new PlayableNote(NoteFrequencies[currentNote], beats);
               }
               playableTune.push(playableNote);
               
               setTimeout(function() {
                  playableTune[currentPlayingNote].play();
               }, 251*totalBeats);
               
               totalBeats += beats;
            } else if(currentNote == Note.sleep) {
               totalBeats++;
            }
            if(currentNote == Note.sleep) {
               endingSleepNotes++;
            } else {
               endingSleepNotes = 0;
            }
            i++;
         }
         
         setTimeout(function() {
            currentPlayingNote = -1;
            tuneEditor.drawButtons();
         }, 251*(16 - endingSleepNotes));
      }
   };
};


// Holds reference values for drawing the editor based on width and height.
function EditorDimensions(width, height) {
   this.width = width;
   this.height = height;
   this.hMargin = width/6;
   this.vMargin = height/6;
   this.hCenter = width/2;
   this.vCenter = height/2;
   this.minMargin = Math.min(this.hMargin, this.vMargin);
   
   this.editorX = this.hMargin*1.1;
   this.editorY = this.vMargin*2.75;
   this.editorWidth = width - (this.editorX*2);
   this.editorHeight = this.vMargin*2.25;
   
   this.noteSize = this.minMargin*0.375;
   this.noteYIncrement = ((this.editorHeight - (this.noteSize*2))/2)/16;
   
   //
   this.setDimensions = function(width, height) {
      this.width = width;
      this.height = height;
      this.hMargin = width/6;
      this.vMargin = height/6;
      this.hCenter = width/2;
      this.vCenter = height/2;
      this.minMargin = Math.min(this.hMargin, this.vMargin);
      
      this.editorX = this.hMargin*1.1;
      this.editorY = this.vMargin*2.75;
      this.editorWidth = width - (this.editorX*2);
      this.editorHeight = this.vMargin*2.25;
      
      this.noteSize = this.minMargin*0.375;
      this.noteYIncrement = ((this.editorHeight - (this.noteSize*2))/2)/16;
   };
};


// Helper function for determining if a point lies within a certain radius of another point.
function pointInRadius(pX, pY, rX, rY, radius) {
   return Math.sqrt(Math.pow(pX - rX, 2) + Math.pow(pY - rY, 2)) < radius;
};
/* Author: Brandon Frale
 *
 * Music note code for Tune Cat.
 */
 
 
 // Oscillator used to play frequencies.
var osc;
 
// Array of playableNotes that represents the current tune in the editor.
var playableTune;
var currentPlayingNote = -1;
 
// Mappings from note type to index within noteLabels and noteFrequencies.
var Note = {
   random: 0,
   E: 1,
   D: 2,
   C: 3,
   B: 4,
   A: 5,
   G: 6,
   f: 7,
   e: 8,
   d: 9,
   c: 10,
   b: 11,
   a: 12,
   g: 13,
   cont: 14,
   sleep: 15
};

// Labels to be displayed on each note in the editor.
var NoteLabels = ["?", "E", "D", "C", "B", "A", "G", "f", "e", "d", "c", "b", "a", "g", "-", "Z"];

// Frequencies for each note.
var NoteFrequencies = [0, 659.2551, 587.3295, 523.2511, 493.8833, 440.0000, 391.9954, 349.2282, 329.6276, 293.6648, 261.6256, 246.9417, 220.0000, 195.9977, 0, 0];


// Returns an array of colors used for drawing notes in the editor, since color(...) can't be called outside of a function.
function getNoteColors() {
   var nColors = [];
   nColors.push(color(255, 0, 0));
   nColors.push(color(255, 111, 0));
   nColors.push(color(255, 162, 0));
   nColors.push(color(255, 213, 0));
   nColors.push(color(247, 255, 0));
   nColors.push(color(195, 255, 0));
   nColors.push(color(145, 255, 0));
   nColors.push(color(94, 255, 0));
   nColors.push(color(42, 255, 0));
   nColors.push(color(0, 255, 8));
   nColors.push(color(0, 255, 60));
   nColors.push(color(0, 255, 111));
   nColors.push(color(0, 255, 162));
   nColors.push(color(0, 255, 212));
   nColors.push(color(162, 0, 255));
   nColors.push(color(128, 128, 128));
   return nColors;
};


// Returns the note represented by noteChar. Returns -1 if the char does not represent a valid note.
function getNoteFromChar(noteChar) {
   if(noteChar == 'r') {
      return Note.random;
   } else if(noteChar == 'E') {
      return Note.E;
   } else if(noteChar == 'D') {
      return Note.D;
   } else if(noteChar == 'C') {
      return Note.C;
   } else if(noteChar == 'B') {
      return Note.B;
   } else if(noteChar == 'A') {
      return Note.A;
   } else if(noteChar == 'G') {
      return Note.G;
   } else if(noteChar == 'f') {
      return Note.f;
   } else if(noteChar == 'e') {
      return Note.e;
   } else if(noteChar == 'd') {
      return Note.d;
   } else if(noteChar == 'c') {
      return Note.c;
   } else if(noteChar == 'b') {
      return Note.b;
   } else if(noteChar == 'a') {
      return Note.a;
   } else if(noteChar == 'g') {
      return Note.g;
   } else if(noteChar == 'h') {
      return Note.cont;
   } else if(noteChar == 'Z') {
      return Note.sleep;
   }
   return -1;
};

// Playable form of a note.
function PlayableNote(frequency, beats) {
   this.frequency = frequency;
   this.beats = beats;
   
   
   // Plays a frequency for the specified number of beats.
   this.play = function() {
      var env = new p5.Envelope();
      var release = 0.2 + ((this.beats - 1)*(0.2 + 0.001 + 0.05))
      env.setADSR(0.001, 0.05, 0.2, release);
      env.setRange(1.0, 0);
      
      if(osc != null) {
         osc.stop();
      }
      
      osc = new p5.Oscillator('sine');
      osc.amp(env);
      osc.start();
      osc.freq(this.frequency);
      env.play();
      currentPlayingNote++;
   };
};


// Plays a short note to be used when dragging notes in the editor.
function playTransitionNote(note) {
   if(note != Note.sleep & note != Note.cont) {
      var env = new p5.Envelope();
      env.setADSR(0.001, 0.05, 0.2, 0.1);
      env.setRange(1.0, 0);
      
      if(osc != null) {
         osc.stop();
      }
         
      osc = new p5.Oscillator('sine');
      osc.amp(env);
      osc.start();
      
      if(note == Note.random) {
         osc.freq(NoteFrequencies[Math.floor(Math.random() * 13) + 1]);
      } else {
         osc.freq(NoteFrequencies[note]);
      }
      env.play();
   }
};
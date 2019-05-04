/* Author: Brandon Frale
 *
 * Frame skins for Tune Cat.
 */

//
function EditorSkin(palette, extras, skinType) {
   this.palette = palette;
   this.extras = extras;
   this.skinType = skinType;
   
   
   //
   this.drawFrame = function() {
      this.drawEars();
      this.drawTopOfHead();
      this.drawEyes();
      this.drawChin();
      this.drawEditorArea();
      this.drawSnout();
      this.drawNose();
      this.drawWhiskers();
   };
   
   
   //
   this.drawEars = function() {
      // Inner ear.
      fill(this.palette.earInner);
      noStroke();
      triangle(dims.hMargin, 0, dims.hMargin, dims.vMargin*1.5, dims.hCenter, dims.vMargin*1.5);
      triangle(dims.width - dims.hMargin, 0, dims.width - dims.hMargin, dims.vMargin*1.5, dims.width - dims.hCenter, dims.vMargin*1.5);
      
      this.extras.drawInnerEarExtras();
      
      // Outer ear.
      noStroke();
      fill(this.palette.earFur);
      triangle(dims.hMargin, 0, dims.hCenter/2, dims.vMargin*1.5, dims.hCenter, dims.vMargin*1.5);
      triangle(dims.width - dims.hMargin, 0, dims.width - (dims.hCenter/2), dims.vMargin*1.5, dims.hCenter, dims.vMargin*1.5);
      
      this.extras.drawEarExtras();
   };
   
   
   //
   this.drawTopOfHead = function() {
      fill(this.palette.headFur);
      noStroke();
      ellipse(dims.hCenter, dims.vMargin*1.5, dims.width - (dims.hMargin*2), dims.vMargin*2);
      rect(dims.hMargin, dims.vMargin*1.5, dims.width - (dims.hMargin*2), dims.vMargin/2);
      
      this.extras.drawTopOfHeadExtras();
   };
   
   
   //
   this.drawEyes = function() {
      fill(this.palette.eyes);
      noStroke();
      ellipse(dims.hCenter - dims.hMargin, dims.vMargin*1.25, dims.minMargin/2, dims.minMargin/2);
      ellipse(dims.hCenter + dims.hMargin, dims.vMargin*1.25, dims.minMargin/2, dims.minMargin/2);
      
      fill(0);
      noStroke();
      triangle(dims.hCenter - dims.hMargin, (dims.vMargin*1.25) - (dims.minMargin/4), dims.hCenter - (dims.hMargin + (dims.minMargin*0.05)), dims.vMargin*1.25, dims.hCenter - (dims.hMargin - (dims.minMargin*0.05)), dims.vMargin*1.25);
      triangle(dims.hCenter + dims.hMargin, (dims.vMargin*1.25) - (dims.minMargin/4), dims.hCenter + (dims.hMargin + (dims.minMargin*0.05)), dims.vMargin*1.25, dims.hCenter + (dims.hMargin - (dims.minMargin*0.05)), dims.vMargin*1.25);
      
      this.extras.drawEyesExtras();
   };
   
   
   //
   this.drawChin = function() {
      fill(this.palette.chinFur);
      noStroke();
      ellipse(dims.hCenter, dims.height - dims.vMargin, dims.width - (dims.hMargin*2), dims.vMargin*2);
      
      this.extras.drawChinExtras();
   };
   
   
   //
   this.drawEditorArea = function() {
      fill(this.palette.chinFur);
      noStroke();
      rect(dims.hMargin, dims.vMargin*2, dims.width - (dims.hMargin*2), dims.height - (dims.vMargin*3));
      fill(this.palette.noteBackground);
      noStroke();
      rect(dims.hMargin*1.1, dims.vMargin*2, dims.width - (dims.hMargin*2.2), dims.height - (dims.vMargin*3));
   };
   
   
   //
   this.drawSnout = function() {
      fill(this.palette.snoutFur);
      noStroke();
      ellipse(dims.hCenter - dims.hMargin, dims.vMargin*2, dims.hMargin*2.5, dims.vMargin*1.5);
      ellipse(dims.hCenter + dims.hMargin, dims.vMargin*2, dims.hMargin*2.5, dims.vMargin*1.5);
      
      this.extras.drawSnoutExtras();
   };
   
   
   //
   this.drawNose = function() {
      fill(this.palette.nose);
      noStroke();
      ellipse(dims.hCenter, dims.vMargin*1.5, dims.hMargin/3, dims.vMargin/3);
      ellipse(dims.hCenter*.98, dims.vMargin*1.6, dims.hMargin/3, dims.vMargin/3);
      ellipse(dims.hCenter*1.02, dims.vMargin*1.6, dims.hMargin/3, dims.vMargin/3);
      
      this.extras.drawNoseExtras();
   };
   
   
   //
   this.drawWhiskers = function() {
      noFill();
      stroke(this.palette.whiskers);
      var whiskerWeight = Math.min(3, dims.minMargin/16);
      whiskerWeight = Math.max(whiskerWeight, 1);
      strokeWeight(whiskerWeight);
      strokeCap(ROUND);
      
      curve(dims.hCenter - (dims.hMargin/2), dims.vMargin*2.75, dims.hCenter - (dims.hMargin/2), dims.vMargin*1.75, whiskerWeight, dims.vMargin*1.5, 0, dims.vMargin*2.5);
      curve(dims.hCenter - (dims.hMargin/2), dims.vMargin*2.875, dims.hCenter - (dims.hMargin/2), dims.vMargin*1.875, whiskerWeight, dims.vMargin*2, 0, dims.vMargin*3);
      curve(dims.hCenter - (dims.hMargin/2), dims.vMargin*3, dims.hCenter - (dims.hMargin/2), dims.vMargin*2, whiskerWeight, dims.vMargin*2.5, 0, dims.vMargin*3.5);
      curve(dims.hCenter + (dims.hMargin/2), dims.vMargin*2.75, dims.hCenter + (dims.hMargin/2), dims.vMargin*1.75, dims.width - whiskerWeight, dims.vMargin*1.5, dims.width, dims.vMargin*2.5);
      curve(dims.hCenter + (dims.hMargin/2), dims.vMargin*2.875, dims.hCenter + (dims.hMargin/2), dims.vMargin*1.875, dims.width - whiskerWeight, dims.vMargin*2, dims.width, dims.vMargin*3);
      curve(dims.hCenter + (dims.hMargin/2), dims.vMargin*3, dims.hCenter + (dims.hMargin/2), dims.vMargin*2, dims.width - whiskerWeight, dims.vMargin*2.5, dims.width, dims.vMargin*3.5);
   };
   
   
   //
   this.drawIcon = function(x, y) {
      fill(this.palette.earFur);
      noStroke();
      triangle(x - (dims.minMargin/8), y - (dims.minMargin/6), x - (dims.minMargin/8), y, x, y);
      triangle(x + (dims.minMargin/8), y - (dims.minMargin/6), x + (dims.minMargin/8), y, x, y);
      
      fill(this.palette.headFur);
      noStroke();
      ellipse(x, y, dims.minMargin/4, dims.minMargin/4);
      
      fill(this.palette.snoutFur);
      noStroke();
      ellipse(x - (dims.minMargin/16), y + dims.minMargin/24, dims.minMargin/6, dims.minMargin/8);
      ellipse(x + (dims.minMargin/16), y + dims.minMargin/24, dims.minMargin/6, dims.minMargin/8);
   };
};


//
function SkinPalette(fur, fur2, eyes, nose) {
   this.headFur = fur;
   this.earFur = fur2;
   this.snoutFur = fur2;
   this.chinFur = fur;
   this.eyes = eyes;
   this.nose = nose;
   this.earInner = nose;
   this.whiskers = color(0);
   
   this.noteBackground = color(255, 222, 165);
};


//
function SkinExtras(palette) {
   this.palette = palette;
   this.extraColors = [];
   
   //
   this.drawInnerEarExtras = function() {};
   //
   this.drawEarExtras = function() {};
   //
   this.drawTopOfHeadExtras = function() {};
   //
   this.drawEyesExtras = function() {};
   //
   this.drawChinExtras = function() {};
   //
   this.drawSnoutExtras = function() {};
   //
   this.drawNoseExtras = function() {};
   
};


//
var SkinTypes = {
   stacy: 0,
   nacho: 1,
   coach: 2,
   payton: 3
};


//
var skins;


//
function populateSkins() {
   skins = [];
   
   var stacy = buildStacySkin();
   skins.push(stacy);
   
   var nacho = buildNachoSkin();
   skins.push(nacho);
   
   var coach = buildCoachSkin();
   skins.push(coach);
   
   var payton = buildPaytonSkin();
   skins.push(payton);
};


//
function buildStacySkin() {
   var stacyPalette = new SkinPalette(color(255, 162, 0), color(233, 153, 0), color(126, 255, 0), color(195, 142, 60));
   stacyPalette.earInner = color(255, 189, 92);
   
   var stacyExtras = new SkinExtras(stacyPalette);
   
   //
   stacyExtras.drawInnerEarExtras = function() {
      var earXDelta = Math.abs(dims.hMargin - (dims.hCenter));
      var earYDelta = Math.abs(0 - (dims.vMargin*1.5));
      var earLength = Math.sqrt(Math.pow(earXDelta, 2) + Math.pow(earYDelta, 2));
      earXDelta = earXDelta/earLength;
      earYDelta = earYDelta/earLength;
      
      fill(this.palette.headFur);
      noStroke();
      triangle(dims.hMargin*.9, dims.vMargin/4, dims.hMargin + (earXDelta*(dims.vMargin/4)), dims.vMargin/4, dims.hMargin + (earXDelta*(dims.vMargin)), dims.vMargin);
      triangle(dims.hMargin*.95, dims.vMargin/2, dims.hMargin + (earXDelta*(dims.vMargin/2)), dims.vMargin/2, dims.hMargin + (earXDelta*(dims.vMargin)), dims.vMargin);
      triangle(dims.hMargin, dims.vMargin*.75, dims.hMargin + (earXDelta*(dims.vMargin*.75)), dims.vMargin*.75, dims.hMargin + (earXDelta*dims.vMargin*1.5), dims.vMargin*1.5);
      triangle(dims.width - (dims.hMargin*.9), dims.vMargin/4, dims.width - (dims.hMargin + (earXDelta*(dims.vMargin/4))), dims.vMargin/4, dims.width - (dims.hMargin + (earXDelta*(dims.vMargin))), dims.vMargin);
      triangle(dims.width - (dims.hMargin*.95), dims.vMargin/2, dims.width - (dims.hMargin + (earXDelta*(dims.vMargin/2))), dims.vMargin/2, dims.width - (dims.hMargin + (earXDelta*(dims.vMargin))), dims.vMargin);
      triangle(dims.width - (dims.hMargin), dims.vMargin*.75, dims.width - (dims.hMargin + (earXDelta*(dims.vMargin*.75))), dims.vMargin*.75, dims.width - (dims.hMargin + (earXDelta*dims.vMargin*1.5)), dims.vMargin*1.5);
   };
   
   //
   stacyExtras.drawTopOfHeadExtras = function() {
      fill(this.palette.headFur);
      noStroke();
      // Side fluff.
      triangle(dims.hMargin*1.1, dims.vMargin*1.5, dims.hMargin/2, dims.vMargin*1.5, dims.hMargin*1.1, dims.vMargin*2);
      triangle(dims.hMargin*1.1, dims.vMargin*2.25, dims.hMargin/2, dims.vMargin*2.25, dims.hMargin*1.1, dims.vMargin*1.75);
      triangle(dims.width - (dims.hMargin*1.1), dims.vMargin*1.5, dims.width - (dims.hMargin/2), dims.vMargin*1.5, dims.width - (dims.hMargin*1.1), dims.vMargin*2);
      triangle(dims.width - (dims.hMargin*1.1), dims.vMargin*2.25, dims.width - (dims.hMargin/2), dims.vMargin*2.25, dims.width - (dims.hMargin*1.1), dims.vMargin*1.75);
      // Top fluff.
      triangle(dims.hCenter, dims.vMargin, dims.hCenter - dims.hMargin, dims.vMargin, dims.hCenter - dims.hMargin, dims.vMargin/2);
      triangle(dims.hCenter, dims.vMargin, dims.hCenter + dims.hMargin, dims.vMargin, dims.hCenter + dims.hMargin, dims.vMargin/2);
      triangle(dims.hCenter + dims.hMargin, dims.vMargin, dims.hCenter - (dims.hMargin*0.75), dims.vMargin, dims.hCenter - (dims.hMargin*0.625), dims.vMargin/2);
      triangle(dims.hCenter - dims.hMargin, dims.vMargin, dims.hCenter + (dims.hMargin*0.75), dims.vMargin, dims.hCenter + (dims.hMargin*0.625), dims.vMargin/2);
   };
   
   return new EditorSkin(stacyPalette, stacyExtras, SkinTypes.stacy);
};


//
function buildNachoSkin() {
   var nachoPalette = new SkinPalette(color(223, 223, 223), color(212, 212, 212), color(118, 224, 235), color(255, 167, 217));
   nachoPalette.whiskers = color(160);
   var nachoExtras = new SkinExtras(nachoPalette);
   nachoExtras.extraColors.push(color(223, 162, 85));
   nachoExtras.extraColors.push(color(212, 154, 81));
   
   //
   nachoExtras.drawEarExtras = function() {
      var innerEarXDelta = Math.abs(dims.hMargin - (dims.hCenter/2));
      var innerEarYDelta = Math.abs(0 - (dims.vMargin*1.5));
      var innerEarLength = Math.sqrt(Math.pow(innerEarXDelta, 2) + Math.pow(innerEarYDelta, 2));
      innerEarXDelta = innerEarXDelta/innerEarLength;
      innerEarYDelta = innerEarYDelta/innerEarLength;
      
      fill(this.extraColors[1]);
      noStroke();
      triangle(dims.hMargin + (dims.vMargin*innerEarXDelta), dims.vMargin*.4, dims.hCenter/2, dims.vMargin*1.5, dims.hCenter, dims.vMargin*1.5);
      triangle(dims.width - (dims.hMargin + (dims.vMargin*innerEarXDelta*2)), dims.vMargin*.5, dims.width - (dims.hCenter/2), dims.vMargin*1.5, dims.hCenter, dims.vMargin*1.5);
   };
   
   
   //
   nachoExtras.drawTopOfHeadExtras = function() {
      fill(this.palette.headFur);
      noStroke();
      // Top fluff.
      triangle(dims.hCenter, dims.vMargin, dims.hCenter - dims.hMargin, dims.vMargin, dims.hCenter - dims.hMargin, dims.vMargin/2);
      triangle(dims.hCenter, dims.vMargin, dims.hCenter + dims.hMargin, dims.vMargin, dims.hCenter + dims.hMargin, dims.vMargin/2);
      triangle(dims.hCenter + dims.hMargin, dims.vMargin, dims.hCenter - (dims.hMargin*0.75), dims.vMargin, dims.hCenter - (dims.hMargin*0.625), dims.vMargin/2);
      triangle(dims.hCenter - dims.hMargin, dims.vMargin, dims.hCenter + (dims.hMargin*0.75), dims.vMargin, dims.hCenter + (dims.hMargin*0.625), dims.vMargin/2);
      // Orange spots.
      fill(this.extraColors[0]);
      noStroke();
      ellipse(dims.hCenter, dims.vMargin*1.25, dims.hMargin*.4, dims.vMargin);
      ellipse(dims.hCenter - (dims.hMargin), dims.vMargin*1.1, dims.hMargin, dims.vMargin*.3);
   };
   
   //
   nachoExtras.drawEyesExtras = function() {
      fill(this.extraColors[0]);
      noStroke();
      rect(dims.hCenter - dims.hMargin - (dims.minMargin/4), dims.vMargin*1.25 - (dims.minMargin/4), dims.minMargin/2, dims.minMargin/6);
      fill(this.palette.headFur);
      noStroke();
      rect(dims.hCenter + dims.hMargin - (dims.minMargin/4), dims.vMargin*1.25 - (dims.minMargin/4), dims.minMargin/2, dims.minMargin/6);
      
   };
   
   return new EditorSkin(nachoPalette, nachoExtras, SkinTypes.nacho);
};


//
function buildCoachSkin() {
   var coachPalette = new SkinPalette(color(62), color(212), color(102, 204, 0), color(36));
   coachPalette.earInner = color(186, 144, 157);
   coachPalette.chinFur = color(223);
   coachPalette.whiskers = color(160);
   var coachExtras = new SkinExtras(coachPalette);
   coachExtras.extraColors.push(color(223));
   
   //
   coachExtras.drawTopOfHeadExtras = function() {
      fill(this.extraColors[0]);
      noStroke();
      ellipse(dims.hCenter, dims.vMargin*1.25, (dims.hMargin*1.5), dims.vMargin*1.4);
      fill(this.palette.headFur);
      ellipse(dims.hCenter, dims.vMargin*1.25, dims.hMargin/2, dims.vMargin);
   };
   
   return new EditorSkin(coachPalette, coachExtras, SkinTypes.coach);
};


// RIP Payton, you are loved and will always be missed. 2004-2018
function buildPaytonSkin() {
   var paytonPalette = new SkinPalette(color(62), color(48), color(126, 255, 0),color(159, 133, 142));
   paytonPalette.nose = color(55);
   paytonPalette.whiskers = color(120);
   var paytonExtras = new SkinExtras();
   
   return new EditorSkin(paytonPalette, paytonExtras, SkinTypes.payton);
   
};
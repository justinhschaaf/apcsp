/*
 * 
 * The MIT License (MIT)
 * Copyright © 2018 Justin Schaaf
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the “Software”),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS 
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *
 */

main();

/**
 *
 * The function containing all of the functions run in the program
 *
 */
function main() {
  penUp();
  setupCanvas("#97a0d0");
  drawSun("#faaf3a");
  drawOcean("#4656b1");
  drawReflection();
  drawSand(250, 230, 190);
  hide();
}

/**
 *
 * Sets up the canvas for painting
 *
 * @param color The hex color to make the sky
 *
 */
function setupCanvas(color) {
  penColor(color); // bed2db
  dot(300);
}

/**
 *
 * Draws the sun
 *
 * @param color The hex color to make the sun
 *
 */
function drawSun(color) {
      
  // Setup the turtle for drawing
  moveTo(160, 220);
  penColor(color);
  penWidth(10);
  
  // Draw the sun
  dot(50);
  
  // The pen doesn't have to be picked up because we never put it down
  
}

/**
 *
 * Draws the ocean
 *
 * @param color The hex color to make the ocean
 *
 */
function drawOcean(color) {
    
  // Setup the turtle for drawing
  moveTo(-20, 220);
  penColor(color);
  penWidth(10);
  penDown();
  
  // Draw the sand background
  drawToBottom(220);
  
  // Pick the pen up
  penUp();
  
}

/**
 *
 * Draws the sun's reflection in the ocean
 *
 */
function drawReflection() {
  
  // Setup the turtle for drawing
  penWidth(4);
  turnTo(90);
  
  // Draw the streaks
  var ypos = 218;
  for (var i = 80; i > 0; i--) {
    
    // Setup for drawing
    moveTo(160 - i, ypos);
    penRGB(randomNumber(230, 255), randomNumber(100, 175), randomNumber(0, 60), 0.8);
    
    // Draw the streak
    penDown();
    moveForward(i * 2);
    penUp();
    
    // Increase y-position & extra i decrease
    ypos += 4;
    i -= 5;
    
  }
  
}

/**
 *
 * Draws the beach and the sand speckles
 *
 * @param r Red
 * @param g Green
 * @param b Blue
 *
 */
function drawSand(r, g, b) {
  
  // Setup the turtle for drawing
  moveTo(-20, 270);
  penRGB(r, g, b); // "#f7e7be"
  penWidth(10);
  penDown();
  
  // Draw the sand background
  drawToBottom(270);
  
  // Pick the pen up
  penUp();
  
  // Draw the sand speckles
  for (var i = 0; i < 1000; i++) {
    penRGB(randomNumber(r - 5, r + 5), randomNumber(g - 5, g + 5), randomNumber(b - 5, b + 5), 1);
    moveTo(randomNumber(0, 320), randomNumber(270, 450));
    dot(Math.random() * 5);
  }
  
}

/**
 *
 * Fills an area with the pen color
 *
 * @param startY The y-level to start at
 *
 */
function drawToBottom(startY) {
  for (var i = startY; i < 450; i++) {
    
    moveTo(-20, i);
    move(360, 0);
    
  }
}
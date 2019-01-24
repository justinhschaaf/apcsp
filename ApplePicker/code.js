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

var lives = 3;
var applesCollected = 0;
var applesSpawned = 0;
var applesEaten = [];
var hasEnded = false;

onEvent("welcomeButtonStart", "click", function(event) {
  setScreen("gameScreen");
  appleTimer();
});
onEvent("gameButtonBack", "click", function(event) {
  setScreen("welcomeScreen");
  resetVars();
});
onEvent("winButtonMenu", "click", function(event) {
  setScreen("welcomeScreen");
});
onEvent("loseButtonMenu", "click", function(event) {
  setScreen("welcomeScreen");
});

function appleTimer() {
  
  timedLoop(50, function() {
    if (lives <= 0) {
      loseGame();
      stopTimedLoop();
    } else if (applesCollected >= 20) {
      winGame();
      stopTimedLoop();
    } else {
      console.log("Can spawn an apple");
      if (randomNumber(1, 10) == randomNumber(1, 10)) spawnApple();
    }
  });
  
}

function spawnApple() {
  
  var appleName = "apple" + applesSpawned;
  
  textLabel(appleName, "●");
  setPosition(appleName, randomNumber(20, 300), randomNumber(20, 430), 50, 50);
  setProperty(appleName, "text-color", "#aa1111");
  setProperty(appleName, "font-size", randomNumber(25, 75));
  onEvent(appleName, "click", function(event) {
    if (!contains(applesEaten, appleName)) {
      applesCollected++;
      setText("gameLabelScore", applesCollected + "");
      stopTimedLoop(birds);
    }
    deleteElement(appleName);
  });
  applesSpawned++;
  
  var birds = timedLoop(1000, function() {
    if (!hasEnded) {
      if (randomNumber(1, 20) == randomNumber(1, 20)) {
        lives--;
        setText("gameLabelLives", lives + "");
        setProperty(appleName, "text-color", "#221111");
        appendItem(applesEaten, appleName);
        stopTimedLoop(birds);
      }
    } else stopTimedLoop(birds);
  });
  
}

function winGame() {
  hasEnded = true;
  setScreen("winScreen");
  resetVars();
}

function loseGame() {
  hasEnded = true;
  setScreen("loseScreen");
  resetVars();
}

function resetVars() {
  
  lives = 3;
  applesCollected = 0;
  applesSpawned = 0;
  applesEaten = [];
  hasEnded = false;
  
  setText("gameLabelLives", lives + "");
  setText("gameLabelScore", applesCollected + "");
  
}

function contains(list, item) {
  
  for (var i = 0; i < list.length; i++) {
    
    if (list[i] == item) return true;
    
  }
  
  return false;
  
}

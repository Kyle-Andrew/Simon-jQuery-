var tiles = ["green", "red", "blue", "yellow"];

var generatedSequence = [];

var level = 0;
var gameInProgress = false;
var correctInputs = 0;

// Game start and end functions

$(document).keypress(function (event) {
  if (gameInProgress === false && event.key === "a") {
    gameInProgress = true;
    generateNextLevel();
  }
});

$("h1").click(function (event) {
  if (gameInProgress === false) {
    gameInProgress = true;
    generateNextLevel();
  }
});

function gameOver() {
  $("h1").html('Game Over<br><br> Press "A" Key to Restart');
 
  generatedSequence = [];

  level = 0;
  gameInProgress = false;
  correctInputs = 0;
  
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 120);
}

// Level generation functions

function generateRandomNumber() {
  return Math.floor(Math.random() * 4);
}

function generateNextTile() {
  var newTile = tiles[generateRandomNumber()];

  playSound(newTile);
  $("#" + newTile).fadeOut(75).fadeIn(75);

  generatedSequence.push(newTile);
}

function generateNextLevel() {
  level++;
  correctInputs = 0;

  setTimeout(function () {
    $("h1").html("Level " + level);
    generateNextTile();
  }, 800);
}

// Animation and sound

function tileAnimate(tileID) {
  $("#" + tileID).addClass("pressed");
  setTimeout(function () {
    $("#" + tileID).removeClass("pressed");
  }, 100);
}

function playSound(filename) {
  var sound = new Audio("./sounds/" + filename + ".mp3");
  sound.play();
}

// Accepting and verifying player input

$(".btn").click(function () {
  playSound(this.id);
  tileAnimate(this.id);

  checkSequence(this.id);
});

function checkSequence(latestInput) {
  if (latestInput === generatedSequence[correctInputs]) {
    correctInputs++;
  } else {
    gameOver();
  }

  if (correctInputs === level && gameInProgress === true) {
    generateNextLevel();
  }
}

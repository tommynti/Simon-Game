var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
var buttonColours = ["red","blue","green","yellow"];

$(document).keypress(function() {
  if (!start) {
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }
})

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  //console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);

  playSound(userChosenColor);
  animate(userChosenColor);

  checkAnswer(userClickedPattern.length-1);



})

function nextSequence() {
  userClickedPattern = []; 
  level++;
  $("h1").text("Level " + level);
  
  var randomNumber = Math.random()*4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {     // move to the next level
      setTimeout(function() {nextSequence();}, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");}, 200);

      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;

}


function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animate(currentColor) {

  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");}, 50);

}

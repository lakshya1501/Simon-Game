var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
userClickedPattern = [];
level++;
document.querySelector("h1").innerHTML = "Level "+ level;
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

document.querySelector("#"+randomChosenColour).classList.add("pressed");
setTimeout(function () {
  document.querySelector("#"+randomChosenColour).classList.remove("pressed");
}, 100);

makeSound(randomChosenColour);
}

for(var i=0; i<document.querySelectorAll(".btn").length; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function() {
      var current = this;
      var userChosenColour = this.getAttribute("id");
      userClickedPattern.push(userChosenColour);
      buttonAnimation(current);

      makeSound(current.getAttribute("id"));

      checkAnswer(userClickedPattern.length);
    });
}

function checkAnswer(current) {
  if(gamePattern[current-1] === userChosenColour[current-1]) {
    if(gamePattern.length === userChosenColour.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    makeSound(wrong);
    document.querySelector("body").classList.add("game-over");
    document.querySelector("h1").innerHTML = "Game Over, Press Any Key to Restart";

    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 200);

    startOver();
  }
}

document.addEventListener("keypress", function() {
  if(!started){
    document.querySelector("h1").innerHTML = "Level "+level;
  nextSequence();
  started = true;
}
});

function buttonAnimation(key) {
  key.classList.add("pressed");
  setTimeout(function ()
  {
    key.classList.remove("pressed");
  }, 50);

}

function makeSound(key) {
  var audio = new Audio("sounds/"+key+".mp3");
  audio.play();
}

function startOver () {
  level = 0;
  started = false;
  gamePattern = [];
}

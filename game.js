// Button Colours Array
var buttonColours = ["red", "blue", "green", "yellow"];

// Game Pattern
var gamePattern = [];

// User Clicked Pattern
var userClickedPattern = [];

//Game Level
var level = 0;

var started = false;

// First Time Key Pressed
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Determine Next Sequence
function nextSequence() {

    // Reset the userClickedPattern
    userClickedPattern = [];

    // Increase level by 1
    level++;

    // Change the h1 title with respect to level
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate the button with id is equal to randomChosenColour 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // Play the sound with related colour
    playSound(randomChosenColour);
}

// Button Handler

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);

});

// Animation to User Clicks

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColour).removeClass("pressed", 100);

    }, 100);

}

// Checks the answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (currentLevel === gamePattern.length - 1) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        // GAME OVER
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Play the sound with related colour

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// Restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
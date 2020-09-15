// Button Colours Array
var buttonColours = ["red", "blue", "green", "yellow"];

// Game Pattern
var gamePattern = [];

// User Clicked Pattern
var userClickedPattern = [];

//Game Level
var level = 0;

var started = false;

// when page is show() (showen), the play button is clicked although user did not click,
// to deal with this, show variable is added and it is checked at the beginning of the 
// playBtn callback function.
var show = true;

// I commented this part because it is not reponsive with mobile devices.
/*
First Time Key Pressed
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
*/

// First hide the game page, untill user press OK button of how-to-play page
$(".play-page").hide();

// User clicked the OK button, this means that the game starts.
$("#okBtn").click(function () {
    $(".how-to-page").hide();
    $(".play-page").show();
});

$(".playBtn").click(function () {
    // If the game is not started yet and if the event calling this function is not show() method, then start the game
    if (!started && !show) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(this).hide();
    }
    // If this function is called because of show() method, then change the var show to false
    if (show === true) {
        show = false;
    }
})

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

    // Play the sound with the related colour
    playSound(randomChosenColour);
}

// Colour Button Handler

$(".btn").click(function () {

    // When game started, get the colour of the user which clicked 
    if (started) {
        if (userClickedPattern.length !== gamePattern.length) {
            var userChosenColour = $(this).attr("id");
            userClickedPattern.push(userChosenColour);

            checkAnswer(userClickedPattern.length - 1);
            playSound(userChosenColour);
            animatePress(userChosenColour);
        }
    }

    // Otherwise wait the game start, so do nothing.

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
        $("h1").text("Game Over, Press PLAY AGAIN Button to Restart");
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
    //Show PLAY AGAIN button
    $(".playBtn").show().text("PLAY AGAIN");

    level = 0;
    gamePattern = [];
    started = false;
}
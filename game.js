var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;

var currentLevel = 0;

$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level " + currentLevel);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Success");

    }
    if (userClickedPattern.length === gamePattern.length) {

        setTimeout(function () {
            nextSequence();
        }, 1000);

    } else {
        console.log("Wrong")
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }

}

function nextSequence() {
    userClickedPattern = [];
    currentLevel++;

    $("#level-title").text("Level " + currentLevel);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 120);
}

function startOver() {

    currentLevel = 0;
    gamePattern = [];
    started = false;
}



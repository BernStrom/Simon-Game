const buttonColors = ["red", "blue", "green", "yellow"];

// User and game pattern sequence
let gamePattern = [];
let userClickedPattern = [];

// Game level status
let gamelevel = 0;
let gameStarted = false;

// When user presses on any key while on the webpage.
$(document).on("keydown", () => {

    // Starts the game.
    if (!gameStarted) {
        // Changes the game title heading to the current game level.
        $("#level-title").text(`Level ${gamelevel}`);

        // Calls nextSequence() and change the gameStarted status from false to true.
        nextSequence();
        gameStarted = true;
    }

});

// User click events for the button.
$(".btn").on("click", event => {
    let userChosenColor = event.target.id; // Gets the color id of the user selected button.
    userClickedPattern.push(userChosenColor); // Inserts the user selected color id into the userClickedPattern array.
    
    playSound(userChosenColor); // Plays the audio corresponding to the user selected button.
    animatePress(userChosenColor); // Applies animation effects to the user selected button.
    checkAnswer(userClickedPattern.length - 1); // Checks the answer of the user last selected button.
});

// Checks if the last user selected button and userClickedPattern matches the gamePattern array elements.
const checkAnswer = currentIndex => {
    // Checks if the most recent user answer is the same as the game pattern.
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {

        // Checks if the user sequence matches the game sequence.
        if (userClickedPattern.length === gamePattern.length) {
            // Calls nextSequence() after a 1000 millisecond delay.
            setTimeout(() => nextSequence(), 1000);
        }

    } else {
        // Plays the "wrong" audio when user selects the color button that doesn't match the gamePattern array elements sequence.
        playSound("wrong");

        // Adds a flash effect to the background body of the page by adding the CSS style class "game-over".
        $("body").addClass("game-over");
        setTimeout(() => $("body").removeClass("game-over"), 200);

        // Changes the game title to "Game Over" and notifies user to press any key to restart the game.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        // Resets the game to the beginning if the user selected the wrong button.
        startOver();
    }
}

// Starts another sequence with the next randomly-generated button selection, if the userClickedPattern matches the gamePattern.
const nextSequence = () => {
    // Resets the userClickedPattern to an empty array, ready for the next level.
    userClickedPattern = [];

    // Increment the game level by 1 everytime the nextSequence() is called.
    gamelevel++;

    // Updates the game title level value.
    $("#level-title").text(`Level ${gamelevel}`);

    // Generates a random number between 0 and 3 to get a random index element in the buttonColors array.
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    // Inserts a random selected color into the gamePattern array.
    gamePattern.push(randomChosenColor);

    // Applies a flash effect on the random selected button.
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    // Plays the audio corresponding to the randomly selected button.
    playSound(randomChosenColor);
}

// Generates a new audio and play it corresponding to the selected button.
const playSound = name => {
    let colorAudio = new Audio(`sounds/${name}.mp3`);
    colorAudio.play();
}

// Animation effects for selected button.
const animatePress = currentColor => {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
}

// Resets the game status and start over at the beginning.
const startOver = () => {
    gamelevel = 0;
    gamePattern = [];
    gameStarted = false;
}
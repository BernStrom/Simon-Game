const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let gamelevel = 0;
let gameStarted = false;

const nextSequence = () => {
    // Generates a random number between 0 and 3.
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Increment the game level by 1 everytime the nextSequence() is called.
    gamelevel++;

    // Updates the h1 level value.
    $("#level-title").text(`Level ${gamelevel}`);

    // Applies a flash effect on the random selected button.
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    // Plays the audio corresponding to the randomly selected button.
    playSound(randomChosenColor);
}

// Generates and play a new audio corresponding to the randomly selected button.
const playSound = name => {
    let colorAudio = new Audio(`sounds/${name}.mp3`);
    colorAudio.play();
}

// Animation effects for the button.
const animatePress = currentColor => {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
}

// User click events for the button.
$(".btn").on("click", event => {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor); // Plays the audio corresponding to the user selected button.
    animatePress(userChosenColor); // Applies animation effects to the user selected button.
});

// When user presses on any key while on the webpage.
$(document).on("keydown", () => {
    // Starts the game.
    if (!gameStarted) {
        $("#level-title").text(`Level ${gamelevel}`);
        nextSequence();
        gameStarted = true;
    }
});

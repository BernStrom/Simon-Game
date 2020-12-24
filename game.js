const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

const nextSequence = () => {
    // Generates a random number between 0 and 3.
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Applies a flash effect on the random selected button.
    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

$(".btn").on("click", event => {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
});

// Generates and play a new audio corresponding to the randomly selected button.
const playSound = name => {
    let colorAudio = new Audio(`sounds/${name}.mp3`);
    colorAudio.play();
}

nextSequence();
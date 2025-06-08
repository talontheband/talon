const correctAnswer = 92;
let wrongGuessCount = 0;
const feedbackMessages = [
  "you still haven't figured it out",
  "you gotta keep guessing",
  "keep going",
  "you're getting closer",
  "or maybe not lol",
  "don't give up yet"
];

function showInput() {
  const inputContainer = document.getElementById("guess-input-container");
  inputContainer.classList.remove("hidden");

  const audio = document.getElementById("background-audio");
  const muteButton = document.getElementById("mute-button");

  // Start audio only once
  if (audio.paused) {
    audio.play().catch((e) => {
      console.log("Autoplay blocked:", e);
    });
    muteButton.classList.remove("hidden");
  }
}

function submitGuess() {
  const input = document.getElementById("guess-input").value;
  const feedback = document.getElementById("feedback");
  const animation = document.getElementById("animation");
  const guess = parseInt(input);

  if (isNaN(guess)) {
    feedback.textContent = "Please enter a number.";
    return;
  }

  if (guess === correctAnswer) {
    feedback.textContent = "nice";

    // Show the celebration GIF
    animation.classList.add("show");
    animation.classList.remove("hidden");

    // After 1 second, fade to final screen
    setTimeout(() => {
      const finalScreen = document.getElementById("final-screen");
      finalScreen.classList.remove("hidden");
      finalScreen.style.pointerEvents = "auto";
      finalScreen.style.opacity = "1";
    }, 2000);
  } else {
    const baseMessage = feedbackMessages[wrongGuessCount % feedbackMessages.length];
    const directionHint = guess < correctAnswer ? "... more" : "... less";
    feedback.textContent = baseMessage + " " + directionHint;
    wrongGuessCount++;
  }
}

// Mute/unmute toggle
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("background-audio");
  const muteButton = document.getElementById("mute-button");

  muteButton.addEventListener("click", () => {
    if (audio.muted || audio.volume === 0) {
      audio.muted = false;
      audio.volume = 1.0;
      muteButton.textContent = "🔈";
    } else {
      audio.muted = true;
      muteButton.textContent = "🔇";
    }
  });
});

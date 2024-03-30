
function resumeTimer() {
    startTimer(); // Start the timer
}

export { resumeTimer }; // Export the resumeTimer function

// Define the resetTimer function to reset the timer
function resetTimer() {
    pauseTimer(); // Pause the timer
    const countDown = document.getElementById('countdown');
    countDown.innerHTML = ''; // Clear the countdown display
  }

export { resetTimer }; // Export the resetTimer function

// Define the startTimer function to start the timer
function startTimer() {
    const countDown = document.getElementById('countdown');
    let time = 3; // Set the time to 3 seconds
    countDown.innerHTML = time; // Display the time
    timer = setInterval(() => { // Start the timer
      time--; // Decrement the time
      countDown.innerHTML = time; // Display the time
      if (time === 0) { // If the time is 0
        clearInterval(timer); // Clear the timer
        timer = null;
        gameStarted = true; // Set the gameStarted flag
        countDown.innerHTML = ''; // Clear the countdown display
      }
    }, 1000); // Run the timer every second
  }

export { startTimer }; // Export the startTimer function

// Define the pauseTimer function to pause the timer
function pauseTimer() {
    clearInterval(timer); // Clear the timer
    timer = null;
  }

export { pauseTimer }; // Export the pauseTimer function


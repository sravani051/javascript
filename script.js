let boxes = document.querySelectorAll(".box"); //select all boxes
let reset = document.querySelector("#reset-btn"); //select reset button
let newGameBtn = document.querySelector("#new-btn"); //select newGame button

let msgContainer = document.querySelector(".msg-container"); //set the message conatainer and msg element
let msg = document.querySelector("#msg");

//initialise click cnt and starting player
let clickCnt = 0;
let playO = true; //players:O,X -> O is starter.

//winning patterns for the game
const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Diable all boxes(used when game end)
const disabledBox = () => {
  for (const box of boxes) {
    box.disabled = true;
  }
};

//enable all boxes and reset their content(used for starting the new game)
const enableBox = () => {
  for (const box of boxes) {
    box.innerText = ""; //clear box text
    box.disabled = false; //enable the box
  }
};

let confettiInterval;
const startInfinteConfetti = () => {
  confettiInterval = setInterval(() => {
    confetti({
      particleCount: 30, //no.of particles
      angle: 90, //angle of the confetti
      startVelocity: 20,
      spread: 120, //spread angle of confetti
      colors: [
        "#ff0",
        "#0f0",
        "#00f",
        "#ff0000",
        "#FFC0CB",
        "#FF6347",
        "#4A4E69",
        "#22223B",
        "#3C3C3B",
        "#0F0F0F",
        "#5E6472",
      ], // Confetti colors
      origin: {
        // Adjust where the confetti originates
        x: Math.random(),
        y: 0,
      },
      scalar: 1.2, //size of confetti
      shapes: ["circle", "square"], //shapes of confetti
    });
  }, 100); //launch confetti every 100ms
};

const stopInfiniteConfetti = () => {
  clearInterval(confettiInterval); // Clear the interval
};

//reset the game to its initial state
const resetGame = () => {
  enableBox(); //enable all boxes
  turnO = true; //reset to O as first player
  clickCnt = 0; //reset clickcnt
  msgContainer.classList.add("hide"); //hide msg container
  stopInfiniteConfetti(); //stop confetti
};

//display the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratualtions, Winner is ${winner}`; //set winner
  msgContainer.classList.remove("hide"); //show the message container'
  const stopConfetti = startInfinteConfetti(); // Start the confetti

  // Stop confetti after 5 seconds
  setTimeout(() => {
    stopConfetti();
  }, 5000);
};

//display game draw message
const drawGame = () => {
  msg.innerText = "Game was Draw"; //set draw message
  msgContainer.classList.remove("hide"); //show msg container
};

//check if there's a winner
const checkWinner = (winner) => {
  winPattern.forEach((val) => {
    //get values of the boxes in the current pattern
    idx1 = boxes[val[0]].innerText;
    idx2 = boxes[val[1]].innerText;
    idx3 = boxes[val[2]].innerText;

    //check if all three boxes have the same non-empty value
    if (idx1 != "" && idx2 != "" && idx3 != "") {
      if (idx1 === idx2 && idx2 === idx3) {
        disabledBox(); //to stop further game
        showWinner(idx1); //show the winner
      }
    }
  });
};

//add click event to game box
for (const box of boxes) {
  box.addEventListener("click", () => {
    clickCnt++;

    //Alternate between 'O' and 'X'
    if (playO) {
      box.innerText = "O"; //set box to 'O'
      playO = false; //switch to 'X'
      checkWinner("playerO"); //check if 'O' is the winner
    } else if (!playO) {
      box.innerText = "X";
      playO = true;
      checkWinner("playerX");
    }

    // Check for draw when all 9 boxes are clicked
    else if (clickCnt === 9) {
      drawGame(); //declare draw
    }
    box.disabled = true; //disable the clicked box
  });
}

//add
reset.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);

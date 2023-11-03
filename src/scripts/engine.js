const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    gridSize: 9,
    timerId: null,
    gameVelocity: 800,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    countDownTimeId: setInterval(countDown, 1000),
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.mp3`);
  //audio.volume = 0.2;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.actions.timerId);
    alert("game over: " + state.values.result);
  }
}


function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber  = Math.floor(Math.random() * state.values.gridSize);
  let randomSquare = state.view.squares[randomNumber]
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;

}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}


function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square,addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition){
          //alert();
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("confirm");
        } 
    });
  });
}

// função principal
function initialize() {
  moveEnemy();
  addListenerHitBox();
}

initialize();
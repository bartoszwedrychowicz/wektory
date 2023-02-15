/*

link:https://aniastarmach.pl/przepis/spaghetti-bolognese/

Składniki

    300 ml passaty pomidorowej
    300 g mielonej wołowiny
    300 g makaronu spaghetti
    30 g tartego parmezanu
    1 łyżka koncentratu pomidorowego
    1 ząbek czosnku
    1 mała cebula
    0.5 łyżeczki suszonego tymianku
    0.5 łyżeczki suszonego oregano
    oliwa z oliwek
    sól, pieprz
    świeża bazylia
    
    Jak przygotować?
    
    Na głębokiej patelni rozgrzej około 2 łyżki oliwy z oliwek.
    
    Na rozgrzaną patelnię wrzuć czosnek i cebulę, a po chwili dodaj mięso, rozdrabniaj je np. widelcem, tak aby nie powstały grube mięsne grudki.
    
    Do mięsa dodaj zioła oraz koncentrat. Całość podgrzewaj przez chwilę, dodaj passatę (przecier pomidorowy), gotuj na małym ogniu około 30 minut.
    
    Makaron ugotuj al dente, podawaj go z sosem, serem, i bazylią.
    */
//Tworzenie pola gry

createBoard();

const confirmBtn = document.getElementById("confirm");
const startGameBtn = document.getElementById("start");
const moves = document.getElementById("moves");
const message = document.getElementById("message");
const timer = document.getElementById("timer");
const panel = document.getElementsByClassName("panel")[0];
let players = document.getElementsByClassName("player");

const gridElements = document.querySelectorAll(".grid-item");
const pointsCounter = document.getElementById("points");

function createBoard() {
  const board = document.getElementById("board");
  board.className = "grid-container";
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      const div = document.createElement("div");
      div.className = "grid-item";
      div.dataset.x = j;
      div.dataset.y = i;

      board.appendChild(div);
    }
  }
}

// blokada wpisywania liczb ujemnych i 0
number.oninput = function () {
  if (this.value <= 0) {
    this.value = "";
  }
};

// Funkcja do losowania liczb
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Mechanika odczytywania polecen dla wektorusia
const changeGameState = (state) => {
  //Jeśli gra się rozpoczęła
  if (state == 1) {
    startGameBtn.disabled = true; //Dezaktywacja przycisku "start"

    initPlayer();
    generateCoins();

    function generateCoins() {
      let i;
      let xPosition;
      let yPosition;
      do {
        xPosition = getRandomInt(1, 10);
        yPosition = getRandomInt(1, 10);
        i++;
      } while (i < 8);

      let pointElement = document.querySelector(
        `[data-x="${xPosition}"][data-y="${yPosition}"]`
      );
      pointElement.classList.add("coin");
    }

    //Tworzenie gracza

    function initPlayer() {
      let xPlayerStartingPosition = 5;
      let yPlayerStartingPosition = 5;

      let playerElement = document.querySelector(
        `[data-x="${xPlayerStartingPosition}"][data-y="${yPlayerStartingPosition}"]`
      );
      playerElement.classList.add("player");
    }

    function GameOver(nothing) {
      if (nothing == 2) {
        const modal = document.getElementById("modal");
        const gameMessage = document.getElementById("gameMessage");
        gameMessage.innerText = "Czas upłynął!"
        modal.classList.remove("hide");
        clearInterval(counter);
        timer.innerText = "";
      }
      else{
        const modal = document.getElementById("modal");
        modal.classList.remove("hide");
        clearInterval(counter);
        timer.innerText = "";
      }
    }

    function movePlayer() {
      const player = document.getElementsByClassName("player")[0];
      const ListEl = document.createElement("li");
      const hrEl = document.createElement("hr");
      const direction = document.getElementById("direction").value;
      const number = document.getElementById("number");
      const numberValue = parseInt(number.value);
      ListEl.classList.add("moves-list-item");

      let xPlayerPosition = parseInt(player.dataset.x);
      let yPlayerPosition = parseInt(player.dataset.y);
      let playerElement;

      const playerChange = (xCha, yCha, dir) => {
        for (let i of players) {
          i.classList.remove("player");
        }
        playerElement = document.querySelector(
          `[data-x="${xPlayerPosition - xCha}"][data-y="${
            yPlayerPosition - yCha
          }"]`
        );
        if (playerElement == null || playerElement == undefined) GameOver();
        playerElement.classList.add("player");
        moves.appendChild(ListEl);
        ListEl.innerText = numberValue + dir;
        ListEl.append(hrEl);
      };
      switch (direction) {
        case "1":
          playerChange(0, numberValue, " 🡡");
          break;
        case "2":
          playerChange(-numberValue, numberValue, " 🡥");
          break;
        case "3":
          playerChange(-numberValue, 0, " 🡢");
          break;
        case "4":
          playerChange(-numberValue, -numberValue, " 🡦");
          break;
        case "5":
          playerChange(0, -numberValue, " 🡣");
          break;
        case "6":
          playerChange(numberValue, -numberValue, " 🡧");
          break;
        case "7":
          playerChange(numberValue, 0, " 🡠");
          break;
        case "8":
          playerChange(numberValue, numberValue, " 🡤");
          break;
      }
    }
  }

  confirmBtn.disabled = false;
  let playerPoints = 0;
  confirmBtn.addEventListener("click", () => {
    movePlayer();
    gridElements.forEach((item) => {
      if (
        item.classList.contains("player") &&
        item.classList.contains("coin")
      ) {
        item.classList.remove("coin");
        ++playerPoints;
        pointsCounter.innerText = playerPoints;
        generateCoins();
      }
    });
  });

  //zegarek
  let count = 100; //liczba sekund
  timer.innerText = count + " sekund pozostało";
  timer.classList.remove("hide");
  message.innerHTML = "";
  let counter = setInterval(() => {
    count = count - 1;
    if (count < 0) {
      clearInterval(counter);
      GameOver(2);
      return;
    } else if (count == 0) {
      timer.classList.toggle("hide");
      confirmBtn.disabled = true;
      startGameBtn.disabled = false;
      WektorusEl.dispatchEvent(killHimNow);
      const coins = document.querySelectorAll(".coin");
      for (i of coins) {
        i.remove();
      }
      const movesList = document.querySelectorAll(".moves-list-item");
      for (m of movesList) {
        m.remove();
      }
      message.innerHTML =
        "Koniec Gry <br> Uzyskałeś " + playerPoints + " punktów";
    }
    timer.innerText = count + " sekund pozostało";
  }, 1000); // 1000 millisekund = 1 sekunda
};

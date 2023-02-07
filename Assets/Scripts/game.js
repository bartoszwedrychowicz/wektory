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

const confirmBtn = document.getElementById("confirm");
const startGameBtn = document.getElementById("start");
const moves = document.getElementById("moves");
const game = document.getElementById("game");
const points = document.getElementById("points");
const message = document.getElementById("message");
const timer = document.getElementById("timer");
const panel = document.getElementsByClassName("panel")[0];
const startPos = document.getElementById(playerStartPos);
const playerStartPos = 45;

const coinCount = 7;
let direction = document.getElementById("direction").value;
let number = document.getElementById("number");
let numberValue = parseInt(number.value);

// blokada wpisywania liczb ujemnych i 0
number.oninput = function () {
  if (this.value <= 0) {
    this.value = "";
  }
};

//Mechanika odczytywania polecen dla wektorusia
const changeGameState = (state) => {
  if (state == 1) {
    startGameBtn.disabled = true;

    //Generowanie Coinów
    const pointsCount = Math.floor(Math.random() * coinCount) + 1;
    for (let i = 0; i < pointsCount; i++) {
      const imageEl = document.createElement("img");
      imageEl.src = "Assets/Textures/coin.png";
      imageEl.classList.add("coin");
      let random = Math.floor(Math.random() * 100) + 1;
      document.getElementById(random).appendChild(imageEl);
    }

    //Generowanie Wektorusia
    const WektorusEl = document.createElement("img");
    WektorusEl.src = "Assets/Textures/wektorus.png";
    WektorusEl.setAttribute("id", "player");
    WektorusEl.classList.add("player");
    const killHimNow = new Event("killhim");
    WektorusEl.addEventListener("killhim", (e) => {
      let target = e.target;
      target.remove();
    });
    startPos.appendChild(WektorusEl);

    // Dodawanie poleceń i usuwanie ich z listy

    confirmBtn.disabled = false;
    confirmBtn.addEventListener("click", () => {
      if (numberValue <= 0 || numberValue == "" || isNaN(numberValue)) {
        numberValue = 1;
      }
      const ListEl = document.createElement("li");
      const hrEl = document.createElement("hr");
      ListEl.classList.add("moves-list-item");
      number.value = "";
      //Spagheti code dla Gabrysia
      switch (direction) {
        case "1":
          ListEl.innerText = numberValue + " 🡡";
          break;
        case "2":
          ListEl.innerText = numberValue + " 🡥";
          break;
        case "3":
          ListEl.innerText = numberValue + " 🡢";
          break;
        case "4":
          ListEl.innerText = numberValue + " 🡦";
          break;
        case "5":
          ListEl.innerText = numberValue + " 🡣";
          break;
        case "6":
          ListEl.innerText = numberValue + " 🡧";
          break;
        case "7":
          ListEl.innerText = numberValue + " 🡠";
          break;
        case "8":
          ListEl.innerText = numberValue + " 🡤";
          break;

        default:
          ListEl.innerText = numberValue + "🡡";
          break;
      }
      const player = document.getElementById("player")
      const rodzicWektorusia = player.parentElement
      const xWektorusia = rodzicWektorusia.dataset.row;
      const yWektorusia = rodzicWektorusia.dataset.column;
      console.log(yWektorusia);
      console.log(xWektorusia);

      //Usuwanie poleceń
      ListEl.addEventListener("click", (e) => {
        let target = e.target;
        target.remove();
      });

      ListEl.append(hrEl);
      moves.appendChild(ListEl);
    });
    let count = 100;
    timer.innerText = count + " sekund pozostało";
    timer.classList.remove("hide");
    message.innerHTML = "";
    let playerPoints = 0;
    let counter = setInterval(() => {
      count = count - 1;
      if (count < 0) {
        clearInterval(counter);
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
        for(m of movesList){
          m.remove();
        }
        message.innerHTML =
          "Koniec Gry <br> Uzyskałeś " + playerPoints + " punktów";
      }
      timer.innerText = count + " sekund pozostało";
    }, 1000); // 1000 millisekund = 1 sekunda
  }
};

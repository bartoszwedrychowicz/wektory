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
const game = document.getElementById("game");
const moves = document.getElementById("moves");
const timer = document.getElementById("timer");
const playerStartPos = 45;
const startPos = document.getElementById(playerStartPos);
const orders = [];

let direction = document.getElementById("direction").value;
let number = document.getElementById("number");
let numberValue = number.value;
let count = 90;

// blokada wpisywania liczb ujemnych i 0
number.oninput = function () {
  if (this.value <= 0) {
    this.value = "";
  }
};

//Generowanie Coinów
const pointsCount = Math.floor(Math.random() * 7) + 1;
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
WektorusEl.classList.add("player");
startPos.appendChild(WektorusEl);

// Dodawanie poleceń i usuwanie ich z listy
confirmBtn.addEventListener("click", () => {
  let direction = document.getElementById("direction").value;
  let numberValue = parseInt(document.getElementById("number").value);
  if (numberValue <= 0) {
    numberValue = 1;
  }
  let order = [direction, numberValue];
  orders.push(order);
  const ListEl = document.createElement("li");
  const hrEl = document.createElement("hr");
  ListEl.classList.add("moves-list-item");

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

  //Usuwanie poleceń
  ListEl.addEventListener("click", (e) => {
    let target = e.target;
    target.remove();
  });
  ListEl.appendChild(hrEl);
  moves.appendChild(ListEl);
});

//Mechanika odczytywania polecen dla wektorusia
startGameBtn.addEventListener('click', () => {
  let counter = setInterval(() => {
    count = count - 1;
    if (count <= 0) {
      clearInterval(counter);
      return;
    }
    timer.innerText = count + " sekund pozostało";
  }, 1000); // 1000 millisekund = 1 sekunda


});
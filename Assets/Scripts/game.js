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

const constans = {
  PLAYERSTARTINGPOSITION: 45,
  COINNUMBER: 7,
}
const getById = {
  confirmBtn: document.getElementById("confirm"), //Potwierdza wysyłanie wektora
  startGameBtn: document.getElementById("start"), //Rozpoczyna rozgrywkę
  movesList: document.getElementById("moves"), //Lista ruchów gracza ~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!(ino ruch) !!!!!!!!!!!!!!~~~~~~~~~~~~~~
  points: document.getElementById("points"), //Punkty gracza
  message: document.getElementById("message"), //Wiadomośc o końcu gry
  timer: document.getElementById("timer"), // Zegarek
  startPos: document.getElementById(constans.PLAYERSTARTINGPOSITION), //Pozycja początkowa wektorusia
  number: document.getElementById("number"), // Formularz z długościom wektora
  numberValue: parseInt(number.value), //Długość wektora
  direction: document.getElementById("direction"), // Formukarz z kierunkiem wektora
  directionValue: document.getElementById("direction").value, //Kierunek wektora
  panel: document.getElementById("panel"), //Panel sterowania
};

// blokada wpisywania liczb ujemnych i 0
number.oninput = function () {
  if (this.value <= 0) {
    this.value = "";
  }
};

//Mechanika odczytywania polecen dla wektorusia
const changeGameState = (state) => {
  if (state == 1) {
    getById.startGameBtn.disabled = true;

    //Generowanie Coinów
    let coinCount = Math.floor(Math.random() * constans.COINNUMBER) + 1;
    for (let i = 0; i < coinCount; i++) {
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
    getById.startPos.appendChild(WektorusEl);

    // Dodawanie poleceń i usuwanie ich z listy

    getById.confirmBtn.disabled = false;
    getById.confirmBtn.addEventListener("click", () => {
      if (getById.numberValue <= 0 || getById.numberValue == "" || isNaN(getById.numberValue || getById.number >= 10)) {
        getById.numberValue = 1;
      }
      const ListEl = document.createElement("li");
      const hrEl = document.createElement("hr");
      ListEl.classList.add("moves-list-item");
      
      //Spagheti code dla Gabrysia
      switch (getById.directionValue) {
        case "1":
          ListEl.innerText = getById.numberValue + " 🡡";
          break;
        case "2":
          ListEl.innerText = getById.numberValue + " 🡥";
          break;
        case "3":
          ListEl.innerText = getById.numberValue + " 🡢";
          break;
        case "4":
          ListEl.innerText = getById.numberValue + " 🡦";
          break;
        case "5":
          ListEl.innerText = getById.numberValue + " 🡣";
          break;
        case "6":
          ListEl.innerText = getById.numberValue + " 🡧";
          break;
        case "7":
          ListEl.innerText = getById.numberValue + " 🡠";
          break;
        case "8":
          ListEl.innerText = getById.numberValue + " 🡤";
          break;

        default:
          ListEl.innerText = getById.numberValue + "🡡";
          break;
      }

      //Usuwanie poleceń
      ListEl.addEventListener("click", (e) => {
        let target = e.target;
        target.remove();
      });

      ListEl.append(hrEl);
      getById.movesList.appendChild(ListEl);
      getById.directionValue = "";
    });
    let count = 100;
    getById.timer.innerText = count + " sekund pozostało";
    getById.timer.classList.remove("hide");
    getById.message.innerHTML = "";
    let playerPoints = 0;
    let counter = setInterval(() => {
      count = count - 1;
      if (count < 0) {
        clearInterval(counter);
        return;
      } else if (count == 0) {
        getById.timer.classList.toggle("hide");
        getById.confirmBtn.disabled = true;
        getById.startGameBtn.disabled = false;
        WektorusEl.dispatchEvent(killHimNow);
        const coins = document.querySelectorAll(".coin");
        for (i of coins) {
          i.remove();
        }
        const moves = document.querySelectorAll(".moves-list-item");
        for (m of moves) {
          m.remove();
        }
        message.innerHTML =
          "Koniec Gry <br> Uzyskałeś " + playerPoints + " punktów";
      }
      timer.innerText = count + " sekund pozostało";
    }, 1000); // 1000 millisekund = 1 sekunda
  }
};

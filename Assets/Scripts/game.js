const game = document.getElementById("game");

const pointsCount = Math.floor(Math.random() * 7) + 1;
for (let i = 0; i < pointsCount; i++) {
  const image = document.createElement("img")
  image.src = "Assets/Textures/coin.png";
  image.classList.add("coin")
  let random = Math.floor(Math.random() * 100) + 1;
  document.getElementById(random).appendChild(image)
  console.log(random);
}
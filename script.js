let money = 0;
let baristas = 0;
let machine = 1;
let coffeeSold = 0;
let salePrice = 7;
let demand = 40;
let rushHourState = false;
let levlingUp = 0;
let brewingTime = 6;
let brewing = false;
let autoClick = false;
let baristaTimer = 6000;

let priceHireBarista = 200;
let priceBuyMachine = 300;
let priceBetterBeans = 400;
let priceMarketBoost = 300;
let priceRushHour = 200;
let priceLevelUp = 5000;

function updateUI() {
  document.getElementById("money").textContent = money;
  document.getElementById("coffeSold").textContent = coffeeSold;
  document.getElementById("machines").textContent = machine;
  document.getElementById("barista").textContent = baristas;
  document.getElementById("coffeeDemand").textContent = demand;
  document.getElementById("coffeePrice").textContent = salePrice;
  document.getElementById("coffeeDemand").textContent = demand;
  document.getElementById("betterBeans").textContent = beans;
  document.getElementById("levelUp").textContent = levlingUp;
}

function buyMachine() {
  if (money >= priceBuyMachine) {
    machine = machine + 1;
    money = money - priceBuyMachine;
    brewingTime = brewingTime - 1;
    baristaTimer = baristaTimer - 1000;
    document.getElementById("brewingTime").textContent = brewingTime;
    document.getElementById("machine").style.display = "none";
    document.getElementById("rightBottom").textContent =
      "YOU HAVE BOUGHT A MACHINE.";
  } else {
    alert("Du har ikke nok penger");
  }
  updateUI();
}

function plussButton() {
  if (demand > 0 && !rushHourState) {
    salePrice = salePrice + 1;
    demand = demand - 5;
    document.getElementById("rightBottom").textContent =
      "YOU HAVE INCREASED THE PRICE, BUT DECREASED THE DEMAND.";
  }
  updateUI();
}

function minusButton() {
  if (salePrice > 0 && !rushHourState) {
    salePrice = salePrice - 1;
    demand = demand + 5;
    document.getElementById("rightBottom").textContent =
      "YOU HAVE DECREASED THE PRICE, BUT INCREASED THE DEMAND.";
  }
  updateUI();
}

function rushHour() {
  if (money >= priceRushHour) {
    salePrice = 30;
    rushHourState = true;
    money = money - 200;
    demand = 100;
    document.getElementById("rush").style.display = "none";
    document.getElementById("rightBottom").textContent =
      "YOU GET DEMAND ON 100%";
    updateUI();
  } else {
    alert("Du har ikke nok penger");
  }
}

function marketingBoost() {
  if (money >= priceMarketBoost) {
    demand = demand + 20;
    money = money - 300;
    document.getElementById("boost").style.display = "none";
    document.getElementById("rightBottom").textContent =
      "YOUR DEMAND HAS INCREASED BY 20%.";
    updateUI();
  } else {
    alert("Du har ikke nok penger");
  }
}

function betterBeans() {
  if (money >= priceBetterBeans) {
    document.getElementById("betterBeans").textContent = "ARCAFFE ROMA";
    money = money - 400;
    document.getElementById("bean").style.display = "none";
    demand = demand + 5;
    document.getElementById("rightBottom").textContent =
      "THESE BEANS COME FROM THE PLACE CALLED ROMA, I HAVE USED A FONT THAT REPRESENT THESE BEANS (I USED THE TRAJAN FONT).";
    updateUI();
  } else {
    alert("Du har ikke nok penger");
  }
}

function levelUp() {
  if (money >= priceLevelUp) {
    money = money - 5000;
    document.getElementById("rightBottom").textContent =
      "AFTER YOU LEVEL UP YOU HAVE FINISHED THE GAME.";
    updateUI();
  } else {
    alert("Du har ikke nok penger");
  }
}

function sellCoffee() {
  if (brewing) return;
  document.getElementById("rightBottom").textContent =
    "YOU HAVE CLICKED THE COFFE, WAIT " +
    brewingTime +
    " SECONDS BEFORE DOING IT AGAIN.";
  brewing = true;
  let timeLeft = brewingTime;
  const timerText = document.getElementById("brewingTime");

  const updateTimer = () => (timerText.textContent = `${timeLeft} SECONDS`);

  const timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      brewing = false;

      money += salePrice;
      coffeeSold++;

      timerText.textContent = `${brewingTime} SECONDS`;
      updateUI();
    }
  }, 1000);
}

function hireBarista() {
  if (money >= priceHireBarista) {
    baristas = baristas + 1;
    money = money - priceHireBarista;
    document.getElementById("rightBottom").textContent =
      "YOU HAVE BOUGHT A BARISTA.";
    document.getElementById("boughtBarista").style.display = "none";
    if (!autoClick) {
      setInterval(() => {
        coffeeSold = coffeeSold + 1;
        money += salePrice;
        updateUI();
      }, baristaTimer);
      autoClick = true;
    }
    updateUI();
  } else {
    alert("Du har ikke nok penger");
  }
}

updateUI();

// Вставте свій ключ з https://home.openweathermap.org/api_keys
const API_KEY = "a63aab821ea29e390f89774e176c1949";

const btn = document.getElementById("btn");
const cityInput = document.getElementById("city");
const box = document.getElementById("weather");

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Введіть назву міста.");
    return;
  }

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) + "&appid=" + API_KEY + "&units=metric&lang=ua";

  box.className = "";
  box.textContent = "Завантаження...";

  try {
    const response = await fetch(url);
    const data = await response.json();          //розбір відповіді як JSON

    if (!response.ok) {                           //401 — ключ, 404 — місто
      throw new Error(data.message || "Помилка " + response.status);
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    box.replaceChildren(
      line("Місто: " + data.name + ", " + data.sys.country),
      line("Температура: " + temp + " °C"),
      line("Вологість: " + humidity + " %"),
      line("Швидкість вітру: " + wind + " м/с")
    );
  } catch (err) {
    showError("Не вдалося отримати погоду: " + err.message);
  }
}

function line(text) {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
}

function showError(msg) {
  box.className = "error";
  box.textContent = msg;
}

btn.addEventListener("click", getWeather);

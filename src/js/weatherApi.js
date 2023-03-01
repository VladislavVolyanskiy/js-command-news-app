import axios from 'axios';

const APIKEY = '4fd80105d8d352f05f6ab1b4df3becad';
weatherWidgetContainer = document.querySelector('.weatherWidget');

async function fetchWeather() {
  let latitude = 50.449749;
  let longitude = 30.523718;

  try {
    const position = await getCoordinates();
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  } catch (error) {}
  // получаем название города
  const cityData = await axios.get(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${APIKEY}`
  );
  // название города
  const city = cityData.data[0].name;
  // погода в это месте
  const weatherData = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKEY}`
  );

  return { weatherData, city };
}

createWidget();

async function createWidget() {
  await fetchWeather().then(({ weatherData, city }) => {
    const month = getMonth();
      const day = getDay();
      const weekDay = getWeekDay();

    const markup = `    <p class="temperature">${Math.round(
      weatherData.data.main.temp
    )}</p>
      <ul class="city">
        <li>${weatherData.data.weather[0].main}</li>
        <li>${city}</li>
      </ul>
      <img src="http://openweathermap.org/img/wn/${
        weatherData.data.weather[0].icon
      }@2x.png" alt="" width="128" height="121">    
      <p>${weekDay}</p>
      <p>${day} ${month}</p>
      <button type="button">weather for week</button>`;

    weatherWidgetContainer.innerHTML = markup;
  });
}

const date = new Date();

function getDay() {
    return date.getDate();
};

function getWeekDay() {
    const weekDays = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];
    return weekDays[date.getDay()]
}
 
function getMonth() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[date.getMonth()];
}

function getCoordinates() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

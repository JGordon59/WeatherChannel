const apiKey = '85527c3ecedc82f36ed8c6efc3a56528';
let comingDays = document.getElementById('comingDays');
let currentDay = document.getElementById('currentDay');


function searchHandle(e) {
  e.preventDefault();
  currentDay.innerHTML = '';
  comingDays.innerHTML = '';
  let cityName = document.getElementById('city-name').value.trim().toLowerCase();
  document.getElementById('city-name').value = '';
  fetchLocation(cityName);
}

function fetchLocation(search) {
  let locationURL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${apiKey}`;
  
  fetch(locationURL)
    .then(response => response.json())
    .then(data => {
      let location = {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name
      };
      fetchWeather(location);
    })
    .catch(error => console.error(error))
}

function fetchWeather(locationObj) {
  let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationObj.lat}&lon=${locationObj.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`;

  fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      let current = {
        icon: data.current.weather[0].icon,
        date: moment.unix(data.current.dt).format('YYYY-MM-DDTHH:mm:ss'),
        temp: data.current.temp,
        wind: data.current.wind_speed,
        humidity: data.current.humidity,
        uvIndex: data.current.uvi
      };
      let forecast = [
        {
          icon: data.daily[1].weather[0].icon,
          date: moment.unix(data.daily[1].dt).format('YYYY-MM-DD'),
          temp: data.daily[1].temp.day,
          wind: data.daily[1].wind_speed,
          humidity: data.daily[1].humidity
        },
        {
          icon: data.daily[2].weather[0].icon,
          date: moment.unix(data.daily[2].dt).format('YYYY-MM-DD'),
          temp: data.daily[2].temp.day,
          wind: data.daily[2].wind_speed,
          humidity: data.daily[2].humidity
        },
        {
          icon: data.daily[3].weather[0].icon,
          date: moment.unix(data.daily[3].dt).format('YYYY-MM-DD'),
          temp: data.daily[3].temp.day,
          wind: data.daily[3].wind_speed,
          humidity: data.daily[3].humidity
        },
        {
          icon: data.daily[4].weather[0].icon,
          date: moment.unix(data.daily[4].dt).format('YYYY-MM-DD'),
          temp: data.daily[4].temp.day,
          wind: data.daily[4].wind_speed,
          humidity: data.daily[4].humidity
        },
        {
          icon: data.daily[5].weather[0].icon,
          date: moment.unix(data.daily[5].dt).format('YYYY-MM-DD'),
          temp: data.daily[5].temp.day,
          wind: data.daily[5].wind_speed,
          humidity: data.daily[5].humidity
        }
      ];
      renderWeather(locationObj.name, current, forecast);
    })
    .catch(error => console.error(error))
}


function renderWeather(city, currentWeather, forecastWeather) {
  let iconSource = 'https://openweathermap.org/img/wn/';
  let header = document.createElement('h2');
  let futureHeader = document.createElement('h2');
  let icon = document.createElement('img');
  let info = document.createElement('ul');
  let span = document.createElement('span');

  currentDay.classList.add('border', 'border-dark');
  currentDay.append(header, icon, info);
  currentDay.children[0].classList.add('d-inline-block');
  currentDay.children[0].textContent = `${city} ${currentWeather.date}`;
  currentDay.children[1].setAttribute('src', `${iconSource}${currentWeather.icon}.png`);
  currentDay.children[1].classList.add('mb-3');
  for (let i = 0; i < Object.keys(currentWeather).length - 2; i++) {
    let list = document.createElement('li');
    currentDay.children[2].append(list);
  }
  currentDay.children[2].children[0].textContent = `Temperaure: ${currentWeather.temp}°F`;
  currentDay.children[2].children[1].textContent = `Wind Speed: ${currentWeather.wind}MPH`;
  currentDay.children[2].children[2].textContent = `Humidity: ${currentWeather.humidity}%`;
  if (currentWeather.uvIndex = 0) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: green; border-radius: 3px; margin-left: 4px;  color: white; padding: 4px 20px 4px 20px; ');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  } else if (currentWeather.uvIndex = 1) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: green; border-radius: 3px; margin-left: 4px;  color: white; padding: 4px 20px 4px 20px; ');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  } else if (currentWeather.uvIndex = 2) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: green; border-radius: 3px; margin-left: 4px;  color: white; padding: 4px 20px 4px 20px; ');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  } else if (currentWeather.uvIndex = 3) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: green; border-radius: 3px; margin-left: 4px;  color: white; padding: 4px 20px 4px 20px; ');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  } else if (currentWeather.uvIndex = 4) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: yellow; border-radius: 3px; margin-left: 4px;  color: white; padding: 4px 20px 4px 20px; ');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  } else if (currentWeather.uvIndex = 5) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: yellow; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  } else if (currentWeather.uvIndex = 6) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: yellow; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;

  }  else if (currentWeather.uvIndex = 7) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: orange; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  } else if (currentWeather.uvIndex = 8) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: orange; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  } else if (currentWeather.uvIndex = 9) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: red; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  } else if (currentWeather.uvIndex = 10) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: red; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  } else if (currentWeather.uvIndex >= 11) {
    currentDay.children[2].children[3].textContent = 'UV Index: '
    currentDay.children[2].children[3].append(span);
    currentDay.children[2].children[3].children[0].setAttribute('style', 'background-color: purple; border-radius: 3px; margin-left: 4px;  color: grey; padding: 4px 20px 4px 20px;');
    currentDay.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  }

  document.getElementById('future-heading').append(futureHeader);
  document.getElementById('future-heading').children[0].textContent = '5-Day Forecast';
  comingDays.classList.add('card-deck');
  for (let i = 0; i < forecastWeather.length; i++) {
    let card = document.createElement('div');
    let cardBody = document.createElement('div');
    let cardHeader = document.createElement('h5');
    let cardList = document.createElement('ul');
    let cardIcon = document.createElement('img');
    
    cardBody.classList.add('card-body');
    cardHeader.classList.add('card-title');
    cardIcon.setAttribute('src', `${iconSource}${forecastWeather[i].icon}.png`)
    cardList.classList.add('card-text');

    card.classList.add('card');
    card.setAttribute('style', 'background-color: #314F78; color: white;');
    comingDays.append(card);
    comingDays.children[i].append(cardBody);
    comingDays.children[i].children[0].append(cardHeader);
    comingDays.children[i].children[0].children[0].textContent = forecastWeather[i].date;
    comingDays.children[i].children[0].append(cardIcon);
    comingDays.children[i].children[0].append(cardList);
    for (let j = 0; j < Object.keys(forecastWeather[i]).length - 2; j ++) {
      let cardInfo = document.createElement('li');
      comingDays.children[i].children[0].children[2].append(cardInfo);
    }
    comingDays.children[i].children[0].children[2].children[0].textContent = `Temperature: ${forecastWeather[i].temp}°F`;
    comingDays.children[i].children[0].children[2].children[1].textContent = `Wind Speed: ${forecastWeather[i].wind}MPH`;
    comingDays.children[i].children[0].children[2].children[2].textContent = `Humidity: ${forecastWeather[i].humidity}%`;

  }
  
  let currentRender = {currentWeather, forecastWeather}
  if (localStorage.getItem(city) === null) {
    localStorage.setItem(city, JSON.stringify(currentRender));
    generateButton(city);
  }
}

function generateButton(prevSearch) {
  let previousSearch = document.createElement('button');
  previousSearch.classList.add('btn', 'btn-secondary', 'btn-block');
  previousSearch.setAttribute('type', 'button');
  previousSearch.setAttribute('data-city', `${prevSearch}`);
  previousSearch.textContent = prevSearch;
  document.getElementById('prevSearch').append(previousSearch);
}

function retrieve() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let previousCitySearch = localStorage.key(i);
      generateButton(previousCitySearch);
    }
  } else {
    return
  }
}

retrieve();
document.getElementById('getWeather').addEventListener('submit', searchHandle);
document.querySelectorAll('.btn-secondary').forEach(button => {
  button.addEventListener('click', function() {
    let citySelector = this.dataset.city;
    let objectSelector = JSON.parse(localStorage.getItem(citySelector));
    currentDay.innerHTML = '';
    comingDays.innerHTML = '';
    renderWeather(citySelector, objectSelector.currentWeather, objectSelector.forecastWeather);
  })
})
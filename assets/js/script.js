const apiKey = '85527c3ecedc82f36ed8c6efc3a56528';
let currentForecastEl = document.getElementById('currentForecast');
let futureForecastEl = document.getElementById('futureForecast');

function searchHandle(e) {
  e.preventDefault();
  currentForecastEl.innerHTML = '';
  futureForecastEl.innerHTML = '';
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
        date: moment.unix(data.current.dt).format('M[/]D[/]YYYY'),
        temp: data.current.temp,
        wind: data.current.wind_speed,
        humidity: data.current.humidity,
        uvIndex: data.current.uvi
      };
      let forecast = [
        {
          icon: data.daily[1].weather[0].icon,
          date: moment.unix(data.daily[1].dt).format('M[/]D[/]YYYY'),
          temp: data.daily[1].temp.day,
          wind: data.daily[1].wind_speed,
          humidity: data.daily[1].humidity
        },
        {
          icon: data.daily[2].weather[0].icon,
          date: moment.unix(data.daily[2].dt).format('M[/]D[/]YYYY'),
          temp: data.daily[2].temp.day,
          wind: data.daily[2].wind_speed,
          humidity: data.daily[2].humidity
        },
        {
          icon: data.daily[3].weather[0].icon,
          date: moment.unix(data.daily[3].dt).format('M[/]D[/]YYYY'),
          temp: data.daily[3].temp.day,
          wind: data.daily[3].wind_speed,
          humidity: data.daily[3].humidity
        },
        {
          icon: data.daily[4].weather[0].icon,
          date: moment.unix(data.daily[4].dt).format('M[/]D[/]YYYY'),
          temp: data.daily[4].temp.day,
          wind: data.daily[4].wind_speed,
          humidity: data.daily[4].humidity
        },
        {
          icon: data.daily[5].weather[0].icon,
          date: moment.unix(data.daily[5].dt).format('M[/]D[/]YYYY'),
          temp: data.daily[5].temp.day,
          wind: data.daily[5].wind_speed,
          humidity: data.daily[5].humidity
        }
      ];
      renderWeather(locationObj.name, current, forecast);
    })
    .catch(error => console.error(error))
}

// FUNCTIONALITY FOR RENDERING CONTENT //

function renderWeather(city, currentWeather, forecastWeather) {
  // render the weather
  let iconSource = 'https://openweathermap.org/img/wn/';
  let header = document.createElement('h2');
  let futureHeader = document.createElement('h2');
  let icon = document.createElement('img');
  let info = document.createElement('ul');
  let span = document.createElement('span');

  currentForecastEl.classList.add('border', 'border-dark');
  currentForecastEl.append(header, icon, info);
  currentForecastEl.children[0].classList.add('d-inline-block');
  currentForecastEl.children[0].textContent = `${city} ${currentWeather.date}`;
  currentForecastEl.children[1].setAttribute('src', `${iconSource}${currentWeather.icon}.png`);
  currentForecastEl.children[1].classList.add('mb-3');
  for (let i = 0; i < Object.keys(currentWeather).length - 2; i++) {
    let list = document.createElement('li');
    currentForecastEl.children[2].append(list);
  }
  currentForecastEl.children[2].children[0].textContent = `Temp: ${currentWeather.temp}°F`;
  currentForecastEl.children[2].children[1].textContent = `Wind: ${currentWeather.wind}MPH`;
  currentForecastEl.children[2].children[2].textContent = `Humidity: ${currentWeather.humidity}%`;
  if (currentWeather.uvIndex <= 2) {
    currentForecastEl.children[2].children[3].textContent = 'UV Index: '
    currentForecastEl.children[2].children[3].append(span);
    currentForecastEl.children[2].children[3].children[0].setAttribute('style', 'background-color: green; margin-left: 4px; padding: 4px 20px 4px 20px; color: white; border-radius: 5px;');
    currentForecastEl.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  } else if (currentWeather.uvIndex <= 5) {
    currentForecastEl.children[2].children[3].textContent = 'UV Index: '
    currentForecastEl.children[2].children[3].append(span);
    currentForecastEl.children[2].children[3].children[0].setAttribute('style', 'background-color: yellow; margin-left: 4px; padding: 4px 20px 4px 20px; color: black; border-radius: 5px;');
    currentForecastEl.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  } else if (currentWeather.uvIndex >= 8) {
    currentForecastEl.children[2].children[3].textContent = 'UV Index: '
    currentForecastEl.children[2].children[3].append(span);
    currentForecastEl.children[2].children[3].children[0].setAttribute('style', 'background-color: red; margin-left: 4px; padding: 4px 20px 4px 20px; color: black; border-radius: 5px;');
    currentForecastEl.children[2].children[3].children[0].textContent = `${currentWeather.uvIndex}`;
  }

  document.getElementById('future-heading').append(futureHeader);
  document.getElementById('future-heading').children[0].textContent = '5-Day Forecast';
  futureForecastEl.classList.add('card-deck');
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
    futureForecastEl.append(card);
    futureForecastEl.children[i].append(cardBody);
    futureForecastEl.children[i].children[0].append(cardHeader);
    futureForecastEl.children[i].children[0].children[0].textContent = forecastWeather[i].date;
    futureForecastEl.children[i].children[0].append(cardIcon);
    futureForecastEl.children[i].children[0].append(cardList);
    for (let j = 0; j < Object.keys(forecastWeather[i]).length - 2; j ++) {
      let cardInfo = document.createElement('li');
      futureForecastEl.children[i].children[0].children[2].append(cardInfo);
    }
    futureForecastEl.children[i].children[0].children[2].children[0].textContent = `Temperature: ${forecastWeather[i].temp}°F`;
    futureForecastEl.children[i].children[0].children[2].children[1].textContent = `Wind: ${forecastWeather[i].wind}MPH`;
    futureForecastEl.children[i].children[0].children[2].children[2].textContent = `Humidity: ${forecastWeather[i].humidity}%`;

  }
  
  let currentRender = {currentWeather, forecastWeather}
  if (localStorage.getItem(city) === null) {
    localStorage.setItem(city, JSON.stringify(currentRender));
    generateButton(city);
  }
}

function generateButton(prevSearch) {
  let prevSearchButton = document.createElement('button');
  prevSearchButton.classList.add('btn', 'btn-secondary', 'btn-block');
  prevSearchButton.setAttribute('type', 'button');
  prevSearchButton.setAttribute('data-city', `${prevSearch}`);
  prevSearchButton.textContent = prevSearch;
  document.getElementById('prevSearch').append(prevSearchButton);
}

function retrieve() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let prevSearchCity = localStorage.key(i);
      generateButton(prevSearchCity);
    }
  } else {
    return
  }
}

retrieve();
document.getElementById('getWeather').addEventListener('submit', searchHandle);
document.querySelectorAll('.btn-secondary').forEach(button => {
  button.addEventListener('click', function() {
    let selectionCity = this.dataset.city;
    let selectionObject = JSON.parse(localStorage.getItem(selectionCity));
    currentForecastEl.innerHTML = '';
    futureForecastEl.innerHTML = '';
    renderWeather(selectionCity, selectionObject.currentWeather, selectionObject.forecastWeather);
  })
})
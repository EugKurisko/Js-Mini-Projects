class UI {
    constructor() {

    }

    displayWeather(data) {
        document.getElementById('w-location').textContent = data.name.toUpperCase() + ', ' +
            data.sys.country;
        document.getElementById('w-desc').textContent = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1);
        document.getElementById('w-string').textContent = data.main.temp + ' C';
        document.getElementById('w-icon').setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        document.getElementById('w-humidity').textContent = 'Relative humidity: ' + data.main.humidity + '%';
        document.getElementById('w-dewpoint').textContent = 'Atmospheric pressure: ' + data.main.pressure + ' J/(kg·K)';
        document.getElementById('w-feels-like').textContent = 'Feels like: ' + data.main.feels_like + ' C';
        document.getElementById('w-wind').textContent = 'Speen of wind:  ' + (data.wind.speed * 1.60).toFixed(2) + ' KPH';
    }
}
const ui = new UI;
let loc = Storage.getInfo();
const weather = new Weather(loc.country, loc.city);

const changeBtn = document.getElementById('w-change-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let country = document.getElementById('country').value;
    let city = document.getElementById('city').value;

    Storage.saveInfo(country, city);
    weather.changeLocation(country, city);
    loadWeather();
    $('#locModal').modal('hide');
});

function loadWeather() {
    weather.getWeather().
        then(data => {
            console.log(data);
            ui.displayWeather(data)
        }).
        catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", loadWeather);
class Weather {
    constructor(country, city) {
        this.api = '125a24a05147c641dcce92460dea0589';
        this.country = country;
        this.city = city;
    }

    async getWeather() {
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.api}&units=metric`);
        const weather = await weatherResponse.json();
        return weather;
    }

    changeLocation(country, city) {
        this.country = country;
        this.city = city;
    }
}
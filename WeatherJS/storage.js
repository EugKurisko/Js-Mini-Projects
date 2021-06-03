class Storage {

    static defaultCountry = 'UA';
    static defaultCity = 'Dnipro';
    static saveInfo(country, city) {

        localStorage.setItem('country', country);
        localStorage.setItem('city', city);
    }

    static getInfo() {
        return {
            country: localStorage.getItem('country') ?? this.defaultCountry,
            city: localStorage.getItem('city') ?? this.defaultCity
        };
    }
}
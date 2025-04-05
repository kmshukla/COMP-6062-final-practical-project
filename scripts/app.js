const { createApp } = Vue;

createApp({
    data() {
        return {
            userProfile: {
                name: '',
                age: '',
                picture: ''
            },
            weatherForm: {
                city: 'Toronto',
                province: 'Ontario',
                country: 'Canada'
            },
            weatherInfo: {
                temperature: '',
                wind_speed: '',
                weather_description: ''
            },
            locationInfo: {
                city: '',
                region: '',
                country: ''
            },
            dictionaryWord: '',
            dictionaryResult: {
                word: '',
                phonetic: '',
                definition: ''
            }
        }
    },
    created() {
        this.fetchRandomUser();
        this.fetchWeather();
    },
    methods: {
        fetchRandomUser() {
            fetch('https://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json())
                .then(data => {
                    this.userProfile.name = data.first_name + ' ' + data.last_name;
                    this.userProfile.age = data.age;
                    this.userProfile.picture = data.profile_picture || 'https://via.placeholder.com/150';
                })
                .catch(error => {
                    console.error('Error fetching random user:', error);
                });
        },

        fetchWeather() {
            fetch(`https://comp6062.liamstewart.ca/weather-information?city=Toronto&province=Ontario&country=Canada`)
                .then(response => response.json())
                .then(data => {
                    this.weatherInfo.temperature = data.temperature;
                    this.weatherInfo.wind_speed = data.wind_speed;
                    this.weatherInfo.weather_description = data.weather_description;
                    this.locationInfo.city = data.location.city;
                    this.locationInfo.region = data.location.region;
                    this.locationInfo.country = data.location.country;
                    this.locationInfo.latitude = data.location.latitude;
                    this.locationInfo.longitude = data.location.longitude;
                    this.locationInfo.population = data.location.population;
                })
                .catch(error => {
                    console.error('Error fetching weather information:', error);
                });
        },

        fetchDefinition() {
            fetch(`https://comp6062.liamstewart.ca/define?word=Bottle`)
                .then(response => response.json())
                .then(data => {
                    const result = data[0];
                    this.dictionaryResult.word = result.word;
                    this.dictionaryResult.phonetic = result.phonetic;
                    this.dictionaryResult.definition = result.definition;
                })
                .catch(error => {
                    console.error('Error fetching definition:', error);
                });
        }
    }
}).mount('#app');

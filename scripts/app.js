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
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            weatherInfo: {
                temperature: '',
                wind: '',
                description: ''
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
            const url = `https://comp6062.liamstewart.ca/weather-information?city=${encodeURIComponent(this.weatherForm.city)}&province=${encodeURIComponent(this.weatherForm.province)}&country=${encodeURIComponent(this.weatherForm.country)}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.weatherInfo.temperature = data.temperature;
                    this.weatherInfo.wind = data.wind;
                    this.weatherInfo.description = data.description;
                })
                .catch(error => {
                    console.error('Error fetching weather information:', error);
                });
        },

        fetchDefinition() {
            const url = `https://comp6062.liamstewart.ca/define?word=${encodeURIComponent(this.dictionaryWord)}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dictionaryResult.word = data.word;
                    this.dictionaryResult.phonetic = data.phonetic;
                    this.dictionaryResult.definition = data.definition;
                })
                .catch(error => {
                    console.error('Error fetching definition:', error);
                });
        }
    }
}).mount('#app');

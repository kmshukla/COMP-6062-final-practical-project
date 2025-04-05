const { createApp } = Vue;

createApp({
    data() {
        return {
            // Data for Random User Profile
            userProfile: {
                name: '',
                age: '',
                picture: ''
            },
            // Data for Weather Form Inputs
            weatherForm: {
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            // Data for Weather Information
            weatherInfo: null,
            // Data for Dictionary Search Word
            dictionaryWord: '',
            // Data for Dictionary Search Result
            dictionaryResult: null
        }
    },
    created() {
        // Fetch initial random user and weather info when app is created
        this.fetchRandomUser();
        this.fetchWeather();
    },
    methods: {
        // Fetch a random user profile from API
        fetchRandomUser() {
            fetch('http://comp6062.liamstewart.ca/random-user-profile')
                .then(response => response.json())
                .then(data => {
                    this.userProfile.name = data.firstName + ' ' + data.lastName;
                    this.userProfile.age = data.age;
                    this.userProfile.picture = data.picture || 'https://via.placeholder.com/150';
                })
                .catch(error => console.error('Error fetching random user:', error));
        },

        // Fetch weather information based on city, province, and country
        fetchWeather() {
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.weatherForm.city}&province=${this.weatherForm.province}&country=${this.weatherForm.country}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.weatherInfo = {
                        temperature: data.temperature,
                        wind: data.wind,
                        description: data.description
                    };
                })
                .catch(error => console.error('Error fetching weather:', error));
        },

        // Fetch dictionary definition for a given word
        fetchDefinition() {
            const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionaryWord}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.dictionaryResult = {
                        word: data.word,
                        phonetic: data.phonetic,
                        definition: data.definition
                    };
                })
                .catch(error => console.error('Error fetching definition:', error));
        }
    }
}).mount('#app');

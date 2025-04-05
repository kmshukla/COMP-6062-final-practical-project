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
                    this.userProfile.name = data.first_name + ' ' + data.last_name;
                    this.userProfile.age = data.age;
                    this.userProfile.picture = data.profile_picture || 'https://via.placeholder.com/150';
                })
                .catch(error => console.error('Error fetching random user:', error));
        },

        // Fetch weather information based on city, province, and country
        fetchWeather() {
            if (!this.weatherForm.city || !this.weatherForm.province || !this.weatherForm.country) {
                this.weatherInfo = {
                    temperature: "N/A",
                    wind: "N/A",
                    description: "Please provide city, province, and country."
                };
                return;
            }

            const url = `http://comp6062.liamstewart.ca/weather-information?city=${encodeURIComponent(this.weatherForm.city)}&province=${encodeURIComponent(this.weatherForm.province)}&country=${encodeURIComponent(this.weatherForm.country)}`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        this.weatherInfo = {
                            temperature: "N/A",
                            wind: "N/A",
                            description: data.message
                        };
                    } else {
                        this.weatherInfo = {
                            temperature: data.temperature,
                            wind: data.wind,
                            description: data.description
                        };
                    }
                })
                .catch(error => {
                    console.error('Error fetching weather:', error);
                    this.weatherInfo = {
                        temperature: "Error",
                        wind: "Error",
                        description: "Something went wrong."
                    };
                });
        },

        // Fetch dictionary definition for a given word
        fetchDefinition() {
            const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionaryWord}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && data.word && data.definition) {
                        this.dictionaryResult = {
                            word: data.word,
                            phonetic: data.phonetic || 'N/A',
                            definition: data.definition
                        };
                    } else {
                        this.dictionaryResult = {
                            word: 'Not Found',
                            phonetic: '',
                            definition: 'No definition found for the given word.'
                        };
                    }
                })
                .catch(error => {
                    console.error('Error fetching definition:', error);
                    this.dictionaryResult = {
                        word: 'Error',
                        phonetic: '',
                        definition: 'Something went wrong fetching the definition.'
                    };
                });
        }
    }
}).mount('#app');

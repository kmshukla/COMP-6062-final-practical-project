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
            weatherInfo: null,
            dictionaryWord: '',
            dictionaryResult: null
        }
    },
    created() {
        this.fetchRandomUser();
        this.fetchWeather(); // Fetch London's weather on page load
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
            if (!this.weatherForm.city || !this.weatherForm.province || !this.weatherForm.country) {
                this.weatherInfo = {
                    temperature: "N/A",
                    wind: "N/A",
                    description: "Please provide city, province, and country."
                };
                return;
            }

            const url = `https://comp6062.liamstewart.ca/weather-information?city=${encodeURIComponent(this.weatherForm.city)}&province=${encodeURIComponent(this.weatherForm.province)}&country=${encodeURIComponent(this.weatherForm.country)}`;

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
                        description: "Unable to fetch weather information."
                    };
                });
        },

        fetchDefinition() {
            if (!this.dictionaryWord) {
                this.dictionaryResult = {
                    word: 'No word entered',
                    phonetic: '',
                    definition: 'Please enter a word to search.'
                };
                return;
            }

            const url = `https://comp6062.liamstewart.ca/define?word=${encodeURIComponent(this.dictionaryWord)}`;

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
                            definition: 'No definition found for the entered word.'
                        };
                    }
                })
                .catch(error => {
                    console.error('Error fetching definition:', error);
                    this.dictionaryResult = {
                        word: 'Error',
                        phonetic: '',
                        definition: 'Unable to fetch definition.'
                    };
                });
        }
    }
}).mount('#app');

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Section
    
    const navLinks = document.querySelectorAll('header nav ul a[href^="#"]');
    const sections = document.querySelectorAll('.content-section');

    const setActiveLink = () => {
        const currentHash = window.location.hash || '#home';
        navLinks.forEach(link => {
            link.classList.remove('active', 'clicked');
            if (link.querySelector('i')) {
                link.querySelector('i').style.opacity = '0';
                link.querySelector('i').style.transform = 'translateX(10px)';
            }
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active', 'clicked');
                if (link.querySelector('i')) {
                    link.querySelector('i').style.opacity = '1';
                    link.querySelector('i').style.transform = 'translateX(0)';
                }
                updateBackgroundPosition(link);

                // Show the corresponding section without animation
                sections.forEach(section => {
                    if (section.id === currentHash.substring(1)) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
            }
        });

        // Scroll to the section on page load or hash change
        const targetSection = document.querySelector(currentHash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'auto' }); // Use 'auto' for instant scroll
        }
    };

    const updateBackgroundPosition = (targetLink) => {
        const targetIndex = Array.from(navLinks).indexOf(targetLink);
        const backgroundPositions = ['0% 0%', '33.33% 0%', '66.66% 0%', '100% 0%'];
        navLinks.forEach(link => {
            link.style.setProperty('--background-position', backgroundPositions[targetIndex]);
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            navLinks.forEach(link => {
                link.classList.remove('active', 'clicked');
                if (link.querySelector('i')) {
                    link.querySelector('i').style.opacity = '0';
                    link.querySelector('i').style.transform = 'translateX(10px)';
                }
            });
            this.classList.add('active', 'clicked');
            if (this.querySelector('i')) {
                this.querySelector('i').style.opacity = '1';
                this.querySelector('i').style.transform = 'translateX(0)';
            }
            window.history.pushState(null, null, this.getAttribute('href'));
            updateBackgroundPosition(this);

            // Show the corresponding section without animation
            sections.forEach(section => {
                if (section.id === this.getAttribute('href').substring(1)) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });

        link.addEventListener('mouseover', function (e) {
            if (!this.classList.contains('active')) {
                if (this.querySelector('i')) {
                    this.querySelector('i').style.opacity = '1';
                    this.querySelector('i').style.transform = 'translateX(0)';
                }
            }
        });

        link.addEventListener('mouseout', function (e) {
            if (!this.classList.contains('active')) {
                if (this.querySelector('i')) {
                    this.querySelector('i').style.opacity = '0';
                    this.querySelector('i').style.transform = 'translateX(10px)';
                }
            }
        });
    });

    window.addEventListener('popstate', setActiveLink);
    window.addEventListener('hashchange', setActiveLink);

    // Set active link on page load
    setActiveLink();

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            navLinks.forEach(link => {
                link.classList.remove('active', 'clicked');
                if (link.querySelector('i')) {
                    link.querySelector('i').style.opacity = '0';
                    link.querySelector('i').style.transform = 'translateX(10px)';
                }
            });
            this.classList.add('active', 'clicked');
            if (this.querySelector('i')) {
                this.querySelector('i').style.opacity = '1';
                this.querySelector('i').style.transform = 'translateX(0)';
            }
            window.history.pushState(null, null, this.getAttribute('href'));
            updateBackgroundPosition(this);

            // Show the corresponding section without animation
            sections.forEach(section => {
                if (section.id === this.getAttribute('href').substring(1)) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });

        link.addEventListener('mouseover', function (e) {
            if (!this.classList.contains('active')) {
                if (this.querySelector('i')) {
                    this.querySelector('i').style.opacity = '1';
                    this.querySelector('i').style.transform = 'translateX(0)';
                }
            }
        });

        link.addEventListener('mouseout', function (e) {
            if (!this.classList.contains('active')) {
                if (this.querySelector('i')) {
                    this.querySelector('i').style.opacity = '0';
                    this.querySelector('i').style.transform = 'translateX(10px)';
                }
            }
        });
    });

    window.addEventListener('popstate', setActiveLink);
   
    // News Section

    let apiKey = "0bb4d4d9c12e43c79498cda8d1680b46";

    const options_container = document.getElementById("options-container");
    const news_container = document.getElementById("news-container");

    const country = "us";
    const options = [
        "general", "entertainment",
        "business", "health", "science",
        "sports", "technology"
    ];

    let requestURL;

    const generateNews = (articles) => {
        news_container.innerHTML = "";
        if (!articles || articles.length === 0) {
            news_container.innerHTML = "<p>No news available.</p>";
            return;
        }
        articles.forEach(item => {
            let news_card = document.createElement("div");
            news_card.classList.add("news-card");

            let publishedDate = new Date(item.publishedAt);
            let options = { year: 'numeric', month: 'long', day: 'numeric' };
            let date = publishedDate.toLocaleDateString(undefined, options);
            let time = publishedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

            let title = item.title.replace(/ - [^-]+$/, '');
            let description = item.description ? item.description.replace(/\… \[\+\d+ chars\]/, '') : '';

            news_card.innerHTML =
                `<div class="news-image-container">
                    <img src="${item.urlToImage || "./Images/image-not-available.png"}" alt="${item.urlToImage}">
                </div>
                
                <div class="news-content">
                    <div class="news-title">
                        <span>Title: </span> ${title}
                    </div>
                    <div class="news-author">
                        <span>Author: </span> ${item.author || "No author available"}
                    </div>
                    <div class="news-description">
                        <span>Description: </span> ${description || "No description available"}
                    </div>
                    <div class="news-published">
                        <span>Article Published: </span> ${date}
                    </div>
                    <div class="news-published">
                        <span>Time Published: </span> ${time}
                    </div>
                    <div class="news-actions">
                        <a href="${item.url}" target="_blank" class="view-url-button">Read More</a>
                        <a href="#" class="share-to-live-chat-button"><i class="fa-sharp fa-solid fa-share-from-square"></i></a>
                    </div>
                </div>`;

            news_container.appendChild(news_card);

            console.log(item);
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        document.querySelectorAll('.news-card').forEach(card => {
            observer.observe(card);
        });
    };

    const getNews = async () => {
        try {
            let response = await fetch(requestURL);
            if (!response.ok) {
                throw new Error("Data/News unavailable at the moment. Please try again later.");
            }
            let data = await response.json();
            generateNews(data.articles);
        } catch (error) {
            alert(error.message);
        }
    };

    window.selectNewsCategory = (event, category) => {
        let options = document.querySelectorAll(".options");
        options.forEach((element) => {
            element.classList.remove("active");
        });

        requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=50&category=${category}&apiKey=${apiKey}`;
        event.target.classList.add("active");
        getNews();
    };

    const createOptions = () => {
        options_container.innerHTML = "";
        options.forEach((category) => {
            const button = document.createElement("button");
            button.className = `options ${category === "general" ? "active" : ""}`;
            button.innerText = category;
            button.onclick = (e) => selectNewsCategory(e, category);
            options_container.appendChild(button);
        });
    };

    const init = () => {
        requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=50&category=general&apiKey=${apiKey}`;
        createOptions();
        getNews();

        document.querySelector('#home').classList.add('active');
    };

    window.onload = init;

    // Weather Section
    let city_input = document.getElementById("city-input");
    let search_button = document.getElementById("search-button");
    let location_button = document.getElementById("location-button")

    let current_weather_card = document.getElementById("current-weather-card");
    let five_days_forecast_card = document.getElementById("five-day-weather-forecast");
    let condition_card = document.getElementById("air-quality-card");
    let sun_card = document.getElementById("sun-card");

    const humidity_value = document.getElementById('humidity-value');
    const pressure_value = document.getElementById('pressure-value');
    const visibility_value = document.getElementById('visibility-value');
    const wind_speed_value = document.getElementById('wind-speed-value');
    const feels_like_value = document.getElementById('feels-like-value');

    let weather_hourly_forecast_card = document.querySelector('.weather-hourly-forecast');

    let condition_list = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

    let apiKey_2 = "058915b3b6349b01dd47e5c42787640a";

    const getWeatherDetails = (name, lat, lon, country, state) => {
        let weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey_2}`;
        let forecast_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey_2}`;
        let air_pollution_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey_2}`;

        let days = [
            "Sunday", "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday"
        ];

        let months = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        fetch(weather_api_url).then(res => res.json()).then(data => {
            let date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            let strTime = hours + ':' + minutes + ' ' + ampm;

            console.log("Weather data:", data);

            current_weather_card.innerHTML = `
            <div class="current-weather">
                <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p class="weather-description">${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather">
                </div>
            </div>
            <hr>
            <div class="weather-card-footer">
                <p><i class="fa-solid fa-calendar"></i> ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
                <p><i class="fa-solid fa-clock"></i> As of ${strTime}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${name}, ${state} ${country}</p>
            </div>
            `;
        }).catch(error => {
            alert(`Failed to fetch the weather: ${error.message}`);
        });

        fetch(forecast_api_url).then(res => res.json()).then(data => {
            let today = new Date().getDate();
            let timezoneOffset = data.city.timezone;
    
            let hourly_forecast = data.list;
            weather_hourly_forecast_card.innerHTML = ``;
            for (let i = 0; i <= 7; i++) {
                let hour_forecast_date = new Date((hourly_forecast[i].dt + timezoneOffset) * 1000);
                let hr = hour_forecast_date.getUTCHours();
                let a = 'PM';
                if (hr < 12) a = 'AM';
                if (hr == 0) hr = '12';
                if (hr > 12) hr = hr - 12;
    
                weather_hourly_forecast_card.innerHTML += `
                <div class="weather-card">
                    <p>${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourly_forecast[i].weather[0].icon}.png" alt="">
                    <p>${(hourly_forecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
                `;
            }
    
            let unique_forecast_days = [];
            let five_days_forecast = data.list.filter(forecast => {
                let forecast_date = new Date((forecast.dt + timezoneOffset) * 1000).getDate();
                if (forecast_date !== today && !unique_forecast_days.includes(forecast_date)) {
                    unique_forecast_days.push(forecast_date);
                    return true;
                }
                return false;
            });

            five_days_forecast_card.innerHTML = '';

            for (let i = 0; i < five_days_forecast.length; i++) {
                let date = new Date(five_days_forecast[i].dt_txt);
                five_days_forecast_card.innerHTML += `
                <div class="forecast-item">
                    <div class="icon-wrapper">
                        <img src="http://openweathermap.org/img/wn/${five_days_forecast[i].weather[0].icon}.png" alt="">
                        <span>${(five_days_forecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                    </div>
                    <p>${months[date.getMonth()]} ${date.getDate()}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
                `;
            }

        }).catch(() => {
            alert("Failed to fetch five-day weather forecast.");
        });

        fetch(air_pollution_url).then(res => res.json()).then(data => {
            let { co, no, no2, o3, so2, pm2_5, pm10, nh3 } = data.list[0].components;

            let airQualityCard = `
                <div class="card-header">
                    <p>Air Quality Index</p>
                    <p class="air-index condition-${data.list[0].main.aqi}">${condition_list[data.list[0].main.aqi - 1]}</p>
                </div>
                <div class="air-indices">
                    <i class="fa-solid fa-wind fa-3x"></i>

                    <div class="item">
                        <p>PM2.5</p>
                        <h2>${pm2_5}</h2>
                    </div>

                    <div class="item">
                        <p>PM10</p>
                        <h2>${pm10}</h2>
                    </div>

                    <div class="item">
                        <p>SO2</p>
                        <h2>${so2}</h2>
                    </div>

                    <div class="item">
                        <p>CO</p>
                        <h2>${co}</h2>
                    </div>

                    <div class="item">
                        <p>NO</p>
                        <h2>${no}</h2>
                    </div>

                    <div class="item">
                        <p>NO2</p>
                        <h2>${no2}</h2>
                    </div>

                    <div class="item">
                        <p>NH3</p>
                        <h2>${nh3}</h2>
                    </div>

                    <div class="item">
                        <p>O3</p>
                        <h2>${o3}</h2>
                    </div>
                </div>
            `;

            condition_card.innerHTML = airQualityCard;

        }).catch(() => {
            alert("Failed to fetch air quality index");
        });

        fetch(weather_api_url).then(res => res.json()).then(data => {
            let {sunrise, sunset} = data.sys;
            let {timezone, visibility} = data;
            let {humidity, pressure, feels_like} = data.main;
            let {speed} = data.wind;

            const sunrise_time = moment.utc(sunrise, "X").add(timezone, 'seconds').format('hh:mm A');
            const sunset_time = moment.utc(sunset, "X").add(timezone, 'seconds').format('hh:mm A');

            sun_card.innerHTML = `
            <div class="card-header">
                <p>Sunrise & Sunset</p>
            </div>
            <div class="sunrise-and-sunset">
                <div class="sun-weather-item">
                    <div class="icon">
                        <img src="Images/sunrise.png" width="70px" height="auto">
                    </div>
                    <div>
                        <p>Sunrise</p>
                        <h2>${sunrise_time}</h2>
                    </div>
                </div>
                <div class="sun-weather-item">
                    <div class="icon">
                        <img src="Images/sunset.png" width="70px" height="auto">
                    </div>
                    <div>
                        <p>Sunset</p>
                        <h2>${sunset_time}</h2>
                    </div>
                </div>
            </div>
            `;

            humidity_value.innerHTML = `${humidity}%`;
            pressure_value.innerHTML = `${pressure} hPa`;
            visibility_value.innerHTML = `${visibility / 1000} km`;
            wind_speed_value.innerHTML = `${speed} m/s`;
            feels_like_value.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;

        }).catch(() => {
            alert("Failed to fetch current weather");
        });
    };

    const getCityCoordinates = () => {
        let city_name = city_input.value.trim();
        city_input.value = '';

        if (!city_name) {
            alert('Please enter a city name.');
            return;
        }

        let geo_coding_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${apiKey_2}`;
        fetch(geo_coding_url).then(res => res.json()).then(data => {
            if (data.length === 0) {
                alert('City not found.');
                return;
            }
            let { name, lat, lon, country, state } = data[0];
            getWeatherDetails(name, lat, lon, country, state);
            console.log(data);
        }).catch(error => {
            alert(`Failed to fetch coordinates of ${city_name}: ${error.message}`);
        });
    };

    search_button.addEventListener('click', getCityCoordinates);
    city_input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getCityCoordinates();
        }
    });

    const getUserCoordinates = () => {
        navigator.geolocation.getCurrentPosition(position => {
            let {latitude, longitude} = position.coords;
            let reverse_geo_coding_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey_2}`;
    
            fetch(reverse_geo_coding_url).then(res => res.json()).then(data => {

                let {name, country, state} = data[0];
                getWeatherDetails(name, latitude, longitude, country, state);
            
            }).catch(() => {
                alert("Failed to fetch user location.");
            });
        });
    };
    
    location_button.addEventListener('click', getUserCoordinates);

    //Live Chat Section
});

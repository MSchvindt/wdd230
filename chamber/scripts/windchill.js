//aca agarramos los datos que precisamos del widget (windspeed, temperature)
//las rutas que usamos las sacamos haciendo click derecho en el elemento, Copy > Copy full JS path
function getWeatherData() {
    let windspeed = document.querySelector("#eapps-weather-5e8977c4-286d-4766-933b-f08c9f46ea05 > div > div.jsx-3441345473.eapp-weather-weather-info > div.jsx-3441345473.eapp-weather-weather-detail > div.jsx-1627534292.eapp-weather-forecast-component > div > div.menu-wrapper > div > div:nth-child(1) > div > div:nth-child(1) > div");
    let temperature = document.querySelector("#eapps-weather-5e8977c4-286d-4766-933b-f08c9f46ea05 > div > div.jsx-3441345473.eapp-weather-weather-info > div.jsx-3441345473.eapp-weather-weather-detail > div.jsx-2291418771.eapp-weather-detail-component > div.jsx-2291418771.eapp-weather-detail-tempBlock > div.jsx-2291418771.eapp-weather-detail-currentTemp");

    //con esto, separamos los datos para procesarlos y quedarnos con lo que necesitamos (la temperatura creuda y los grados crudos, sin las unidades de medida)
    const separated_windspeed = windspeed.innerHTML.split(" ");
    const separated_temperature = temperature.innerHTML.split("°");

    //para sacar solo el valor, ponemos [0] para quedarnos con el primero elemento, que es donde se guarda el valor para ambas variables
    //le pasamos todo a la funcion calculate_windchill(wind, temp)
    calculate_windchill(separated_windspeed[0], separated_temperature[0]);
}

//esta funcion calcula el windchill según el windspeed y la tempetature
function calculate_windchill(windspeed, temperature) {
    //aca agarramos un elemento del widget para cambiarle el contenido con el valor de la cuenta que hacemos abajo (en esta caso era la pressure)
    let windchill = document.querySelector("#eapps-weather-5e8977c4-286d-4766-933b-f08c9f46ea05 > div > div.jsx-3441345473.eapp-weather-weather-info > div.jsx-3441345473.eapp-weather-weather-detail > div.jsx-1627534292.eapp-weather-forecast-component > div > div.menu-wrapper > div > div:nth-child(1) > div > div:nth-child(2) > div");
    
    //estas dos lineas son solamente para cambiar el atributo "title" del div donde estaba pressure, para que ponga "Windchill"
    let windchill_title = document.querySelector("#eapps-weather-5e8977c4-286d-4766-933b-f08c9f46ea05 > div > div.jsx-3441345473.eapp-weather-weather-info > div.jsx-3441345473.eapp-weather-weather-detail > div.jsx-1627534292.eapp-weather-forecast-component > div > div.menu-wrapper > div > div:nth-child(1) > div > div:nth-child(2)");
    windchill_title.title = "Windchill";
    
    //solo se calcula si se cumple esta condicion
    if (temperature < 50 && windspeed > 3) {
        let calc = 35.74 + (0.6215 * temperature) - (35.75 * (windspeed ** 0.16)) + ((0.4275 * temperature) * (windspeed ** 0.16));

        //reemplazamos el contenido del div que elegimos para mostrar la windchill con el resultado de nuestra cuenta
        windchill.innerHTML = calc;
    } else {
        //si la condicion no se cumple, muestra N/A
        windchill.innerHTML = "N/A";
    }
}

//esto es para ocultar la parte del widget que no queremos (para que no rompa formato)
//dentro del setTimeout, agarramos el div de los días (weather_weekdays) y le decimos que lo oculte (display = 'none')
//despues de que pasan los 5 segundos, llamamos al metodo que nos agarra los datos del widget (getWeatherData())
function hide_weather_days() {

    setTimeout(() => {
        const weather_weekdays = document.querySelector("#eapps-weather-5e8977c4-286d-4766-933b-f08c9f46ea05 > div > div.jsx-3441345473.eapp-weather-weather-info > div:nth-child(2)");
        weather_weekdays.style.display = 'none';

        getWeatherData();
    }, 5000);
}

//esto inicia la cadena de funciones para que todo ande
hide_weather_days();


//------------api weather----------

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=dfdfb2c3fa71b76cebbe6111df779240
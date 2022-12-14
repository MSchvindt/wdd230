'use strict'

window.onload = function () {
    try {
        setupEvents();
        getWeatherData();
        getFruitsData();
        let container = document.getElementById('selected-fruits-container').style.display = "none";
    } catch (error) {

    }

}

function setupEvents() {
    try {
        minWidth769.addListener(match);
        match();

        let go_to_fresh_fruits = document.getElementById('go-to-fresh-fruits');

        go_to_fresh_fruits.setAttribute("href", "fresh-fruits.html");

        let btnSubmit = document.getElementById('btnSubmit');
        btnSubmit.setAttribute('onclick', 'getFormData()');
    } catch (error) {

    }

}

let menu = document.getElementById('nav-container');
let nav_toggle = document.getElementById('nav-toggle');

var navbar_container = document.getElementById('nav-container').classList;
var minWidth769 = window.matchMedia("(min-width: 1000px)");

function openMenu(flag) {
    nav_toggle.setAttribute("onclick", "openMenu(" + !flag + ");");

    if (flag) {
        menu.classList.add('mobile');
        menu.classList.add('slideInDown');
    } else {
        menu.classList.remove('mobile');
        menu.classList.remove('slideInDown');
    }

}

//change active btns
/*function change_active(btn) {
    let buttons = document.getElementsByClassName('nabvar-btns');

    for (let index = 0; index < buttons.length; index++) {
        buttons[index].classList.remove('active');
    }

    btn.classList.add('active');
}*/

function match() {
    minWidth769.matches ? navbar_container.add('full-page') : navbar_container.remove('full-page');

    menu.classList.remove('mobile');
    menu.classList.remove('slideInDown');
    nav_toggle.setAttribute("onclick", "openMenu(true);");
}

var weatherArray = [];

async function getWeatherData() {
    const query = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat=33.158092&lon=-117.350594&appid=dfdfb2c3fa71b76cebbe6111df779240');

    weatherArray = await query.json();

    try {
        let condition1 = '';
        let condition2 = '';
        let fullCondittion = '';
        let humidity = '';
        let forecast = [];
        let currentWeather = [];
        let temp = '';

        let count = 1;

        weatherArray.list.forEach(element => {

            if (count <= 4) {
                let kelvinToFarenheit = ((element.main.temp - 273.15) * 1.8) + 32;

                temp = (Math.round(kelvinToFarenheit * 100) / 100).toFixed(2) + " °F";

                element.weather.forEach(element => {
                    condition1 = element.description;
                    condition2 = element.main;
                    fullCondittion = condition2 + ", " + condition1;
                });

                humidity = element.main.humidity;

                let weather_icon = document.getElementById('weather-icon');

                switch (condition2) {
                    case "Clouds":
                        weather_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clouds" viewBox="0 0 16 16"><path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/><path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/></svg>';
                        break;
                    case "Rain":
                        weather_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-rain" viewBox="0 0 16 16"><path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/></svg>';
                        break;
                    case "Clear":
                        weather_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>';
                        break;
                    case "Clouds":
                        weather_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clouds" viewBox="0 0 16 16"><path d="M16 7.5a2.5 2.5 0 0 1-1.456 2.272 3.513 3.513 0 0 0-.65-.824 1.5 1.5 0 0 0-.789-2.896.5.5 0 0 1-.627-.421 3 3 0 0 0-5.22-1.625 5.587 5.587 0 0 0-1.276.088 4.002 4.002 0 0 1 7.392.91A2.5 2.5 0 0 1 16 7.5z"/><path d="M7 5a4.5 4.5 0 0 1 4.473 4h.027a2.5 2.5 0 0 1 0 5H3a3 3 0 0 1-.247-5.99A4.502 4.502 0 0 1 7 5zm3.5 4.5a3.5 3.5 0 0 0-6.89-.873.5.5 0 0 1-.51.375A2 2 0 1 0 3 13h8.5a1.5 1.5 0 1 0-.376-2.953.5.5 0 0 1-.624-.492V9.5z"/></svg>';
                        break;
                    default:
                        weather_icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cloud-slash" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M3.112 5.112a3.125 3.125 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447c0-.075.006-.152.018-.231l-.812-.812zm2.55-1.45-.725-.725A5.512 5.512 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/><path d="m13.646 14.354-12-12 .708-.708 12 12-.707.707z"/></svg>';
                        break;
                }

                if (count == 1) {
                    currentWeather.push({ temp: temp, fullCondition: fullCondittion, humidity: humidity });
                } else {
                    forecast.push("[" + temp + "] ");
                }
            }

            count++;
        });

        let weather_temp = document.getElementById('weather-temp');
        let weather_condition = document.getElementById('weather-condition');
        let weather_humidity = document.getElementById('weather-humidity');
        let weather_forecast = document.getElementById('weather-forecast');

        currentWeather.forEach(element => {
            weather_temp.innerHTML += element.temp;
            weather_condition.innerHTML += element.fullCondition;
            weather_humidity.innerHTML += element.humidity;
        });

        forecast.forEach(element => {
            weather_forecast.innerHTML += element;
        });
    } catch (error) {

    }
}

let fruitsArray = [];

async function getFruitsData() {
    try {
        const query = await fetch('https://brotherblazzard.github.io/canvas-content/fruit.json');

        fruitsArray = await query.json();

        let fruits = document.getElementById('fruits');

        let id = 0;

        fruitsArray.forEach(element => {
            let chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.classList.add('check');
            chk.setAttribute('onclick', 'limitCheckboxes()');
            chk.id = id;
            chk.value = element.name + "-" + element.nutritions.fat + "-" + element.nutritions.carbohydrates + "-" + element.nutritions.protein + "-" + element.nutritions.sugar + "-" + element.nutritions.calories;

            let lbl = document.createElement('label');
            lbl.textContent = element.name;
            lbl.htmlFor = id;

            let br = document.createElement('br');

            fruits.append(chk);
            fruits.append(lbl);
            fruits.append(br);

            id++;
        });
    } catch (error) {

    }

}

function limitCheckboxes() {
    var checks = document.querySelectorAll(".check");
    var max = 3;
    for (var i = 0; i < checks.length; i++)
        checks[i].onclick = selectiveCheck;
    function selectiveCheck(event) {
        var checkedChecks = document.querySelectorAll(".check:checked");
        if (checkedChecks.length >= max + 1)
            return false;
    }
}

function getFormData() {
    let form = document.getElementById('fresh-fruits-form').elements;

    let chks = [];
    let data = [];

    for (let index = 0; index < form.length; index++) {

        if (form[index].type == 'checkbox' && form[index].checked) {
            chks.push(form[index]);
        } else {
            if (form[index].value != '' && form[index].value != 'undefined' && form[index].type != 'checkbox' && form[index].type != 'button') {
                data.push(form[index]);
            }
        }
    }

    try {
        getSelectedFruitsData(chks);
    } catch (error) {

    }

}

function getSelectedFruitsData(chks) {
    let totalFat = 0;
    let totalCarbs = 0;
    let totalProteins = 0;
    let totalSugar = 0;
    let totalCalories = 0;
    let fruitNames = [];

    chks.forEach(element => {
        let fr = document.getElementById(element.id);

        const selectedFruitData = fr.value.split("-");

        //name, fat, carbo, protein, sugar, calories
        fruitNames.push(selectedFruitData[0]);
        totalFat += parseFloat(selectedFruitData[1]);
        totalCarbs += parseFloat(selectedFruitData[2]);
        totalProteins += parseFloat(selectedFruitData[3]);
        totalSugar += parseFloat(selectedFruitData[4]);
        totalCalories += parseFloat(selectedFruitData[5]);
    });

    newFruitsCard({ fruitNames: fruitNames, totalFat: totalFat, totalCarbs: totalCarbs, totalProteins: totalProteins, totalSugar: totalSugar, totalCalories: totalCalories });
}

function newFruitsCard(data) {
    let main_container = document.getElementById('selected-values-container');
    main_container.innerHTML = '';

    let card = document.createElement('div');
    let card_body = document.createElement('div');
    let card_title = document.createElement('div');

    let details = document.createElement('details');
    let summary = document.createElement('summary');
    summary.innerHTML = 'Nutritional values';

    let summary_body = document.createElement('div');

    let summary_list = document.createElement('ul');

    //name, fat, carbo, protein, sugar, calories

    let summary_list_content1 = document.createElement('li');
    summary_list_content1.innerHTML = 'Total Fat: ' + data.totalFat;

    let summary_list_content2 = document.createElement('li');
    summary_list_content2.innerHTML = 'Total Carbohydrates: ' + data.totalCarbs;

    let summary_list_content3 = document.createElement('li');
    summary_list_content3.innerHTML = 'Total Proteins: ' + data.totalProteins;

    let summary_list_content4 = document.createElement('li');
    summary_list_content4.innerHTML = 'Total Sugar: ' + data.totalSugar;

    let summary_list_content5 = document.createElement('li');
    summary_list_content5.innerHTML = 'Total Calories: ' + data.totalCalories;

    summary_list.append(summary_list_content1);
    summary_list.append(summary_list_content2);
    summary_list.append(summary_list_content3);
    summary_list.append(summary_list_content4);
    summary_list.append(summary_list_content5);

    card.classList.add('card-fresh-fruits');

    card_body.classList.add('card-body');

    card_title.classList.add('card-title');

    let h2 = document.createElement('h2');
    h2.innerHTML = 'Selected fruits';

    card_title.append(h2);

    data.fruitNames.forEach(element => {
        let span = document.createElement('span');
        span.classList.add('fruit-title');

        span.innerHTML = element;

        card_title.append(span);
    });

    details.open = true;

    summary_body.classList.add('summary-body');

    details.append(summary);

    summary_body.append(summary_list);
    details.append(summary_body);
    card_body.append(card_title);
    card_body.append(details)
    card.append(card_body);

    main_container.append(card);
    let container = document.getElementById('selected-fruits-container').style.display = "block";
}
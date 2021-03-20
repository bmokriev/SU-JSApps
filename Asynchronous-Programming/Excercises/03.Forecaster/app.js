function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather)
}

const symbols = {
    Sunny: '☀',
    'Partly sunny': '⛅',
    Overcast: '☁',
    Rain: '☂',
    Degrees: '°'
}


async function getWeather() {
    const input = document.getElementById('location');

    const city = input.value;
    // const code = await getCityCode('london')
    const code = await getCityCode(city)
    console.log(code);


    const [todayForcast, upcomingForcast] = await Promise.all([
        getToday(code),
        getUpcoming(code)
    ])
    console.log(todayForcast);
    console.log(upcomingForcast);


    populate(todayForcast, upcomingForcast)

}

async function getCityCode(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    try {
        const res = await fetch(url);
        const data = await res.json();
        let result = data.find(e => e.name.toLowerCase() == name.toLowerCase()).code;
        return result
    } catch (error) {
        console.log(error);
        console.log('Error');
    }


}

async function getToday(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/${code}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error);
    }
}
async function getUpcoming(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function populate(todayForcast, upcomingForcast) {
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');
    const mainDiv = document.getElementById('forecast');


    const divForecast = document.createElement('div');
    divForecast.classList.add("forecasts")

    const spanSymbol = document.createElement('span');
    spanSymbol.classList.add("condition", "symbol");
    spanSymbol.textContent = symbols[todayForcast.forecast.condition];
    divForecast.appendChild(spanSymbol);

    const spanCondition = document.createElement('span');
    spanCondition.classList.add("condition");

    currentDiv.appendChild(divForecast)
    mainDiv.style.display = 'block';

}

attachEvents();